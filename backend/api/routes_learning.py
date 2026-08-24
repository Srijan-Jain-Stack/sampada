from fastapi import APIRouter
from backend.services.runtime import runtime

router = APIRouter()

@router.get("/learning")
async def get_learning():
    return {"lessons": [lesson.model_dump() for lesson in runtime.lessons.list()]}
