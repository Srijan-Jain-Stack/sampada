# SAMPADA

Smart Adaptive Multi-Agent Platform for Agricultural Decision Assistance (initial scaffold)

This repository contains the initial architecture and scaffolding for SAMPADA. It provides a multi-agent greenhouse decision-support system with simulated sensors, agents, a coordinator, and a React frontend. This scaffold is intended to let 6 developers work independently on well-defined interfaces.

See docs/ for architecture, API contracts, MQTT topics, and development workflow.

Setup (backend):

1. Create and activate a Python 3.11+ venv

   python -m venv .venv
   source .venv/bin/activate  # macOS / Linux
   .venv\Scripts\activate     # Windows (PowerShell)

2. Install dependencies

   pip install -r requirements.txt

3. Run the backend (development)

   .\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000

4. Run simulator (in another terminal)

   python -m backend.simulator.sensor_simulator

Frontend (see frontend/README.md)

Running tests

    pytest -q

