"""MQTT publisher utilities
"""
from backend.mqtt.client import MQTTClient
import json

class MQTTPublisher:
    def __init__(self, client: MQTTClient = None):
        self.client = client or MQTTClient()

    def publish_action(self, action: dict):
        # TODO: publish to sampada/actuators/{zone}
        topic = f"{action.get('topic','sampada/actuators/Z1')}"
        payload = json.dumps(action)
        # This is a stub, actual client may need connect/loop
        try:
            self.client.connect()
            self.client.client.publish(topic, payload)
        except Exception:
            pass
