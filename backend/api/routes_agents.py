from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()

@router.get("/agents")
async def list_agents():
    return {
        "agents": [
            {
                "name": name,
                "status": "active" if runtime.agent_outputs.get(name) else "waiting",
                "pending_bids": sum(b["agent"] == name for b in runtime.coordinator.bids),
                "latest_bids": list(runtime.agent_outputs.get(name, {}).values()),
            }
            for name in ("crop", "irrigation", "climate", "energy")
        ]
    }
