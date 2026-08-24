"""
Climate Agent for SAMPADA.

Responsibilities:
1. Load crop-specific climate thresholds from JSON.
2. Get current temperature and humidity from Open-Meteo.
3. Calculate temperature and humidity stress.
4. Recommend FAN, MIST, or MONITOR.
5. Generate an AgentBid for the Coordinator/Energy Agent.
"""

import json
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from backend.schemas.agent import AgentBid


class ClimateAgent:

    OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

    def __init__(self):
        # backend/agents/climate/climate_agent.py
        # parents[2] = backend
        self.profiles_dir = (
            Path(__file__).resolve().parents[2]
            / "config"
            / "crop_profiles"
        )

        self.profiles = self._load_profiles()

    # ---------------------------------------------------------
    # LOAD TOMATO / CUCUMBER JSON PROFILES
    # ---------------------------------------------------------

    def _load_profiles(self):
        profiles = {}

        for file_path in self.profiles_dir.glob("*.json"):

            with open(file_path, "r", encoding="utf-8") as file:
                profile = json.load(file)

            crop_name = profile.get("crop_name")

            if crop_name:
                profiles[crop_name.lower()] = profile

        return profiles

    # ---------------------------------------------------------
    # GET CURRENT WEATHER FROM OPEN-METEO
    # ---------------------------------------------------------

    def get_weather(self, latitude, longitude):

        params = urlencode({
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,relative_humidity_2m"
        })

        url = f"{self.OPEN_METEO_URL}?{params}"

        request = Request(
            url,
            headers={
                "User-Agent": "SAMPADA-Climate-Agent"
            }
        )

        with urlopen(request, timeout=10) as response:

            data = json.loads(
                response.read().decode("utf-8")
            )

        current = data["current"]

        return {
            "temperature": float(
                current["temperature_2m"]
            ),
            "humidity": float(
                current["relative_humidity_2m"]
            )
        }

    # ---------------------------------------------------------
    # CALCULATE STRESS
    # ---------------------------------------------------------

    @staticmethod
    def calculate_stress(value, minimum, maximum):

        # Value is inside preferred range
        if minimum <= value <= maximum:
            return 0.0

        # Value is below preferred range
        if value < minimum:
            return min(
                (minimum - value) / minimum,
                1.0
            )

        # Value is above preferred range
        return min(
            (value - maximum) / maximum,
            1.0
        )

    # ---------------------------------------------------------
    # DECIDE CLIMATE ACTION
    # ---------------------------------------------------------

    def decide_action(
        self,
        temperature,
        humidity,
        profile
    ):

        temperature_min = profile[
            "preferred_temperature"
        ]["min"]

        temperature_max = profile[
            "preferred_temperature"
        ]["max"]

        humidity_min = profile[
            "preferred_humidity"
        ]["min"]

        humidity_max = profile[
            "preferred_humidity"
        ]["max"]

        crop_name = profile["crop_name"]

        # -----------------------------------------------------
        # TEMPERATURE TOO HIGH
        # -----------------------------------------------------

        if temperature > temperature_max:

            reason = (
                f"Temperature is {temperature:.1f}°C, "
                f"above the preferred maximum of "
                f"{temperature_max}°C for {crop_name}."
            )

            return "FAN", reason

        # -----------------------------------------------------
        # HUMIDITY TOO HIGH
        # -----------------------------------------------------

        if humidity > humidity_max:

            reason = (
                f"Humidity is {humidity:.1f}%, "
                f"above the preferred maximum of "
                f"{humidity_max}% for {crop_name}."
            )

            return "FAN", reason

        # -----------------------------------------------------
        # HUMIDITY TOO LOW
        # -----------------------------------------------------

        if humidity < humidity_min:

            reason = (
                f"Humidity is {humidity:.1f}%, "
                f"below the preferred minimum of "
                f"{humidity_min}% for {crop_name}."
            )

            return "MIST", reason

        # -----------------------------------------------------
        # TEMPERATURE TOO LOW
        # -----------------------------------------------------

        if temperature < temperature_min:

            reason = (
                f"Temperature is {temperature:.1f}°C, "
                f"below the preferred minimum of "
                f"{temperature_min}°C for {crop_name}. "
                f"No heating action is configured."
            )

            return "MONITOR", reason

        # -----------------------------------------------------
        # EVERYTHING NORMAL
        # -----------------------------------------------------

        reason = (
            f"Temperature ({temperature:.1f}°C) and "
            f"humidity ({humidity:.1f}%) are within the "
            f"preferred range for {crop_name}."
        )

        return "MONITOR", reason

    # ---------------------------------------------------------
    # GENERATE AGENT BID
    # ---------------------------------------------------------

    def generate_bid(self, sensor_state: dict) -> AgentBid:

        zone_id = sensor_state.get(
            "zone_id",
            "Z1"
        )

        crop_type = sensor_state.get(
            "crop_type"
        )

        if not crop_type:

            raise ValueError(
                "Climate Agent requires crop_type."
            )

        crop_type = crop_type.lower()

        # Check whether JSON exists
        if crop_type not in self.profiles:

            raise ValueError(
                f"No climate profile found for "
                f"crop '{crop_type}'. "
                f"Available crops: "
                f"{list(self.profiles.keys())}"
            )

        profile = self.profiles[crop_type]

        # -----------------------------------------------------
        # GET TEMPERATURE + HUMIDITY
        # -----------------------------------------------------
        #
        # If sensor_state already contains values,
        # use them.
        #
        # Otherwise get live values from Open-Meteo.
        # -----------------------------------------------------

        temperature = sensor_state.get(
            "temperature"
        )

        humidity = sensor_state.get(
            "humidity"
        )

        if temperature is None or humidity is None:

            latitude = sensor_state.get(
                "latitude"
            )

            longitude = sensor_state.get(
                "longitude"
            )

            if latitude is None or longitude is None:

                raise ValueError(
                    "Latitude and longitude are required "
                    "when temperature/humidity are not "
                    "provided."
                )

            weather = self.get_weather(
                latitude,
                longitude
            )

            temperature = weather["temperature"]
            humidity = weather["humidity"]

        temperature = float(temperature)
        humidity = float(humidity)

        # -----------------------------------------------------
        # READ THRESHOLDS FROM JSON
        # -----------------------------------------------------

        temperature_min = profile[
            "preferred_temperature"
        ]["min"]

        temperature_max = profile[
            "preferred_temperature"
        ]["max"]

        humidity_min = profile[
            "preferred_humidity"
        ]["min"]

        humidity_max = profile[
            "preferred_humidity"
        ]["max"]

        # -----------------------------------------------------
        # CALCULATE STRESS
        # -----------------------------------------------------

        temperature_stress = self.calculate_stress(
            temperature,
            temperature_min,
            temperature_max
        )

        humidity_stress = self.calculate_stress(
            humidity,
            humidity_min,
            humidity_max
        )

        # The larger stress determines climate urgency
        climate_stress = max(
            temperature_stress,
            humidity_stress
        )

        # -----------------------------------------------------
        # ACTION
        # -----------------------------------------------------

        action, reason = self.decide_action(
            temperature,
            humidity,
            profile
        )

        # -----------------------------------------------------
        # ACTION DURATION
        # -----------------------------------------------------
        #
        # Current JSON does not contain fan/mist duration.
        # Therefore 5 minutes is an MVP implementation
        # constant.
        #
        # This can later be moved into configuration.
        # -----------------------------------------------------

        if action in ("FAN", "MIST"):
            duration_minutes = 5
        else:
            duration_minutes = 0

        # -----------------------------------------------------
        # RESOURCE DEMAND
        # -----------------------------------------------------

        if action in ("FAN", "MIST"):

            resource_demand = {
                "device": action,
                "duration_minutes": duration_minutes
            }

        else:

            resource_demand = {}

        # -----------------------------------------------------
        # AGENT BID
        # -----------------------------------------------------

        return AgentBid(
            agent="climate",
            zone_id=zone_id,

            priority=round(
                climate_stress,
                3
            ),

            bid=round(
                climate_stress,
                3
            ),

            recommended_action=action,

            duration_minutes=duration_minutes,

            reason=reason,

            confidence=round(
                1.0 - (climate_stress * 0.5),
                3
            ),

            resource_demand=resource_demand
        )
