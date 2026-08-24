from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import (routes_agents, routes_dashboard, routes_decisions, routes_impact,
                         routes_learning, routes_resources, routes_zones, routes_demo, websocket)
from backend.database.database import init_db

app = FastAPI(title="SAMPADA Backend")

# Vite runs on a different development origin.  Keeping this explicit lets the
# browser consume the API and WebSocket while leaving production origins under
# deployment control.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    # Populate a usable dashboard immediately. Previously the frontend got a
    # successful but empty response until someone manually clicked Run Demo.
    from backend.api.routes_demo import run_demo_cycle
    run_demo_cycle()

@app.get("/health")
async def health():
    return {"status": "ok"}
