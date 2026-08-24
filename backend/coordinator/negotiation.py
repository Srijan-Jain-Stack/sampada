"""Deterministic, explainable bid selection.

The coordinator deliberately keeps negotiation separate from learning: agent urgency
and confidence determine the safe baseline; the bandit can only break close ties.
"""

def negotiate(bids):
    """Return the highest-priority valid bid with deterministic tie breaking."""
    if not bids:
        return None
    # ``negotiate`` is also useful in isolation for comparing bids.  Zone IDs are
    # required at the Coordinator boundary, not by this ranking helper.
    valid = [bid for bid in bids if bid.get("agent")]
    if not valid:
        return None
    return max(
        valid,
        key=lambda bid: (
            float(bid.get("priority", 0)),
            float(bid.get("bid", 0)),
            float(bid.get("confidence", 0)),
            str(bid.get("agent", "")),
        ),
    )
