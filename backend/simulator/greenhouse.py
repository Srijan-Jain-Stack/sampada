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
        # deterministic but varied
        base = random.Random(self.seed + int(zone_id[-1]))
        state = {
            'zone_id': zone_id,
            'soil_moisture': round(base.uniform(10, 80), 2),
            'temperature': round(base.uniform(18, 35), 2),
            'humidity': round(base.uniform(30, 90), 2),
            'battery': round(base.uniform(20, 100), 2),
            'solar_power': round(base.uniform(0, 1000), 2),
            'tank_level': round(base.uniform(5, 100), 2),
            'rain_expected': base.choice([True, False])
        }
        return state

    def run_demo(self):
        print("Running simulator demo for zones Z1..Z3")
        for z in ['Z1', 'Z2', 'Z3']:
            print(self.sample_state(z))
