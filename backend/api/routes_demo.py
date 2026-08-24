"""Demo-only integration endpoint for a visible end-to-end control cycle."""
from fastapi import APIRouter

from backend.agents.climate.climate_agent import ClimateAgent
from backend.agents.crop.crop_agent import CropAgent
from backend.agents.energy.energy_agent import EnergyAgent
from backend.agents.irrigation.irrigation_agent import IrrigationAgent
from backend.services.runtime import runtime
from backend.simulator.greenhouse import Greenhouse

router = APIRouter()
_greenhouse = Greenhouse(seed=42)
_crop_agent = CropAgent()
_irrigation_agent = IrrigationAgent()
_climate_agent = ClimateAgent()
_energy_agent = EnergyAgent()


@router.post("/demo/cycle")
def run_demo_cycle():
    """Run one simulated three-zone cycle and expose its results to the dashboard.

    This is intentionally an API demo path: real deployments receive the same sensor
    and bid contracts over MQTT instead.
    """
    all_bids = []
    for zone_id, metadata in _greenhouse.zones.items():
        sensor_state = _greenhouse.sample_state(zone_id)
        sensor_state["crop"] = metadata["crop"]
        runtime.record_sensor({"zone_id": zone_id, "data": sensor_state})
        crop_bid = _crop_agent.generate_bid(sensor_state).model_dump()
        irrigation_input = runtime.coordinator.irrigation_context(sensor_state, crop_bid)
        all_bids.extend([
            crop_bid,
            _irrigation_agent.generate_bid(irrigation_input).model_dump(),
            _climate_agent.generate_bid(sensor_state).model_dump(),
            _energy_agent.generate_bid(sensor_state).model_dump(),
        ])
    for bid in all_bids:
        runtime.record_agent_bid(bid)
    runtime.coordinator.receive_bids(all_bids)
    decisions = runtime.coordinator.decide(runtime.sensor_states)
    return {"decisions": decisions, "dashboard": runtime.dashboard()}
