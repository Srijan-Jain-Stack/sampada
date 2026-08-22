"""Action schema
"""
from pydantic import BaseModel
from typing import Any

class Action(BaseModel):
    zone_id: str
    command: str
    parameters: Any
