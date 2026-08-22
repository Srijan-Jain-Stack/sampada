from fastapi import APIRouter
from backend.schemas.agent import AgentInfo

router = APIRouter()

@router.get("/agents")
async def list_agents():
    return {"agents": ["crop", "irrigation", "climate", "energy"]}
