"""End to end test with simulator and agents (minimal)
"""
from backend.simulator.greenhouse import Greenhouse
from backend.agents.crop.crop_agent import CropAgent
from backend.coordinator.negotiation import negotiate

def test_end_to_end():
    gh = Greenhouse(seed=123)
    state = gh.sample_state('Z1')
    ca = CropAgent()
    bid = ca.generate_bid(state).dict()
    winner = negotiate([bid])
    assert winner['agent'] == 'crop'
