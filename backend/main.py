from fastapi import FastAPI
from backend.api import routes_dashboard, websocket

app = FastAPI(title="SAMPADA Backend")

# Include routers
app.include_router(routes_dashboard.router, prefix="/api")
app.include_router(websocket.router)

@app.get("/health")
async def health():
    return {"status": "ok"}
