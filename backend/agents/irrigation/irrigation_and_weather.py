"""
SAMPADA
Smart Agent Multi-Objective Precision Agriculture
& Dynamic Allocation

IRRIGATION + WEATHER AGENT

Version 1.0

Responsibilities:
1. Read soil moisture for a greenhouse zone
2. Fetch weather information from Open-Meteo
3. Calculate water requirement
4. Check expected rainfall
5. Apply irrigation safety rules
6. Apply irrigation cooldown
7. Generate an explainable agent decision
8. Generate a "bid" for the Coordinator Agent

This is an initial standalone version.
MQTT, ESP32 and Coordinator integration can be added later.
"""

import requests
from datetime import datetime, timedelta


# ============================================================
# CONFIGURATION
# ============================================================

class Config:

    # -----------------------------
    # Soil moisture limits (%)
    # -----------------------------

    # Below this value, plant is considered critically dry.
    CRITICAL_MOISTURE = 15

    # Desired soil moisture level.
    TARGET_MOISTURE = 40

    # -----------------------------
    # Weather thresholds
    # -----------------------------

    # SAMPADA design:
    # Suppress irrigation when:
    # rain probability > 60%
    # AND expected rainfall > 2 mm

    RAIN_PROBABILITY_LIMIT = 60
    RAINFALL_LIMIT_MM = 2

    # -----------------------------
    # Irrigation cooldown
    # -----------------------------

    # Minimum time between normal irrigation actions.
    COOLDOWN_MINUTES = 30

    # -----------------------------
    # Irrigation duration
    # -----------------------------

    MIN_IRRIGATION_MINUTES = 2
    MAX_IRRIGATION_MINUTES = 15

    # -----------------------------
    # Open-Meteo
    # -----------------------------

    WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

    # Example location.
    # Change these according to your greenhouse.
    LATITUDE = 26.8467
    LONGITUDE = 80.9462


# ============================================================
# WEATHER MODULE
# ============================================================

class WeatherService:
    """
    Gets weather information from Open-Meteo.
    """

    def __init__(self, latitude, longitude):

        self.latitude = latitude
        self.longitude = longitude

    def get_weather(self):

        params = {

            "latitude": self.latitude,

            "longitude": self.longitude,

            # Current weather
            "current": [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation"
            ],

            # Hourly forecast
            "hourly": [
                "temperature_2m",
                "precipitation_probability",
                "precipitation"
            ],

            # Forecast for next 24 hours
            "forecast_days": 1,

            "timezone": "auto"
        }

        try:

            response = requests.get(
                Config.WEATHER_API_URL,
                params=params,
                timeout=10
            )

            response.raise_for_status()

            data = response.json()

            return self.process_weather(data)

        except requests.exceptions.RequestException as error:

            print("\n[WEATHER ERROR]")
            print(error)

            return None

    def process_weather(self, data):
        """
        Extract only the weather information
        required by our agent.
        """

        current = data.get("current", {})
        hourly = data.get("hourly", {})

        temperature = current.get(
            "temperature_2m",
            None
        )

        humidity = current.get(
            "relative_humidity_2m",
            None
        )

        precipitation = current.get(
            "precipitation",
            0
        )

        rain_probabilities = hourly.get(
            "precipitation_probability",
            []
        )

        rainfall = hourly.get(
            "precipitation",
            []
        )

        # Look at the next few forecast hours.
        #
        # We use the maximum rain probability
        # and total expected rainfall.

        next_hours = min(
            6,
            len(rain_probabilities)
        )

        if next_hours > 0:

            max_rain_probability = max(
                rain_probabilities[:next_hours]
            )

        else:

            max_rain_probability = 0

        expected_rainfall = sum(
            rainfall[:next_hours]
        )

        return {

            "temperature": temperature,

            "humidity": humidity,

            "current_precipitation": precipitation,

            "rain_probability": max_rain_probability,

            "expected_rainfall_mm": expected_rainfall
        }


# ============================================================
# IRRIGATION + WEATHER AGENT
# ============================================================

class IrrigationWeatherAgent:
    """
    Main SAMPADA Irrigation + Weather Agent.

    It does NOT make the final greenhouse-wide decision.

    Instead, it produces a recommendation/bid that
    can later be sent to the Coordinator Agent.
    """

    def __init__(self, verbose=True):
        """Set ``verbose=False`` when this agent runs inside the FastAPI backend."""
        self.verbose = verbose
        self.last_irrigation = {}

    def _print(self, *args, **kwargs):
        if self.verbose:
            print(*args, **kwargs)

    # --------------------------------------------------------
    # WATER NEED CALCULATION
    # --------------------------------------------------------

    def calculate_water_need(self, soil_moisture):

        deficit = (
            Config.TARGET_MOISTURE
            - soil_moisture
        )

        # Soil already has enough water.
        if deficit <= 0:

            return {
                "score": 0.0,
                "priority": "LOW",
                "deficit": 0
            }

        # LOW
        if deficit < 10:

            score = deficit / 40

            priority = "LOW"

        # MEDIUM
        elif deficit < 20:

            score = deficit / 40

            priority = "MEDIUM"

        # HIGH
        elif deficit < 30:

            score = deficit / 40

            priority = "HIGH"

        # CRITICAL
        else:

            score = 1.0

            priority = "CRITICAL"

        return {

            "score": round(
                min(score, 1.0),
                2
            ),

            "priority": priority,

            "deficit": round(
                deficit,
                2
            )
        }

    # --------------------------------------------------------
    # WEATHER CHECK
    # --------------------------------------------------------

    def weather_check(
        self,
        rain_probability,
        rainfall_mm
    ):
        """
        SAMPADA weather suppression rule:

        If rain probability > 60%
        AND expected rainfall > 2 mm

        irrigation is suppressed.
        """

        if (
            rain_probability
            > Config.RAIN_PROBABILITY_LIMIT
            and
            rainfall_mm
            > Config.RAINFALL_LIMIT_MM
        ):

            return True

        return False

    # --------------------------------------------------------
    # COOLDOWN CHECK
    # --------------------------------------------------------

    def cooldown_active(self, zone):

        if zone not in self.last_irrigation:

            return False

        last_time = self.last_irrigation[zone]

        elapsed = (
            datetime.now()
            - last_time
        )

        if (
            elapsed
            < timedelta(
                minutes=Config.COOLDOWN_MINUTES
            )
        ):

            return True

        return False

    # --------------------------------------------------------
    # CALCULATE IRRIGATION DURATION
    # --------------------------------------------------------

    def calculate_duration(
        self,
        water_need
    ):

        score = water_need["score"]

        duration = (
            Config.MIN_IRRIGATION_MINUTES
            +
            score
            *
            (
                Config.MAX_IRRIGATION_MINUTES
                -
                Config.MIN_IRRIGATION_MINUTES
            )
        )

        return round(duration)

    # --------------------------------------------------------
    # CREATE AGENT BID
    # --------------------------------------------------------

    def create_bid(
        self,
        zone,
        water_need,
        decision,
        reason,
        weather,
        duration,
        confidence
    ):

        return {

            "agent":
                "irrigation_weather",

            "zone":
                zone,

            "water_need":
                water_need["score"],

            "water_deficit_percent":
                water_need["deficit"],

            "priority":
                water_need["priority"],

            "recommended_action":
                decision,

            "irrigation_duration_minutes":
                duration,

            "rain_probability_percent":
                weather["rain_probability"],

            "expected_rainfall_mm":
                round(
                    weather["expected_rainfall_mm"],
                    2
                ),

            "temperature":
                weather["temperature"],

            "humidity":
                weather["humidity"],

            "confidence":
                confidence,

            "reason":
                reason,

            "timestamp":
                datetime.now().isoformat()
        }

    # --------------------------------------------------------
    # MAIN DECISION FUNCTION
    # --------------------------------------------------------

    def decide(
        self,
        zone,
        soil_moisture,
        weather
    ):

        self._print("\n" + "=" * 60)

        self._print(
            f"IRRIGATION + WEATHER AGENT"
        )

        self._print("=" * 60)

        self._print(
            f"Zone              : {zone}"
        )

        self._print(
            f"Soil Moisture     : {soil_moisture}%"
        )

        self._print(
            f"Temperature       : "
            f"{weather['temperature']} °C"
        )

        self._print(
            f"Humidity          : "
            f"{weather['humidity']}%"
        )

        self._print(
            f"Rain Probability  : "
            f"{weather['rain_probability']}%"
        )

        self._print(
            f"Expected Rainfall : "
            f"{weather['expected_rainfall_mm']:.2f} mm"
        )

        # ----------------------------------------------------
        # STEP 1
        # Calculate water need
        # ----------------------------------------------------

        water_need = self.calculate_water_need(
            soil_moisture
        )

        self._print(
            f"\nWater Deficit     : "
            f"{water_need['deficit']}%"
        )

        self._print(
            f"Water Need Score  : "
            f"{water_need['score']}"
        )

        self._print(
            f"Priority          : "
            f"{water_need['priority']}"
        )

        # ----------------------------------------------------
        # STEP 2
        # HARD SAFETY FLOOR
        # ----------------------------------------------------

        if (
            soil_moisture
            < Config.CRITICAL_MOISTURE
        ):

            decision = "EMERGENCY_IRRIGATION"

            duration = Config.MAX_IRRIGATION_MINUTES

            reason = (
                "Soil moisture is below the "
                "critical safety floor. "
                "Emergency irrigation required."
            )

            bid = self.create_bid(
                zone,
                water_need,
                decision,
                reason,
                weather,
                duration,
                0.98
            )

            self.print_decision(bid)

            return bid

        # ----------------------------------------------------
        # STEP 3
        # WEATHER SUPPRESSION
        # ----------------------------------------------------

        rain_expected = self.weather_check(
            weather["rain_probability"],
            weather["expected_rainfall_mm"]
        )

        if rain_expected:

            decision = "DELAY"

            duration = 0

            reason = (
                "Significant rainfall is expected. "
                "Irrigation suppressed to avoid "
                "unnecessary water usage."
            )

            bid = self.create_bid(
                zone,
                water_need,
                decision,
                reason,
                weather,
                duration,
                0.95
            )

            self.print_decision(bid)

            return bid

        # ----------------------------------------------------
        # STEP 4
        # COOLDOWN
        # ----------------------------------------------------

        if self.cooldown_active(zone):

            decision = "WAIT"

            duration = 0

            reason = (
                "Irrigation cooldown is active. "
                "Wait before starting another "
                "normal irrigation cycle."
            )

            bid = self.create_bid(
                zone,
                water_need,
                decision,
                reason,
                weather,
                duration,
                0.95
            )

            self.print_decision(bid)

            return bid

        # ----------------------------------------------------
        # STEP 5
        # NORMAL IRRIGATION
        # ----------------------------------------------------

        if water_need["score"] > 0:

            decision = "IRRIGATE"

            duration = self.calculate_duration(
                water_need
            )

            reason = (
                "Soil moisture is below the "
                "target level and significant "
                "rainfall is not expected."
            )

            # Store irrigation time
            self.last_irrigation[zone] = (
                datetime.now()
            )

            bid = self.create_bid(
                zone,
                water_need,
                decision,
                reason,
                weather,
                duration,
                0.91
            )

            self.print_decision(bid)

            return bid

        # ----------------------------------------------------
        # STEP 6
        # NO ACTION
        # ----------------------------------------------------

        decision = "NO_ACTION"

        duration = 0

        reason = (
            "Soil moisture is already at or "
            "above the target level."
        )

        bid = self.create_bid(
            zone,
            water_need,
            decision,
            reason,
            weather,
            duration,
            0.95
        )

        self.print_decision(bid)

        return bid

    # --------------------------------------------------------
    # PRINT DECISION
    # --------------------------------------------------------

    def print_decision(self, bid):

        self._print("\n" + "-" * 60)

        self._print(
            "AGENT DECISION"
        )

        self._print("-" * 60)

        self._print(
            f"Action       : "
            f"{bid['recommended_action']}"
        )

        self._print(
            f"Priority     : "
            f"{bid['priority']}"
        )

        self._print(
            f"Water Need   : "
            f"{bid['water_need']}"
        )

        self._print(
            f"Duration     : "
            f"{bid['irrigation_duration_minutes']} minutes"
        )

        self._print(
            f"Confidence   : "
            f"{bid['confidence']}"
        )

        self._print(
            f"Reason       : "
            f"{bid['reason']}"
        )

        self._print("-" * 60)


# ============================================================
# SIMULATED SENSOR
# ============================================================

def get_soil_moisture():

    """
    Temporary simulated sensor.

    Later this will come from ESP32 through MQTT.
    """

    print("\nSIMULATED SENSOR")

    print("Enter soil moisture percentage.")

    while True:

        try:

            value = float(
                input(
                    "Soil moisture (%): "
                )
            )

            if 0 <= value <= 100:

                return value

            print(
                "Enter a value between "
                "0 and 100."
            )

        except ValueError:

            print(
                "Please enter a number."
            )


# ============================================================
# MAIN PROGRAM
# ============================================================

def main():

    print("\n")
    print("=" * 60)
    print(
        "SAMPADA - IRRIGATION + WEATHER AGENT"
    )
    print("=" * 60)

    print(
        "\nStarting agent..."
    )

    # --------------------------------------------------------
    # Create weather service
    # --------------------------------------------------------

    weather_service = WeatherService(
        Config.LATITUDE,
        Config.LONGITUDE
    )

    # --------------------------------------------------------
    # Create agent
    # --------------------------------------------------------

    agent = IrrigationWeatherAgent()

    # --------------------------------------------------------
    # Get weather
    # --------------------------------------------------------

    print(
        "\nFetching weather from Open-Meteo..."
    )

    weather = weather_service.get_weather()

    if weather is None:

        print(
            "\nWeather data unavailable."
        )

        print(
            "For safety, irrigation decision "
            "will not be made."
        )

        return

    print(
        "\nWeather data received."
    )

    # --------------------------------------------------------
    # Get sensor data
    # --------------------------------------------------------

    soil_moisture = get_soil_moisture()

    # --------------------------------------------------------
    # Run agent
    # --------------------------------------------------------

    result = agent.decide(
        zone=1,
        soil_moisture=soil_moisture,
        weather=weather
    )

    # --------------------------------------------------------
    # Coordinator-ready output
    # --------------------------------------------------------

    print("\n")
    print("=" * 60)

    print(
        "COORDINATOR AGENT INPUT"
    )

    print("=" * 60)

    print(result)

    print("=" * 60)

    print(
        "\nAgent cycle completed."
    )


# ============================================================
# PROGRAM ENTRY POINT
# ============================================================

if __name__ == "__main__":

    main()
