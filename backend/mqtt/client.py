"""MQTT client wrapper using paho-mqtt
"""
import paho.mqtt.client as mqtt
from backend.config.settings import settings
from backend.mqtt.topics import TOPICS

class MQTTClient:
    def __init__(self):
        self.client = mqtt.Client()
        self.broker = settings.mqtt_broker

    def connect(self):
        self.client.connect(self.broker, settings.mqtt_port, settings.mqtt_keepalive)
        return self.client

    def loop_start(self):
        self.client.loop_start()
