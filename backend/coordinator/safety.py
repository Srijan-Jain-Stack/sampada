"""Safety guard module enforcing hard limits
"""
from backend.config.settings import settings

class SafetyGuard:
    def __init__(self):
        self.settings = settings

    def check(self, action):
        # TODO: implement checks against settings
        # Must return (allowed: bool, reason: str)
        return True, "ok"
