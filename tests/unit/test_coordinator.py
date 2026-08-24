from backend.coordinator.coordinator import Coordinator


def _irrigation_bid(duration=10):
    return {
        "agent": "irrigation", "zone_id": "Z1", "priority": 0.9, "bid": 0.9,
        "recommended_action": "IRRIGATE", "duration_minutes": duration,
        "reason": "Dry soil", "confidence": 0.9, "resource_demand": {},
    }


def test_coordinator_schedules_safe_winning_bid():
    coordinator = Coordinator()
    coordinator.receive_bids([_irrigation_bid()])
    decision = coordinator.decide({"Z1": {"tank_level": 50, "battery": 50}})[0]
    assert decision["allowed"] is True
    assert decision["action"]["command"] == "IRRIGATE"


def test_coordinator_keeps_safety_veto_over_bid():
    coordinator = Coordinator()
    coordinator.receive_bids([_irrigation_bid(999)])
    decision = coordinator.decide({"Z1": {"tank_level": 50}})[0]
    assert decision["allowed"] is False
    assert decision["action"] is None
