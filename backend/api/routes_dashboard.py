from fastapi import APIRouter
from backend.schemas.common import DashboardResponse

router = APIRouter()

@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard():
    # TODO: return aggregated dashboard data
    return DashboardResponse(message="This is a placeholder dashboard response")
