"""Pydantic schemas used across the backend
"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class AgentBid(BaseModel):
    agent: str = Field(..., description="crop|irrigation|climate|energy")
    zone_id: str
    priority: float = Field(..., ge=0.0, le=1.0)
    bid: float = Field(..., ge=0.0, le=1.0)
    recommended_action: str
    duration_minutes: int
    reason: Optional[str]
    confidence: float = Field(..., ge=0.0, le=1.0)
    resource_demand: Dict[str, Any] = {}

class AgentInfo(BaseModel):
    name: str
    description: Optional[str]
