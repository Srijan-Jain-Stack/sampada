"""Safety guard module enforcing hard limits
"""
from backend.config.settings import settings

class SafetyGuard:
    def __init__(self):
        self.settings = settings

    def check(self, action, sensor_state=None):
        """Enforce non-negotiable operating limits before any actuator publish."""
        if not action or not action.get("zone_id"):
            return False, "Rejected: action is missing zone_id."
        command = action.get("command") or action.get("action")
        if not command:
            return False, "Rejected: action is missing command."
        state = sensor_state or {}
        duration = action.get("duration_minutes", 0)
        try:
            duration = float(duration)
        except (TypeError, ValueError):
            return False, "Rejected: duration_minutes must be numeric."
        if duration < 0:
            return False, "Rejected: duration cannot be negative."
        if command == "IRRIGATE":
            if duration <= 0:
                return False, "Rejected: irrigation requires a positive duration."
            if duration > self.settings.safety_max_irrigation_minutes:
                return False, "Rejected: irrigation duration exceeds hard limit."
            if state.get("tank_level") is not None and float(state["tank_level"]) < self.settings.safety_min_tank_level:
                return False, "Rejected: tank level is below the hard safety floor."
        if command in {"FAN_ON", "MIST_ON"}:
            if state.get("battery") is not None and float(state["battery"]) < self.settings.safety_min_battery_level:
                return False, "Rejected: battery level is below the hard safety floor."
        return True, "Approved by hard safety guardrails."
