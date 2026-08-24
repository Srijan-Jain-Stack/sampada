"""MQTT publisher utilities
"""
from backend.mqtt.client import MQTTClient
from backend.mqtt.topics import TOPICS
import json

class MQTTPublisher:
    def __init__(self, client: MQTTClient = None):
        self.client = client or MQTTClient()

    def publish_action(self, action: dict):
        """Publish a coordinator-approved command to its zone actuator topic."""
        topic = action.get("topic") or TOPICS["actuator"].format(zone_id=action["zone_id"])
        payload = json.dumps(action)
        result = self.client.client.publish(topic, payload)
        return {"topic": topic, "published": getattr(result, "rc", 0) == 0}

    def publish(self, topic: str, payload: dict):
        result = self.client.client.publish(topic, json.dumps(payload))
        return {"topic": topic, "published": getattr(result, "rc", 0) == 0}

    def publish_decision(self, decision: dict):
        """Publish the auditable coordinator result separately from actuator I/O."""
        return self.publish(TOPICS["coordinator"], decision)
