"""Coordinator adapter for the standalone Irrigation + Weather Agent.

``IrrigationWeatherAgent`` remains responsible for water need, weather suppression,
emergency irrigation and cooldown.  This module translates that result to SAMPADA's
shared bid contract; it never bypasses the Coordinator safety guard.
"""
from pydantic import Field

from backend.agents.irrigation.irrigation_and_weather import IrrigationWeatherAgent
from backend.schemas.agent import AgentBid


class IrrigationDecision(AgentBid):
    soil_moisture_pct: float = Field(ge=0.0, le=100.0)
    crop_stress_score: float | None = Field(default=None, ge=0.0, le=100.0)
    water_need: float = Field(ge=0.0, le=1.0)
    water_deficit_percent: float = Field(ge=0.0)
    weather_suppressed: bool
    rain_probability_percent: float = Field(ge=0.0, le=100.0)
    expected_rainfall_mm: float = Field(ge=0.0)
    temperature: float | None = None
    humidity: float | None = None


class IrrigationAgent:
    """Publish coordinator-ready irrigation decisions from flat sensor JSON."""

    def __init__(self, core=None):
        # The FastAPI/coordinator path exposes decisions through the API, not stdout.
        self.core = core or IrrigationWeatherAgent(verbose=False)

    @staticmethod
    def _weather(sensor_state):
        supplied = sensor_state.get("weather")
        if supplied:
            return supplied
        rain_expected = bool(sensor_state.get("rain_expected", False))
        return {
            "temperature": sensor_state.get("temperature"),
            "humidity": sensor_state.get("humidity"),
            "current_precipitation": 0.0,
            "rain_probability": 80.0 if rain_expected else 0.0,
            "expected_rainfall_mm": 3.0 if rain_expected else 0.0,
        }

    def generate_bid(self, sensor_state: dict) -> IrrigationDecision:
        zone_id = str(sensor_state.get("zone_id", "Z1"))
        soil_moisture = float(sensor_state.get("crop_soil_moisture_pct", sensor_state.get("soil_moisture_pct", sensor_state.get("soil_moisture", 40.0))))
        weather = self._weather(sensor_state)
        raw = self.core.decide(zone_id, soil_moisture, weather)
        action = raw["recommended_action"]
        suppressed = action == "DELAY"
        return IrrigationDecision(
            agent="irrigation",
            zone_id=zone_id,
            priority=float(raw["water_need"]),
            bid=float(raw["water_need"]),
            recommended_action=action,
            duration_minutes=int(raw["irrigation_duration_minutes"]),
            reason=raw["reason"],
            confidence=float(raw["confidence"]),
            resource_demand={"water_litres": float(raw["irrigation_duration_minutes"])},
            soil_moisture_pct=soil_moisture,
            crop_stress_score=sensor_state.get("crop_stress_score"),
            water_need=float(raw["water_need"]),
            water_deficit_percent=float(raw["water_deficit_percent"]),
            weather_suppressed=suppressed,
            rain_probability_percent=float(raw["rain_probability_percent"]),
            expected_rainfall_mm=float(raw["expected_rainfall_mm"]),
            temperature=raw["temperature"],
            humidity=raw["humidity"],
        )
