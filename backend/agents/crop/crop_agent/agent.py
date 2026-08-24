"""Safe, explainable crop-stress assessment; this agent never actuates."""
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime
from .models import CropDecision, CropInput
from .profiles import CropProfile, CropProfileRepository

@dataclass(frozen=True)
class Reading:
    at: datetime; soil: float | None; wilt: float | None

@dataclass(frozen=True)
class Outcome:
    before_soil: float; after_soil: float; before_wilt: float | None; after_wilt: float | None

class CropAgent:
    def __init__(self, profiles: CropProfileRepository | None = None):
        self.profiles = profiles or CropProfileRepository.default()
        self.history: dict[str, deque[Reading]] = defaultdict(lambda: deque(maxlen=12))
        self.outcomes: dict[str, Outcome] = {}

    def record_irrigation_outcome(self, zone_id: str, before_moisture: float, after_moisture: float, before_wilting: float | None = None, after_wilting: float | None = None):
        """Call only after a Coordinator-approved irrigation action has been observed."""
        self.outcomes[zone_id] = Outcome(before_moisture, after_moisture, before_wilting, after_wilting)

    def evaluate(self, data: CropInput) -> CropDecision:
        profile = self.profiles.get(data.crop_type, data.growth_stage, data.substrate)
        if profile is None or not profile.verified:
            return self._needs_profile(data, profile)
        fresh, quality, alerts = self._quality(data)
        signals = self._signals(data, profile)
        stress, confidence = self._fuse(signals, quality)
        decline, hours_critical = self._trend(data, profile)
        if decline is not None and decline > 4:
            stress = min(100, stress + min(12, decline)); alerts.append("Rapid soil-moisture decline detected.")
        recovery = self._recovery(data.zone_id)
        if recovery == "not_recovering":
            confidence = max(.25, confidence - .12); alerts.append("Previous irrigation did not show expected recovery.")
        health = self._health(quality)
        if health == "fault_suspected":
            confidence = max(.25, confidence - .15); alerts.append("Sensor fault suspected; verify before non-critical action.")
        critical = data.soil_moisture_pct is not None and data.soil_moisture_pct <= profile.critical_min
        level = "critical" if critical or stress >= 75 else "high" if stress >= 55 else "watch" if stress >= 30 else "normal"
        action, duration = ("REQUEST_PRIORITY_IRRIGATION", profile.default_duration_minutes) if level == "critical" else (("REQUEST_IRRIGATION_REVIEW", 0) if stress >= 40 else ("MONITOR", 0))
        self.history[data.zone_id].append(Reading(data.observed_at, data.soil_moisture_pct, data.wilting_score))
        reason = f"{data.crop_type.title()} at {data.growth_stage} has crop stress {stress:.0f}/100."
        if data.soil_moisture_pct is not None: reason += f" Soil moisture is {data.soil_moisture_pct:.1f}% (calibrated target {profile.optimal_min}-{profile.optimal_max}%)."
        if critical: reason += " It is at or below the critical moisture floor."
        if health != "healthy": reason += f" Sensor health is {health}; verify inputs."
        return CropDecision(agent="crop", zone_id=data.zone_id, priority=round(stress/100,3), bid=round(stress/100,3), recommended_action=action, duration_minutes=duration, reason=reason, confidence=round(confidence,3), resource_demand={"water_litres":0.0,"power_watts":0.0}, stress_score=round(stress,1), stress_level=level, signal_breakdown={k:round(v,1) for k,v in signals.items()}, signal_quality=quality, data_freshness_minutes=fresh, sensor_health=health, profile_source=profile.source, profile_verified=True, alerts=alerts, moisture_decline_pct_per_hour=round(decline,2) if decline is not None else None, hours_below_critical=round(hours_critical,2), recovery_status=recovery)

    def _needs_profile(self, data, profile):
        return CropDecision(agent="crop", zone_id=data.zone_id, priority=0, bid=0, recommended_action="PROFILE_CONFIGURATION_REQUIRED", duration_minutes=0, reason=f"No verified profile exists for {data.crop_type}/{data.growth_stage}/{data.substrate}; load a reviewed FAO-style profile and locally calibrated thresholds.", confidence=0, resource_demand={"water_litres":0.0,"power_watts":0.0}, stress_score=0, stress_level="unknown", signal_breakdown={}, signal_quality={}, data_freshness_minutes={}, sensor_health="insufficient", profile_source=profile.source if profile else "none", profile_verified=False, alerts=["Crop profile must be reviewed and locally calibrated."])

    def _quality(self, data):
        now=data.observed_at; specs={"soil_moisture":(data.soil_moisture_pct,data.soil_observed_at or now,30),"wilting":(data.wilting_score,data.wilting_observed_at or now,60),"ndvi":(data.ndvi,data.ndvi_observed_at or now,14400),"ndvi_trend":(data.ndvi_trend,data.ndvi_observed_at or now,14400)}; freshness={}; quality={}; alerts=[]
        for name,(value,at,max_age) in specs.items():
            if value is None: continue
            age=max(0,(now-at).total_seconds()/60); freshness[name]=round(age,1); quality[name]="stale" if age>max_age else "fresh"
            if age>max_age: alerts.append(f"{name} reading is stale ({age:.0f} minutes old).")
        history=list(self.history[data.zone_id])
        if data.soil_moisture_pct is not None and len(history)>=3:
            prior=[r.soil for r in history[-3:]]
            if all(v is not None and abs(v-prior[0])<.01 for v in prior) and abs(data.soil_moisture_pct-prior[0])<.01: quality["soil_moisture"]="frozen"; alerts.append("Soil-moisture sensor appears frozen.")
            elif history[-1].soil is not None and abs(data.soil_moisture_pct-history[-1].soil)>35: quality["soil_moisture"]="jump"; alerts.append("Unexpected soil-moisture jump detected.")
        return freshness,quality,alerts

    @staticmethod
    def _signals(data, p: CropProfile):
        values={}
        if data.soil_moisture_pct is not None: values["soil_moisture"]=max(0,min(100,(p.optimal_min-data.soil_moisture_pct)/max(1,p.optimal_min-p.critical_min)*100))
        if data.wilting_score is not None: values["wilting"]=data.wilting_score
        if data.ndvi is not None: values["ndvi"]=max(0,min(100,(.55-data.ndvi)/.55*100))
        if data.ndvi_trend is not None: values["ndvi_trend"]=max(0,min(100,-data.ndvi_trend*100))
        return values

    @staticmethod
    def _fuse(signals, quality):
        base={"soil_moisture":.60,"wilting":.30,"ndvi":.07,"ndvi_trend":.03}; factor={"fresh":1,"stale":.25,"frozen":.20,"jump":.35}; weights={k:base[k]*factor[quality.get(k,"fresh")] for k in signals}; total=sum(weights.values())
        stress=sum(signals[k]*weights[k] for k in signals)/total; disagreement=max(signals.values())-min(signals.values()) if len(signals)>1 else 25
        return stress,max(.25,min(1,.45+.45*total-.25*disagreement/100))

    def _trend(self,data,p):
        history=list(self.history[data.zone_id]); decline=None; hours=0.0
        if data.soil_moisture_pct is not None and history and history[-1].soil is not None:
            elapsed=(data.observed_at-history[-1].at).total_seconds()/3600
            if elapsed>0: decline=(history[-1].soil-data.soil_moisture_pct)/elapsed
        if history and history[-1].soil is not None and history[-1].soil<=p.critical_min:
            hours=max(0,(data.observed_at-history[-1].at).total_seconds()/3600)
        return decline,hours

    def _recovery(self,zone):
        o=self.outcomes.get(zone)
        if not o: return "not_evaluated"
        return "recovering" if o.after_soil>o.before_soil+2 and (o.before_wilt is None or o.after_wilt is None or o.after_wilt<o.before_wilt) else "not_recovering"
    @staticmethod
    def _health(quality):
        s=set(quality.values())
        return "insufficient" if not s else "fault_suspected" if s & {"frozen","jump"} else "degraded" if "stale" in s else "healthy"
