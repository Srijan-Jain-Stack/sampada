"""Test irrigation agent
"""
from backend.agents.irrigation.irrigation_agent import IrrigationAgent

def test_irrigation_agent():
    a = IrrigationAgent()
    bid = a.generate_bid({'zone_id': 'Z2', 'soil_moisture': 30, 'crop_soil_moisture_pct': 25, 'crop_stress_score': 70, 'rain_expected': False})
    assert bid.agent == 'irrigation'
    assert bid.zone_id == 'Z2'
    assert bid.recommended_action == 'IRRIGATE'
    assert bid.water_need > 0
    assert bid.soil_moisture_pct == 25
    assert bid.crop_stress_score == 70
