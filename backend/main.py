from fastapi import FastAPI
from backend.api import (routes_agents, routes_dashboard, routes_decisions, routes_impact,
                         routes_learning, routes_resources, routes_zones, routes_demo, websocket)
from backend.database.database import init_db

app = FastAPI(title="SAMPADA Backend")

# Include routers
app.include_router(routes_dashboard.router, prefix="/api")
app.include_router(routes_zones.router, prefix="/api")
app.include_router(routes_resources.router, prefix="/api")
app.include_router(routes_agents.router, prefix="/api")
app.include_router(routes_decisions.router, prefix="/api")
app.include_router(routes_learning.router, prefix="/api")
app.include_router(routes_impact.router, prefix="/api")
app.include_router(routes_demo.router, prefix="/api")
app.include_router(websocket.router)

@app.on_event("startup")
async def initialize_database():
    init_db()

@app.get("/health")
async def health():
    return {"status": "ok"}
