"""Importable crop-profile repository with FAO-56/CROPWAT metadata."""
import json
from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class CropProfile:
    crop_type: str; growth_stage: str; substrate: str
    optimal_min: float; optimal_max: float; critical_min: float
    kc_initial: float | None; kc_mid: float | None; kc_end: float | None
    root_depth_m: float | None; depletion_fraction: float | None
    default_duration_minutes: int; source: str; verified: bool

class CropProfileRepository:
    def __init__(self, profiles: list[CropProfile]):
        self.profiles = {(p.crop_type.lower(), p.growth_stage.lower(), p.substrate.lower()): p for p in profiles}
    @classmethod
    def from_json(cls, path: str | Path):
        return cls([CropProfile(**item) for item in json.loads(Path(path).read_text(encoding="utf-8"))])
    @classmethod
    def default(cls):
        return cls.from_json(Path(__file__).parent.parent / "data" / "crop_profiles.json")
    def get(self, crop: str, stage: str, substrate: str):
        c, s, sub = crop.lower().strip(), stage.lower().strip(), substrate.lower().strip()
        return self.profiles.get((c, s, sub)) or self.profiles.get((c, s, "any")) or self.profiles.get((c, "any", "any"))
