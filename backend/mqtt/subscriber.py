"""MQTT message dispatcher for sensor and standardized agent topics."""
import json
from backend.mqtt.client import MQTTClient
from backend.mqtt.topics import TOPICS

class MQTTSubscriber:
    def __init__(self, coordinator=None, on_sensor=None):
        self.client = MQTTClient()
        self.coordinator = coordinator
        self.on_sensor = on_sensor

    def start(self):
        mqtt_client = self.client.connect()
        mqtt_client.on_message = self._on_message
        mqtt_client.subscribe(TOPICS["sensor"].replace("{zone_id}", "+"))
        for topic in TOPICS["agents"].values():
            mqtt_client.subscribe(topic)
        self.client.loop_start()
        return self

    def _on_message(self, _client, _userdata, message):
        try:
            payload = json.loads(message.payload.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            return
        if message.topic.startswith("sampada/sensors/"):
            if self.on_sensor:
                self.on_sensor(payload)
        elif message.topic in TOPICS["agents"].values() and self.coordinator:
            self.coordinator.receive_bids([payload])
