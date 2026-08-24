from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()

@router.get("/decisions")
async def list_decisions():
    return {"decisions": runtime.coordinator.decisions[-50:]}
