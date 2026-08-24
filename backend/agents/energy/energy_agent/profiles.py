"""Energy system profile repository with battery/solar/inverter specifications."""
from dataclasses import dataclass
from pathlib import Path
import json


@dataclass(frozen=True)
class EnergyProfile:
    """Immutable energy system profile for a zone/setup."""
    zone_id: str
    battery_capacity_wh: float
    battery_min_pct: float = 10.0
    battery_conserve_pct: float = 30.0
    battery_critical_pct: float = 20.0
    battery_emergency_pct: float = 10.0
    solar_capacity_watts: float = 0.0
    inverter_max_watts: float = 3000.0
    inverter_efficiency: float = 0.92
    emergency_reserve_wh: float = 0.0
    grid_tie: bool = True
    default_conservation_action: str = "REDUCE_CLIMATE_LOAD"
    source: str = "default"
    verified: bool = False


class EnergyProfileRepository:
    def __init__(self, profiles: list[EnergyProfile]):
        self.profiles = {p.zone_id.lower(): p for p in profiles}

    @classmethod
    def from_json(cls, path: str | Path):
        return cls([EnergyProfile(**item) for item in json.loads(Path(path).read_text(encoding="utf-8"))])

    @classmethod
    def default(cls):
        return cls.from_json(Path(__file__).parent.parent / "data" / "energy_profiles.json")

    def get(self, zone_id: str) -> EnergyProfile | None:
        return self.profiles.get(zone_id.lower())