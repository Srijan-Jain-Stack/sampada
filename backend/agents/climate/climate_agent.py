"""Climate agent stub
"""
from backend.schemas.agent import AgentBid

class ClimateAgent:
    def __init__(self):
        pass

    def generate_bid(self, sensor_state: dict) -> AgentBid:
        return AgentBid(agent="climate", zone_id=sensor_state.get('zone_id','Z1'), priority=0.3, bid=0.3, recommended_action="COOL", duration_minutes=5, reason="stub", confidence=0.6, resource_demand={})
