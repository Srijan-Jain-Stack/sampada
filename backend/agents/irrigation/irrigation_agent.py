"""Irrigation agent stub and weather helper
"""
from backend.schemas.agent import AgentBid

class IrrigationAgent:
    def __init__(self):
        pass

    def generate_bid(self, sensor_state: dict) -> AgentBid:
        return AgentBid(agent="irrigation", zone_id=sensor_state.get('zone_id','Z1'), priority=0.4, bid=0.4, recommended_action="IRRIGATE", duration_minutes=10, reason="stub", confidence=0.5, resource_demand={})
