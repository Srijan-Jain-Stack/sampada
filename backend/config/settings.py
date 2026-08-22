"""Application settings (pydantic based)
"""
from pydantic import BaseSettings

class Settings(BaseSettings):
    mqtt_broker: str = "localhost"
    mqtt_port: int = 1883
    mqtt_keepalive: int = 60
    database_url: str = "sqlite:///./sampada.db"
    safety_min_tank_level: float = 10.0
    safety_max_irrigation_minutes: int = 60
    safety_min_battery_level: float = 10.0

    class Config:
        env_file = ".env"

settings = Settings()
