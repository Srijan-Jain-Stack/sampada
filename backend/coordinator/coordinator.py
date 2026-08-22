"""Coordinator package
"""
from typing import List

class Coordinator:
    def __init__(self):
        # TODO: initialize negotiation, scheduler, bandit, safety, action engine
        pass

    def receive_bids(self, bids: List[dict]):
        # TODO: accept AgentBid objects and store
        raise NotImplementedError

    def decide(self):
        # TODO: run negotiation and scheduling to produce final actions
        raise NotImplementedError
