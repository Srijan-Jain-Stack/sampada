import asyncio

from backend.api.routes_agents import list_agents
from backend.api.routes_demo import run_demo_cycle


def test_demo_cycle_populates_dashboard():
    result = run_demo_cycle()
    assert len(result["decisions"]) == 3
    assert "Z1" in result["dashboard"]["zones"]
    assert any(item["winning_bid"]["agent"] == "crop" for item in result["decisions"])
    agents = asyncio.run(list_agents())
    crop = next(agent for agent in agents["agents"] if agent["name"] == "crop")
    assert crop["status"] == "active"
    assert crop["latest_bids"]
    irrigation = next(agent for agent in agents["agents"] if agent["name"] == "irrigation")
    crop_z1 = next(bid for bid in crop["latest_bids"] if bid["zone_id"] == "Z1")
    irrigation_z1 = next(bid for bid in irrigation["latest_bids"] if bid["zone_id"] == "Z1")
    assert irrigation_z1["soil_moisture_pct"] == crop_z1["soil_moisture_pct"]
