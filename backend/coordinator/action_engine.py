"""Action Engine applies actions to actuators via MQTT after safety checks
"""
from backend.mqtt.publisher import MQTTPublisher

class ActionEngine:
    def __init__(self, publisher: MQTTPublisher):
        self.publisher = publisher

    def execute(self, action, decision=None):
        result = self.publisher.publish_action(action)
        if decision is not None:
            self.publisher.publish_decision(decision)
        return {"status": "published" if result["published"] else "failed", **result}
