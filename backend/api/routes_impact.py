from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()


@router.get("/impact")
async def get_impact():
    return runtime.impact
