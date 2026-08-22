"""Test negotiation selects highest priority/bid
"""
from backend.coordinator.negotiation import negotiate

def test_negotiate():
    bids = [
        {'agent': 'crop', 'priority': 0.9, 'bid': 0.9},
        {'agent': 'irrigation', 'priority': 0.8, 'bid': 0.86}
    ]
    winner = negotiate(bids)
    assert winner['agent'] == 'crop'
