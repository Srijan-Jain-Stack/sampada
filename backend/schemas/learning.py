"""Learning schemas
"""
from pydantic import BaseModel
from typing import Any

class RawLesson(BaseModel):
    crop: str
    conditions: Any
    action: Any
    outcome: Any
    timestamp: str

class AnonymousLesson(BaseModel):
    lesson_id: str
    crop_type: str
    condition_band: str
    action: Any
    result: Any
    reward: float
    timestamp: str
