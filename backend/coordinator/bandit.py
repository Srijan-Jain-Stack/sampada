"""Contextual bandit placeholder
This module provides a clear interface so a bandit can be plugged in later.
"""

class Bandit:
    def __init__(self):
        pass

    def choose(self, context):
        # TODO: return an action index / policy
        return 0

    def update(self, chosen, reward):
        # TODO: online update
        pass
