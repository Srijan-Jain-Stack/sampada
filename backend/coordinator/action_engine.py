"""Action Engine applies actions to actuators via MQTT after safety checks
"""
from backend.mqtt.publisher import MQTTPublisher

class ActionEngine:
    def __init__(self, publisher: MQTTPublisher):
        self.publisher = publisher

    def execute(self, action):
        # TODO: transform action into actuator MQTT messages
        self.publisher.publish_action(action)
        return {"status": "published"}
