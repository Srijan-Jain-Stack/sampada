# SAMPADA

Smart Adaptive Multi-Agent Platform for Agricultural Decision Assistance. The React dashboard consumes the FastAPI service only; the backend runs the simulator, Crop, Irrigation, Climate, and Energy agents, then sends every bid through the Coordinator and safety guard.

## Run the complete application (Windows PowerShell)

Prerequisites: Node.js 18+ and Python 3.13 (or Python 3.11+) from [python.org](https://www.python.org/downloads/windows/) with **Add Python to PATH** selected.

1. From the repository root, recreate the virtual environment if one already exists but is unusable:

   ```powershell
   py -3.13 -m venv venv
   .\venv\Scripts\Activate.ps1
   python -m pip install --upgrade pip setuptools wheel
   pip install --upgrade --prefer-binary --no-cache-dir -r requirements.txt
   ```

2. Start the FastAPI backend in terminal 1:

   ```powershell
   cd "C:\Users\parth\OneDrive\Desktop\New folder\sampada"
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
   .\venv\Scripts\Activate.ps1
   python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8010
   ```

3. In terminal 2, start the frontend:

   ```powershell
      cd "C:\Users\parth\OneDrive\Desktop\New folder\sampada"
      @"
      VITE_API_URL=http://localhost:8010
      VITE_WS_URL=ws://localhost:8010/ws
      "@ | Set-Content frontend\.env

      cd frontend
      npm run dev
   ```

4. Open `http://localhost:3000`, click **Run Demo**, then choose a scenario. The dashboard will trigger `POST /api/demo/cycle`; all four agents bid for each simulator zone, the Coordinator chooses a winner, and the WebSocket refreshes the displayed dashboard.

Optional frontend environment file, `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

## Verify the integration

With the backend running, use a third PowerShell terminal:

```powershell
Invoke-RestMethod http://localhost:8000/health
$result = Invoke-RestMethod -Method Post http://localhost:8000/api/demo/cycle -ContentType 'application/json' -Body '{}'
$result.decisions | Select-Object zone_id, allowed, reason
Invoke-RestMethod http://localhost:8000/api/dashboard
```

Expected result: `/health` returns `status: ok`; the demo produces three zone decisions; `/api/dashboard` contains sensor states, four sets of agent bids, and decision history. The frontend navbar changes to **Live System** once its WebSocket connects.

Run automated checks from the root after activating the environment:

```powershell
python -m pytest -q
cd frontend
npm run build
```

See `docs/` for architecture, contracts, MQTT topics, and development workflow.
