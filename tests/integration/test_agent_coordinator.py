"""Integration: agent-coordinator flow
"""
from backend.coordinator.negotiation import negotiate
from backend.agents.crop.crop_agent import CropAgent
from backend.agents.irrigation.irrigation_agent import IrrigationAgent

def test_agent_coordinator():
    ca = CropAgent()
    ia = IrrigationAgent()
    bids = [ca.generate_bid({'zone_id': 'Z1'}).dict(), ia.generate_bid({'zone_id': 'Z1'}).dict()]
    winner = negotiate(bids)
    assert winner is not None
