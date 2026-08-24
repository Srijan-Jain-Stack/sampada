"""Pydantic schemas used across the backend
"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, Literal

class AgentBid(BaseModel):
    """Stable message contract published by every intelligence agent."""

    agent: Literal["crop", "irrigation", "climate", "energy"]
    zone_id: str
    priority: float = Field(..., ge=0.0, le=1.0)
    bid: float = Field(..., ge=0.0, le=1.0)
    recommended_action: str
    duration_minutes: int
    reason: Optional[str]
    confidence: float = Field(..., ge=0.0, le=1.0)
    resource_demand: Dict[str, Any] = Field(default_factory=dict)

class AgentInfo(BaseModel):
    name: str
    description: Optional[str]
