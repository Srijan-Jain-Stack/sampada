"""Decision schemas
"""
from pydantic import BaseModel
from typing import Any, List

class DecisionResponse(BaseModel):
    message: str
    decisions: List[Any] = []
