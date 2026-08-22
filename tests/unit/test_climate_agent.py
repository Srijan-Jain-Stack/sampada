"""Test climate agent
"""
from backend.agents.climate.climate_agent import ClimateAgent

def test_climate_agent():
    a = ClimateAgent()
    bid = a.generate_bid({'zone_id': 'Z3'})
    assert bid.agent == 'climate'
