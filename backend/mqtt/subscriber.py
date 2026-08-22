"""MQTT subscriber utilities (stub)
"""
from backend.mqtt.client import MQTTClient

class MQTTSubscriber:
    def __init__(self):
        self.client = MQTTClient()

    def start(self):
        # TODO: subscribe to topics and dispatch to handlers
        pass
