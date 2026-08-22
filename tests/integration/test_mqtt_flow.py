"""MQTT flow test (stub) - does not require broker
"""
from backend.mqtt.topics import TOPICS

def test_mqtt_topics():
    assert 'sensor' in TOPICS
