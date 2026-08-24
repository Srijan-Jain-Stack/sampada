"""Convert an approved bid into a normalized actuator command."""

from backend.mqtt.topics import TOPICS


ACTION_ALIASES = {
    "REQUEST_PRIORITY_IRRIGATION": "IRRIGATE",
    "REQUEST_IRRIGATION_REVIEW": "IRRIGATE",
    "EMERGENCY_IRRIGATION": "IRRIGATE",
    "DELAY": "MONITOR",
    "WAIT": "MONITOR",
    "NO_ACTION": "MONITOR",
    "COOL": "FAN_ON",
    "MIST": "MIST_ON",
    "REDUCE_LOAD": "REDUCE_LOAD",
    "MONITOR": "MONITOR",
}

def schedule(decision):
    """Produce the one wire-format action the actuator layer accepts."""
    if not decision:
        return None
    zone_id = decision["zone_id"]
    command = ACTION_ALIASES.get(decision.get("recommended_action", ""), decision.get("recommended_action", "MONITOR"))
    return {
        "zone_id": zone_id,
        "command": command,
        "duration_minutes": max(0, int(decision.get("duration_minutes", 0))),
        "parameters": {"resource_demand": decision.get("resource_demand", {})},
        "source_agent": decision.get("agent"),
        "reason": decision.get("reason", ""),
        "topic": TOPICS["actuator"].format(zone_id=zone_id),
    }
