"""Greenhouse deterministic simulator for multiple zones
"""
import random
from typing import Dict

class Greenhouse:
    def __init__(self, seed: int = 42):
        self.seed = seed
        random.seed(seed)
        self.zones = {
            'Z1': {'crop': 'tomato'},
            'Z2': {'crop': 'cucumber'},
            'Z3': {'crop': 'capsicum'},
        }

    def sample_state(self, zone_id: str) -> Dict:
        # A realistic, stable starting point for the dashboard.  Scenario
        # overrides create stress deliberately; the normal view should not
        # randomly put every greenhouse zone into an emergency.
        states = {
            'Z1': {'soil_moisture': 68.0, 'temperature': 24.5, 'humidity': 65.0, 'battery': 81.0, 'solar_power': 850.0, 'tank_level': 75.0, 'rain_expected': False},
            'Z2': {'soil_moisture': 58.0, 'temperature': 26.0, 'humidity': 68.0, 'battery': 72.0, 'solar_power': 720.0, 'tank_level': 75.0, 'rain_expected': False},
            'Z3': {'soil_moisture': 58.0, 'temperature': 26.0, 'humidity': 67.0, 'battery': 70.0, 'solar_power': 700.0, 'tank_level': 75.0, 'rain_expected': False},
        }
        return {'zone_id': zone_id, **states[zone_id]}

    def run_demo(self):
        print("Running simulator demo for zones Z1..Z3")
        for z in ['Z1', 'Z2', 'Z3']:
            print(self.sample_state(z))
