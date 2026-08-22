"""Test energy agent
"""
from backend.agents.energy.energy_agent import EnergyAgent

def test_energy_agent():
    a = EnergyAgent()
    bid = a.generate_bid({'zone_id': 'Z1'})
    assert bid.agent == 'energy'
