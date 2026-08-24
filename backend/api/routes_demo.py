"""Demo-only integration endpoint for a visible end-to-end control cycle."""
from fastapi import APIRouter
from pydantic import BaseModel

from backend.agents.climate.climate_agent import ClimateAgent
from backend.agents.crop.crop_agent import CropAgent
from backend.agents.energy.energy_agent import EnergyAgent
from backend.agents.irrigation.irrigation_agent import IrrigationAgent
from backend.services.runtime import runtime
from backend.simulator.greenhouse import Greenhouse

router = APIRouter()
_greenhouse = Greenhouse(seed=42)
_crop_agent = CropAgent()
_irrigation_agent = IrrigationAgent()
_climate_agent = ClimateAgent()
_energy_agent = EnergyAgent()


class DemoRequest(BaseModel):
    scenario_id: str = "zone-2-water-stress"


def _apply_scenario(sensor_state: dict, scenario_id: str) -> dict:
    """Apply a selected UI demo scenario before agents receive telemetry."""
    state = dict(sensor_state)
    if state["zone_id"] != "Z2":
        return state
    scenarios = {
        "zone-2-water-stress": {"soil_moisture": 31.0, "tank_level": 74.0, "rain_expected": False},
        "heatwave-energy-scarcity": {"temperature": 34.5, "humidity": 48.0, "solar_power": 900.0, "battery": 81.0},
        "rain-suppression-scenario": {"soil_moisture": 42.0, "tank_level": 74.0, "rain_expected": True},
        "critical-battery-veto": {"temperature": 34.5, "humidity": 46.0, "battery": 8.0, "solar_power": 50.0},
    }
    state.update(scenarios.get(scenario_id, scenarios["zone-2-water-stress"]))
    return state


def run_demo_cycle(scenario_id: str = "zone-2-water-stress"):
    """Run one simulated three-zone cycle and expose its results to the dashboard.

    This is intentionally an API demo path: real deployments receive the same sensor
    and bid contracts over MQTT instead.
    """
    all_bids = []
    for zone_id, metadata in _greenhouse.zones.items():
        sensor_state = _apply_scenario(_greenhouse.sample_state(zone_id), scenario_id)
        # Keep the simulator's compact telemetry names at its boundary, then
        # adapt them once for the four independently developed agent contracts.
        # This is the shared integration point; agents remain decoupled.
        sensor_state["crop"] = metadata["crop"]
        sensor_state["crop_type"] = metadata["crop"]
        runtime.record_sensor({"zone_id": zone_id, "data": sensor_state})
        crop_bid = _crop_agent.generate_bid(sensor_state).model_dump()
        irrigation_input = runtime.coordinator.irrigation_context(sensor_state, crop_bid)
        energy_input = {
            "zone_id": zone_id,
            "battery_pct": sensor_state["battery"],
            "solar_watts": sensor_state["solar_power"],
            "load_watts": 250.0,
            "grid_available": True,
        }
        all_bids.extend([
            crop_bid,
            _irrigation_agent.generate_bid(irrigation_input).model_dump(),
            _climate_agent.generate_bid(sensor_state).model_dump(),
            _energy_agent.generate_bid(energy_input).model_dump(),
        ])
    for bid in all_bids:
        runtime.record_agent_bid(bid)
    runtime.coordinator.receive_bids(all_bids)
    decisions = runtime.coordinator.decide(runtime.sensor_states)
    return {"decisions": decisions, "dashboard": runtime.dashboard()}


@router.post("/demo/cycle")
async def run_demo_cycle_endpoint(request: DemoRequest | None = None):
    """HTTP wrapper which also pushes the completed cycle to live dashboards."""
    result = run_demo_cycle(request.scenario_id if request else "zone-2-water-stress")
    await runtime.broadcast_dashboard()
    return result
