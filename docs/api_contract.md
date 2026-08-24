# API Contract

This documents the REST API endpoints and example responses used by the frontend.

Endpoints (GET):
- /api/dashboard
- /api/zones
- /api/resources
- /api/agents
- /api/decisions
- /api/learning
- /api/impact

WebSocket: /ws

`/api/dashboard` returns the latest zone sensor state, recent coordinator decisions,
agent names, and impact counters. `/api/zones` returns `Z1`–`Z3` with their latest
sensor payload; `/api/resources` projects tank, battery, and solar values from those
payloads. `/api/decisions` returns coordinator-approved or safety-rejected decisions;
`/api/learning` returns anonymized lesson cards only.

The WebSocket sends a dashboard snapshot immediately after connection and sends a
fresh snapshot whenever the client sends a text message (for example, `refresh`).
Frontend code must consume these APIs rather than import backend agent modules.

For local demonstrations without an MQTT broker, `POST /api/demo/cycle` runs one
simulated three-zone cycle through all agents, the Coordinator, and the safety guard,
then populates `/api/dashboard`.
