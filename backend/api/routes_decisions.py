from fastapi import APIRouter
from backend.schemas.decision import DecisionResponse

router = APIRouter()

@router.get("/decisions", response_model=DecisionResponse)
async def list_decisions():
    # TODO: return recent decisions
    return DecisionResponse(message="stub")
