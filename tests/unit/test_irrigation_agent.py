"""Test irrigation agent
"""
from backend.agents.irrigation.irrigation_agent import IrrigationAgent

def test_irrigation_agent():
    a = IrrigationAgent()
    bid = a.generate_bid({'zone_id': 'Z2'})
    assert bid.agent == 'irrigation'
