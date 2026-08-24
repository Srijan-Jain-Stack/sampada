"""SAMPADA Energy + Resource Scarcity Agent.
Determines available energy, predicts scarcity, and bids for conservation.
Never actuates; only advises Coordinator."""
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime
from typing import Literal

from .models import EnergyDecision, EnergyInput
from .profiles import EnergyProfile, EnergyProfileRepository


@dataclass(frozen=True)
class BatteryReading:
    at: datetime
    pct: float
    wh: float


@dataclass(frozen=True)
class SolarReading:
    at: datetime
    watts: float


class EnergyAgent:
    def __init__(self, profiles: EnergyProfileRepository | None = None):
        self.profiles = profiles or EnergyProfileRepository.default()
        self.battery_history: dict[str, deque[BatteryReading]] = defaultdict(lambda: deque(maxlen=48))
        self.solar_history: dict[str, deque[SolarReading]] = defaultdict(lambda: deque(maxlen=48))
        self.load_history: dict[str, deque[tuple[datetime, float]]] = defaultdict(lambda: deque(maxlen=48))

    def evaluate(self, data: EnergyInput) -> EnergyDecision:
        profile = self.profiles.get(data.zone_id)
        if profile is None or not profile.verified:
            return self._needs_profile(data, profile)

        freshness, quality, alerts = self._quality(data, profile)

        battery_wh = data.battery_pct / 100 * profile.battery_capacity_wh
        solar_wh = self._estimate_solar_wh(data, profile)
        load_wh = self._estimate_load_wh(data)

        available_energy_wh = battery_wh + solar_wh
        energy_budget_wh = self._calculate_energy_budget(battery_wh, solar_wh, load_wh, profile)

        battery_state = self._classify_battery_state(data.battery_pct, profile)
        scarcity_score, scarcity_state = self._calculate_scarcity(available_energy_wh, energy_budget_wh, load_wh, profile)

        trend_wh_per_hour = self._project_battery_trend(data.zone_id, data.observed_at, battery_wh)
        hours_to_critical, hours_to_emergency = self._project_time_to_thresholds(
            battery_wh, trend_wh_per_hour, profile
        )

        recommended_action, conservation_actions = self._determine_conservation(
            battery_state, scarcity_state, trend_wh_per_hour, profile
        )

        priority, bid, confidence = self._calculate_bid(
            battery_state, scarcity_state, trend_wh_per_hour, quality
        )

        self.battery_history[data.zone_id].append(BatteryReading(data.observed_at, data.battery_pct, battery_wh))
        if data.solar_watts is not None:
            self.solar_history[data.zone_id].append(SolarReading(data.observed_at, data.solar_watts))
        if data.load_watts is not None:
            self.load_history[data.zone_id].append((data.observed_at, data.load_watts))

        reason = self._build_reason(
            data, profile, battery_state, scarcity_state, scarcity_score,
            available_energy_wh, energy_budget_wh, trend_wh_per_hour,
            hours_to_critical, hours_to_emergency, conservation_actions
        )

        return EnergyDecision(
            agent="energy",
            zone_id=data.zone_id,
            priority=round(priority, 3),
            bid=round(bid, 3),
            recommended_action=recommended_action,
            duration_minutes=0,
            reason=reason,
            confidence=round(confidence, 3),
            resource_demand={"power_watts": 0.0, "energy_wh": 0.0},
            battery_pct=round(data.battery_pct, 1),
            battery_state=battery_state,
            solar_watts=data.solar_watts,
            available_energy_wh=round(available_energy_wh, 1),
            energy_budget_wh=round(energy_budget_wh, 1),
            scarcity_score=round(scarcity_score, 3),
            scarcity_state=scarcity_state,
            battery_trend_wh_per_hour=round(trend_wh_per_hour, 1) if trend_wh_per_hour is not None else None,
            hours_to_critical=round(hours_to_critical, 1) if hours_to_critical is not None else None,
            hours_to_emergency=round(hours_to_emergency, 1) if hours_to_emergency is not None else None,
            signal_quality=quality,
            data_freshness_minutes=freshness,
            sensor_health=self._health(quality),
            profile_source=profile.source,
            profile_verified=True,
            alerts=alerts,
            recommended_conservation=recommended_action,
            conservation_actions=conservation_actions,
        )

    def _needs_profile(self, data, profile):
        return EnergyDecision(
            agent="energy", zone_id=data.zone_id, priority=0, bid=0,
            recommended_action="PROFILE_CONFIGURATION_REQUIRED", duration_minutes=0,
            reason=f"No verified energy profile for zone {data.zone_id}; configure battery/solar specs.",
            confidence=0, resource_demand={"power_watts": 0.0, "energy_wh": 0.0},
            battery_pct=data.battery_pct, battery_state="unknown",
            solar_watts=data.solar_watts, available_energy_wh=0, energy_budget_wh=0,
            scarcity_score=1, scarcity_state="critical",
            battery_trend_wh_per_hour=None, hours_to_critical=None, hours_to_emergency=None,
            signal_quality={}, data_freshness_minutes={}, sensor_health="insufficient",
            profile_source=profile.source if profile else "none", profile_verified=False,
            alerts=["Energy profile must be reviewed and locally calibrated."],
            recommended_conservation="PROFILE_CONFIGURATION_REQUIRED", conservation_actions=[]
        )

    def _quality(self, data, profile):
        now = data.observed_at
        specs = {
            "battery": (data.battery_pct, data.battery_observed_at or now, 15),
            "solar": (data.solar_watts, data.solar_observed_at or now, 30),
            "load": (data.load_watts, data.load_observed_at or now, 30),
            "grid": (1.0 if data.grid_available else 0.0, data.grid_observed_at or now, 60),
        }
        freshness = {}
        quality = {}
        alerts = []
        for name, (value, at, max_age) in specs.items():
            if value is None:
                continue
            age = max(0, (now - at).total_seconds() / 60)
            freshness[name] = round(age, 1)
            quality[name] = "stale" if age > max_age else "fresh"
            if age > max_age:
                alerts.append(f"{name} reading is stale ({age:.0f} minutes old).")

        hist = list(self.battery_history[data.zone_id])
        if data.battery_pct is not None and len(hist) >= 3:
            prior = [r.pct for r in hist[-3:]]
            if all(v is not None and abs(v - prior[0]) < 0.01 for v in prior) and abs(data.battery_pct - prior[0]) < 0.01:
                quality["battery"] = "frozen"
                alerts.append("Battery sensor appears frozen.")
            elif hist[-1].pct is not None and abs(data.battery_pct - hist[-1].pct) > 25:
                quality["battery"] = "jump"
                alerts.append("Unexpected battery percentage jump detected.")

        return freshness, quality, alerts

    @staticmethod
    def _estimate_solar_wh(data, profile: EnergyProfile) -> float:
        if data.solar_watts is None:
            return 0.0
        hours_remaining = max(0, 18 - datetime.now().hour) if datetime.now().hour < 18 else 0
        return data.solar_watts * hours_remaining * 0.85

    @staticmethod
    def _estimate_load_wh(data) -> float:
        if data.load_watts is None:
            return 0.0
        return data.load_watts * 1.0

    def _calculate_energy_budget(self, battery_wh: float, solar_wh: float, load_wh: float, profile: EnergyProfile) -> float:
        emergency_reserve = profile.emergency_reserve_wh or (profile.battery_capacity_wh * profile.battery_emergency_pct / 100)
        usable_battery = max(0, battery_wh - emergency_reserve)
        return usable_battery + solar_wh - load_wh

    @staticmethod
    def _classify_battery_state(battery_pct: float, profile: EnergyProfile) -> Literal["normal", "conserve", "critical", "emergency"]:
        if battery_pct <= profile.battery_emergency_pct:
            return "emergency"
        elif battery_pct <= profile.battery_critical_pct:
            return "critical"
        elif battery_pct <= profile.battery_conserve_pct:
            return "conserve"
        else:
            return "normal"

    def _calculate_scarcity(self, available_wh: float, budget_wh: float, load_wh: float, profile: EnergyProfile) -> tuple[float, Literal["none", "watch", "high", "critical"]]:
        if available_wh <= 0:
            return 1.0, "critical"
        ratio = budget_wh / max(1, load_wh * 4)
        if ratio >= 2.0:
            return 0.0, "none"
        elif ratio >= 1.0:
            return 0.25, "watch"
        elif ratio >= 0.5:
            return 0.6, "high"
        else:
            return 0.9, "critical"

    def _project_battery_trend(self, zone_id: str, now: datetime, current_wh: float) -> float | None:
        hist = list(self.battery_history[zone_id])
        if len(hist) < 3:
            return None
        xs = [(r.at - hist[0].at).total_seconds() / 3600 for r in hist]
        ys = [r.wh for r in hist]
        n = len(xs)
        sum_x = sum(xs)
        sum_y = sum(ys)
        sum_xy = sum(x * y for x, y in zip(xs, ys))
        sum_x2 = sum(x * x for x in xs)
        denom = n * sum_x2 - sum_x * sum_x
        if abs(denom) < 1e-6:
            return None
        slope = (n * sum_xy - sum_x * sum_y) / denom
        return slope

    def _project_time_to_thresholds(self, current_wh: float, trend_wh_per_hour: float | None, profile: EnergyProfile) -> tuple[float | None, float | None]:
        if trend_wh_per_hour is None or trend_wh_per_hour >= 0:
            return None, None
        critical_wh = profile.battery_capacity_wh * profile.battery_critical_pct / 100
        emergency_wh = profile.battery_capacity_wh * profile.battery_emergency_pct / 100
        hours_to_critical = (current_wh - critical_wh) / abs(trend_wh_per_hour) if current_wh > critical_wh else 0
        hours_to_emergency = (current_wh - emergency_wh) / abs(trend_wh_per_hour) if current_wh > emergency_wh else 0
        return max(0, hours_to_critical), max(0, hours_to_emergency)

    def _determine_conservation(self, battery_state, scarcity_state, trend, profile) -> tuple[str, list[str]]:
        actions = []
        if battery_state == "emergency" or scarcity_state == "critical":
            actions = ["SHED_ALL_NON_CRITICAL", "DISABLE_CLIMATE", "DISABLE_IRRIGATION", "MINIMAL_LIGHTING"]
            return "EMERGENCY_CONSERVATION", actions
        elif battery_state == "critical" or scarcity_state == "high":
            actions = ["REDUCE_CLIMATE_LOAD", "DELAY_IRRIGATION", "REDUCE_LIGHTING"]
            return "CRITICAL_CONSERVATION", actions
        elif battery_state == "conserve" or scarcity_state == "watch":
            actions = ["OPTIMIZE_CLIMATE_SCHEDULE", "DEFER_IRRIGATION"]
            return "CONSERVE_MODE", actions
        else:
            actions = ["NORMAL_OPERATION"]
            return "NORMAL_OPERATION", actions

    def _calculate_bid(self, battery_state, scarcity_state, trend, quality) -> tuple[float, float, float]:
        state_weight = {"normal": 0.1, "conserve": 0.4, "critical": 0.7, "emergency": 0.95}
        scarcity_weight = {"none": 0.0, "watch": 0.2, "high": 0.5, "critical": 0.85}
        priority = max(state_weight[battery_state], scarcity_weight[scarcity_state])
        if trend is not None and trend < -50:
            priority = min(1.0, priority + 0.15)
        quality_factor = min(1.0, sum(1 for v in quality.values() if v == "fresh") / max(1, len(quality)))
        confidence = 0.5 + 0.4 * quality_factor
        bid = priority
        return priority, bid, confidence

    def _build_reason(self, data, profile, battery_state, scarcity_state, scarcity_score,
                      available_wh, budget_wh, trend, hours_crit, hours_emerg, actions) -> str:
        parts = [
            f"Zone {data.zone_id}: Battery at {data.battery_pct:.1f}% ({battery_state.upper()})."
        ]
        if data.solar_watts is not None:
            parts.append(f"Solar generating {data.solar_watts:.0f}W.")
        parts.append(f"Available energy: {available_wh:.0f}Wh. Budget after reserves: {budget_wh:.0f}Wh.")
        parts.append(f"Scarcity: {scarcity_state.upper()} ({scarcity_score:.0%}).")
        if trend is not None:
            direction = "discharging" if trend < 0 else "charging" if trend > 0 else "stable"
            parts.append(f"Battery trend: {trend:+.0f}Wh/h ({direction}).")
        if hours_crit is not None:
            parts.append(f"Est. {hours_crit:.1f}h to critical, {hours_emerg:.1f}h to emergency.")
        parts.append(f"Conservation: {', '.join(actions)}.")
        return " ".join(parts)

    @staticmethod
    def _health(quality):
        s = set(quality.values())
        if not s:
            return "insufficient"
        if s & {"frozen", "jump"}:
            return "fault_suspected"
        if "stale" in s:
            return "degraded"
        return "healthy"

    def generate_bid(self, sensor_state: dict) -> EnergyDecision:
        # Normalize shared simulator/MQTT names and make missing telemetry a
        # conservative, non-actuating baseline rather than a validation crash.
        payload = {
            "zone_id": sensor_state.get("zone_id", "Z1"),
            "battery_pct": sensor_state.get("battery_pct", sensor_state.get("battery", 50.0)),
            "solar_watts": sensor_state.get("solar_watts", sensor_state.get("solar_power", 0.0)),
            "load_watts": sensor_state.get("load_watts", 250.0),
            "grid_available": sensor_state.get("grid_available", True),
        }
        input_data = EnergyInput(**payload, observed_at=datetime.now())
        return self.evaluate(input_data)
