"""Weather helper (calls Open-Meteo) - kept behind an interface
"""
import httpx

class WeatherClient:
    def __init__(self, base_url: str = "https://api.open-meteo.com"):
        self.base_url = base_url

    def get_forecast(self, latitude: float, longitude: float):
        # TODO: implement minimal call to Open-Meteo
        return {"forecast": "stub"}
