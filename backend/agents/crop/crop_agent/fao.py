"""Public FAO data adapters used to bootstrap, not control, crop profiles."""
import csv
import json
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen

from .profiles import CropProfile


class FaoCropCalendarClient:
    """Thin client for FAO's public Crop Calendar API.

    Crop-calendar data supplies crop/country/season context. It is deliberately
    never used as a real-time sensor or actuator input.
    """
    base_url = "https://api-cropcalendar.apps.fao.org/api/v1"

    def __init__(self, fetch_json=None):
        self.fetch_json = fetch_json or self._fetch_json

    @staticmethod
    def _fetch_json(url: str):
        with urlopen(url, timeout=20) as response:  # nosec B310 - fixed HTTPS API base URL
            return json.load(response)

    def crops(self):
        return self.fetch_json(f"{self.base_url}/crops")

    def crops_for_country(self, country_id: str | int):
        return self.fetch_json(f"{self.base_url}/countries/{country_id}/crops")

    def calendar(self, country_id: str | int, crop_id: str | int | None = None, aez: str | int | None = None):
        query = {key: value for key, value in {"crop_id": crop_id, "agroecological_zone": aez}.items() if value is not None}
        suffix = f"?{urlencode(query)}" if query else ""
        return self.fetch_json(f"{self.base_url}/countries/{country_id}/cropCalendar{suffix}")


def import_cropwat_tsv(source: str | Path, crop_type: str, growth_stage: str = "any", substrate: str = "any") -> CropProfile:
    """Import a CROPWAT-style parameter row into an *unverified* agent profile.

    Accepted columns include `crop`, `Kini`, `Kmax`, `Kend` and, when present,
    root-depth/depletion fields. Local moisture thresholds must be calibrated
    before setting ``verified`` to true.
    """
    rows = list(csv.DictReader(Path(source).read_text(encoding="utf-8").splitlines(), delimiter="\t"))
    target = crop_type.strip().lower()
    row = next((item for item in rows if item.get("crop", "").strip().lower() == target), None)
    if row is None:
        raise ValueError(f"Crop '{crop_type}' was not found in {source}.")
    value = lambda *names: next((float(row[name]) for name in names if row.get(name) not in (None, "")), None)
    return CropProfile(
        crop_type=crop_type, growth_stage=growth_stage, substrate=substrate,
        optimal_min=0, optimal_max=100, critical_min=0,  # intentionally unusable until calibration
        kc_initial=value("Kini", "kc_initial"), kc_mid=value("Kmax", "kc_mid"), kc_end=value("Kend", "kc_end"),
        root_depth_m=value("RootDepth", "root_depth_m"), depletion_fraction=value("p", "depletion_fraction"),
        default_duration_minutes=0, source="FAO CROPWAT import - calibration required", verified=False,
    )


def append_profile(profile: CropProfile, destination: str | Path) -> None:
    """Append/import a bootstrap profile without overwriting the source dataset."""
    path = Path(destination)
    existing = json.loads(path.read_text(encoding="utf-8")) if path.exists() else []
    existing.append(profile.__dict__)
    path.write_text(json.dumps(existing, indent=2) + "\n", encoding="utf-8")
