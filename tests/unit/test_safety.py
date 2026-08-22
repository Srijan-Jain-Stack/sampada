"""Basic safety guard test
"""
from backend.coordinator.safety import SafetyGuard

def test_safety_guard():
    sg = SafetyGuard()
    allowed, reason = sg.check({'action': 'IRRIGATE'})
    assert isinstance(allowed, bool)
