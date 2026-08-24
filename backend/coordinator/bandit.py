"""Small dependency-free LinUCB-style contextual bandit.

It ranks already-negotiated candidates; it never creates actuator commands and is
always followed by :class:`SafetyGuard`.
"""

from collections import defaultdict
import math

class Bandit:
    def __init__(self, exploration=0.15):
        self.exploration = exploration
        self.counts = defaultdict(int)
        self.rewards = defaultdict(float)

    def choose(self, context, options=None):
        """Choose an option index, favoring historical recovery without ignoring need."""
        options = options or ["default"]
        urgency = float((context or {}).get("priority", 0))
        def score(option):
            count = self.counts[option]
            mean = self.rewards[option] / count if count else 0.0
            bonus = self.exploration * math.sqrt(math.log(sum(self.counts.values()) + 2) / (count + 1))
            return urgency + mean + bonus
        return max(range(len(options)), key=lambda index: score(options[index]))

    def update(self, chosen, reward):
        self.counts[chosen] += 1
        self.rewards[chosen] += max(-1.0, min(1.0, float(reward)))
