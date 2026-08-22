"""MQTT topic constants
"""
TOPICS = {
    'sensor': 'sampada/sensors/{zone_id}',
    'agents': {
        'crop': 'sampada/agents/crop',
        'irrigation': 'sampada/agents/irrigation',
        'climate': 'sampada/agents/climate',
        'energy': 'sampada/agents/energy',
    },
    'coordinator': 'sampada/coordinator/decision',
    'actuator': 'sampada/actuators/{zone_id}',
    'logs': 'sampada/logs',
    'learning': 'sampada/learning/lessons'
}
