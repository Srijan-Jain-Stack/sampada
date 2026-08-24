# Coordinator and integration layer

The coordinator is the only component permitted to publish actuator commands. It
accepts the common `AgentBid` JSON published by crop, irrigation, climate and energy
agents, selects one bid per zone, normalizes it to an actuator command, then applies
hard safety checks.

```python
from backend.coordinator.coordinator import Coordinator

coordinator = Coordinator()
coordinator.receive_bids([{
    "agent": "irrigation", "zone_id": "Z1", "priority": 0.9, "bid": 0.9,
    "recommended_action": "IRRIGATE", "duration_minutes": 10,
    "reason": "Critical soil moisture", "confidence": 0.9,
    "resource_demand": {"water_litres": 8},
}])
print(coordinator.decide({"Z1": {"tank_level": 50, "battery": 70}}))
```

Safety limits are configured through `SAFETY_MIN_TANK_LEVEL`,
`SAFETY_MAX_IRRIGATION_MINUTES`, and `SAFETY_MIN_BATTERY_LEVEL`. The bandit only
ranks equally urgent candidates; it cannot bypass a safety rejection.

MQTT sensor messages use `sampada/sensors/{zone_id}` and agent bids use the four
topics documented in `docs/mqtt_topics.md`. The integration layer publishes final
decisions only to `sampada/coordinator/decision` and `sampada/actuators/{zone_id}`.
