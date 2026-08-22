from fastapi import APIRouter

router = APIRouter()

@router.get("/learning")
async def get_learning():
    return {"lessons": []}
