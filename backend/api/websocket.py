from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from backend.services.runtime import runtime

router = APIRouter()

@router.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    """Serve live dashboard snapshots; clients can send ``refresh`` on each cycle."""
    await websocket.accept()
    await websocket.send_json(runtime.dashboard())
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json(runtime.dashboard())
    except WebSocketDisconnect:
        pass
