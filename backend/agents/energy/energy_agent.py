"""Energy agent stub
"""
from backend.schemas.agent import AgentBid

class EnergyAgent:
    def __init__(self):
        pass

    def generate_bid(self, sensor_state: dict) -> AgentBid:
        return AgentBid(agent="energy", zone_id=sensor_state.get('zone_id','Z1'), priority=0.2, bid=0.2, recommended_action="REDUCE_LOAD", duration_minutes=0, reason="stub", confidence=0.7, resource_demand={})
