"""Test crop agent stub has generate_bid method and returns AgentBid-like dict
"""
from backend.agents.crop.crop_agent import CropAgent

def test_crop_agent_bid():
    agent = CropAgent()
    bid = agent.generate_bid({'zone_id': 'Z1'})
    assert bid.agent == 'crop'
    assert bid.zone_id == 'Z1'
