from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()


@router.get("/resources")
async def get_resources():
    return {"resources": {zone: {key: state.get(key) for key in ("tank_level", "battery", "solar_power")} for zone, state in runtime.sensor_states.items()}}
