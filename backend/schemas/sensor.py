"""Sensor schemas
"""
from pydantic import BaseModel
from typing import Dict

class SensorReading(BaseModel):
    zone_id: str
    timestamp: str
    data: Dict[str, float]
