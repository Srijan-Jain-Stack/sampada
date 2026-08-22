from fastapi import APIRouter

router = APIRouter()

@router.get("/zones")
async def get_zones():
    # TODO: return zones information
    return {"zones": ["Z1", "Z2", "Z3"]}
