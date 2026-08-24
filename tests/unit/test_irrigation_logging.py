from backend.agents.irrigation.irrigation_agent import IrrigationAgent


def test_coordinator_irrigation_adapter_does_not_print(capsys):
    IrrigationAgent().generate_bid({"zone_id": "Z1", "soil_moisture": 30, "rain_expected": False})
    assert capsys.readouterr().out == ""
