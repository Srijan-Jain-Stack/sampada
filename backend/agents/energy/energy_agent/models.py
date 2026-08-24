"""Validated SAMPADA Energy Agent models."""
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field, model_validator


class EnergyInput(BaseModel):
    """Sensor snapshot for energy assessment."""
    zone_id: str = Field(min_length=1)
    battery_pct: float = Field(ge=0, le=100)
    battery_observed_at: datetime | None = None
    solar_watts: float | None = Field(default=None, ge=0)
    solar_observed_at: datetime | None = None
    load_watts: float | None = Field(default=None, ge=0)
    load_observed_at: datetime | None = None
    grid_available: bool = True
    grid_observed_at: datetime | None = None
    observed_at: datetime = Field(default_factory=datetime.now)

    @model_validator(mode="after")
    def requires_core_signal(self):
        if self.battery_pct is None:
            raise ValueError("Battery percentage is required.")
        return self


class EnergyDecision(BaseModel):
    """Decision payload sent to Coordinator (extends AgentBid schema)."""
    agent: Literal["energy"] = "energy"
    zone_id: str
    priority: float = Field(ge=0, le=1)
    bid: float = Field(ge=0, le=1)
    recommended_action: str
    duration_minutes: int = Field(ge=0)
    reason: str
    confidence: float = Field(ge=0, le=1)
    resource_demand: dict[str, float]

    # Energy-specific diagnostics
    battery_pct: float
    battery_state: Literal["normal", "conserve", "critical", "emergency", "unknown"]
    solar_watts: float | None
    available_energy_wh: float
    energy_budget_wh: float
    scarcity_score: float = Field(ge=0, le=1)
    scarcity_state: Literal["none", "watch", "high", "critical"]
    battery_trend_wh_per_hour: float | None
    hours_to_critical: float | None
    hours_to_emergency: float | None
    signal_quality: dict[str, str]
    data_freshness_minutes: dict[str, float]
    sensor_health: Literal["healthy", "degraded", "fault_suspected", "insufficient"]
    profile_source: str
    profile_verified: bool
    alerts: list[str]
    recommended_conservation: str
    conservation_actions: list[str]