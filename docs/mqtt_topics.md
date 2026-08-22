# MQTT Topics

Consistent topics used by the system:

- sampada/sensors/{zone_id}
- sampada/agents/crop
- sampada/agents/irrigation
- sampada/agents/climate
- sampada/agents/energy
- sampada/coordinator/decision
- sampada/actuators/{zone_id}
- sampada/logs
- sampada/learning/lessons

Agents publish Bids to their agent topic. Sensors publish readings to sampada/sensors/{zone_id}.
Coordinator publishes final decisions to sampada/coordinator/decision and sampada/actuators/{zone_id}.

Do not let agents control actuators directly.
