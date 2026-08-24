from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()

@router.get("/zones")
async def get_zones():
    return {"zones": [{"zone_id": zone, "sensors": runtime.sensor_states.get(zone, {})} for zone in ("Z1", "Z2", "Z3")]}
