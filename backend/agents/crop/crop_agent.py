"""Crop agent stub
"""
from backend.schemas.agent import AgentBid

class CropAgent:
    def __init__(self, profile=None):
        self.profile = profile

    def generate_bid(self, sensor_state: dict) -> AgentBid:
        # TODO: compute a real bid based on profile and sensors
        return AgentBid(agent="crop", zone_id=sensor_state.get('zone_id','Z1'), priority=0.5, bid=0.5, recommended_action="NONE", duration_minutes=0, reason="stub", confidence=0.5, resource_demand={})
