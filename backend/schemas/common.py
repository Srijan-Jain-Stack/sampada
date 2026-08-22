"""Common schemas
"""
from pydantic import BaseModel

class DashboardResponse(BaseModel):
    message: str
