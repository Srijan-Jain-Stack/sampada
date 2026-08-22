"""Simple deterministic negotiation utilities (rule-based)
"""

def negotiate(bids):
    # TODO: implement deterministic rule-based negotiation
    # For now return highest priority/bid
    if not bids:
        return None
    return max(bids, key=lambda b: (b.get('priority', 0), b.get('bid', 0)))
