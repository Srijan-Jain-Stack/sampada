"""Validated SAMPADA Crop Agent models."""
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field, model_validator

class CropInput(BaseModel):
    zone_id: str = Field(min_length=1)
    crop_type: str = Field(min_length=1)
    growth_stage: str = Field(min_length=1)
    substrate: str = "soil"
    soil_moisture_pct: float | None = Field(default=None, ge=0, le=100)
    soil_observed_at: datetime | None = None
    wilting_score: float | None = Field(default=None, ge=0, le=100)
    wilting_observed_at: datetime | None = None
    ndvi: float | None = Field(default=None, ge=-1, le=1)
    ndvi_trend: float | None = Field(default=None, ge=-1, le=1)
    ndvi_observed_at: datetime | None = None
    observed_at: datetime = Field(default_factory=datetime.now)

    @model_validator(mode="after")
    def requires_signal(self):
        if all(v is None for v in (self.soil_moisture_pct, self.wilting_score, self.ndvi, self.ndvi_trend)):
            raise ValueError("At least one crop signal is required.")
        return self

class CropDecision(BaseModel):
    agent: Literal["crop"] = "crop"
    zone_id: str
    priority: float = Field(ge=0, le=1)
    bid: float = Field(ge=0, le=1)
    recommended_action: str
    duration_minutes: int = Field(ge=0)
    reason: str
    confidence: float = Field(ge=0, le=1)
    resource_demand: dict[str, float]
    # Carries the calibrated source value to resource agents; it is not an
    # actuator command and the Coordinator still validates every final action.
    soil_moisture_pct: float | None = Field(default=None, ge=0, le=100)
    stress_score: float = Field(ge=0, le=100)
    stress_level: Literal["normal", "watch", "high", "critical", "unknown"]
    signal_breakdown: dict[str, float]
    signal_quality: dict[str, str]
    data_freshness_minutes: dict[str, float]
    sensor_health: Literal["healthy", "degraded", "fault_suspected", "insufficient"]
    profile_source: str
    profile_verified: bool
    alerts: list[str]
    moisture_decline_pct_per_hour: float | None = None
    hours_below_critical: float = 0
    recovery_status: Literal["not_evaluated", "recovering", "not_recovering"] = "not_evaluated"
