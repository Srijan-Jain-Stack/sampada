"""Repository helpers for DB operations (simple)
"""
from backend.database.database import SessionLocal

def save_sensor_reading(payload: dict):
    with SessionLocal() as session:
        # TODO: implement save
        pass
