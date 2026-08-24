# SAMPADA — Multi-Agent Smart Greenhouse Frontend

**Smart India Hackathon (SIH) 2026**  
**Title:** *Multi-Agent Smart Greenhouse with Dynamic Resource Scheduling*  
**Role:** Frontend System Dashboard (Person 6)

---

## 📖 1. Overview & Core Concept

**SAMPADA** is an intelligent greenhouse management system powered by cooperating autonomous agents that dynamically negotiate for scarce resources (water, solar energy, thermal regulation):

$$\text{Sensors} \longrightarrow \text{4 Agents Bid} \longrightarrow \text{🤖 Coordinator Arbitration} \longrightarrow \text{🛡️ Safety Gate} \longrightarrow \text{Final Action} \longrightarrow \text{Impact \& Learning}$$

The frontend acts as a **pure visualization, explanation, and monitoring layer**. It communicates exclusively with Person 5's backend via REST APIs and WebSocket. It does **not** communicate directly with MQTT, ESP32 microcontrollers, or Python internals.

---

## 🛠️ 2. Technology Stack

* **Core:** React 18, Vite, JavaScript (ES Modules)
* **Routing:** React Router v6 (`/`, `/zones`, `/zones/:id`, `/resources`, `/agents`, `/decisions`, `/analytics`, `/learning`)
* **Styling:** Tailwind CSS with modern agri-tech palette, glassmorphism & responsive grid
* **Data Visualization:** Recharts (Area charts, bar charts, line curves, and distribution pies)
* **Icons:** Lucide React
* **State Management:** React Context (`GreenhouseContext`)
* **Networking:** Native WebSocket hook (`useWebSocket`) with auto-reconnect + Fetch REST client (`sampadaAPI`)

---

## 🚀 3. Quick Start & Installation

```bash
# Clone or navigate to the repository
cd d:/Sampada

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will start immediately at `http://localhost:5173`.

---

## ⚙️ 4. Environment Variables

Create a `.env` file in the project root:

```env
# Backend REST API endpoint (Person 5 FastAPI service)
VITE_API_URL=http://localhost:8000

# Backend WebSocket endpoint
VITE_WS_URL=ws://localhost:8000/ws
```

*If the backend is not running, the frontend automatically falls back to the integrated mock engine with zero crashes or errors.*

---

## 📁 5. Project Folder Structure

```text
src/
├── api/
│   └── sampadaAPI.js               # Centralized REST API client with mock fallback
├── context/
│   └── GreenhouseContext.jsx       # Global state: view mode, live data, demo engine, WS state
├── hooks/
│   ├── useWebSocket.js             # Native WebSocket hook with auto-reconnect & mock ticker
│   └── useGreenhouseData.js        # Data orchestration hook
├── data/
│   ├── mockData.js                 # Complete realistic dataset for 3 zones, 4 agents, resources, etc.
│   └── demoScenarios.js            # 4 Interactive judge demo scenarios with 9-step timeline
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx              # Header with WS status, live time, Farmer/Tech switch & Demo button
│   │   ├── Sidebar.jsx             # Navigation sidebar with active route badges
│   │   └── PageContainer.jsx       # Responsive layout container with mode banner
│   ├── dashboard/
│   │   ├── MetricCard.jsx          # Top telemetry cards (Crop Health, Water, Battery, Solar, Safety)
│   │   ├── ZoneCard.jsx            # Reusable 3-zone cards with microclimate status & stress badges
│   │   ├── ResourceCard.jsx        # Water, Battery, and Energy gauges
│   │   ├── AlertCard.jsx           # System warnings, notices, and advisories
│   │   └── DecisionCard.jsx        # Final Coordinator Decision card with safety checklist
│   ├── agents/
│   │   ├── AgentCard.jsx           # Specialized agent bid cards (Crop, Irrigation, Climate, Energy)
│   │   ├── AgentNegotiation.jsx    # Flagship negotiation visualizer (4 Agents → Coordinator → Safety → Final Action)
│   │   ├── NegotiationTimeline.jsx # 9-Stage step-by-step timeline tracker
│   │   └── AgentStatus.jsx         # Agent health and node matrix
│   ├── intelligence/
│   │   ├── WeatherCard.jsx         # Doppler radar weather & rain suppression alert
│   │   ├── SensorValidation.jsx    # Cross-sensor Bayesian fusion & fault disagreement detector
│   │   ├── ScarcityChart.jsx       # Recharts predictive resource curves
│   │   └── SafetyGate.jsx          # Graceful degradation state machine (NORMAL, CONSERVATIVE, CRITICAL, EMERGENCY)
│   ├── farmer/
│   │   ├── FarmerDashboard.jsx     # Plain-language view with "Why?" explanations & zero AI jargon
│   │   └── FarmerZoneSummary.jsx   # Simplified crop health summary
│   ├── learning/
│   │   └── LearningCard.jsx        # Federated Learning Commons anonymous lesson cards
│   ├── analytics/
│   │   ├── ImpactCard.jsx          # Quantified sustainability & savings metrics
│   │   └── ImpactCharts.jsx        # Recharts monthly savings & agent win distributions
│   └── common/
│       ├── SkeletonLoader.jsx      # Shimmer loading placeholders
│       ├── ErrorState.jsx          # Connection lost & retry display
│       ├── EmptyState.jsx          # Placeholder state
│       └── DemoControlModal.jsx    # Interactive judge presentation player (Play/Pause/Step/Scenarios)
├── pages/
│   ├── OverviewPage.jsx            # Main dashboard (dual-mode)
│   ├── ZonesPage.jsx               # Multi-zone comparison grid
│   ├── ZoneDetailPage.jsx          # Individual zone telemetry & historical trends (`/zones/:id`)
│   ├── ResourcesPage.jsx           # Water, Battery, Energy & Scarcity curves
│   ├── AgentsPage.jsx              # The Flagship Agent Negotiation showcase
│   ├── DecisionsPage.jsx           # Coordinator Decision history & safety audit trail
│   ├── AnalyticsPage.jsx           # Agronomic impact & economic ROI calculations
│   └── LearningPage.jsx            # Greenhouse Learning Commons knowledge base
├── App.jsx                         # App shell with React Router setup
└── index.css                       # Modern Tailwind styles & glassmorphism
```

---

## 📡 6. REST API Schema (Person 5 Backend Contract)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboard` | `GET` | Combined telemetry payload (zones, metrics, resources, agents, decision) |
| `/api/zones` | `GET` | List of all 3 greenhouse zones and micro-climate parameters |
| `/api/zones/{id}` | `GET` | Detailed zone telemetry and 24-hour historical records |
| `/api/resources` | `GET` | Water tank, LiFePO4 battery, and solar energy status & prediction data |
| `/api/agents` | `GET` | All 4 agent statuses, bids, priorities, and proposed actions |
| `/api/decisions` | `GET` | Current coordinator decision and historical audit log |
| `/api/learning` | `GET` | Anonymous shared lessons from Greenhouse Learning Commons |
| `/api/impact` | `GET` | Quantified water, energy, and CO₂ efficiency metrics |
| `/api/weather` | `GET` | Doppler radar forecast & rain suppression triggers |
| `/api/sensors/validate` | `GET` | Multi-modal sensor fusion telemetry |

---

## ⚡ 7. WebSocket Contract (`/ws`)

The WebSocket streams live JSON events matching this schema:

### Telemetry Heartbeat:
```json
{
  "type": "TELEMETRY_PULSE",
  "timestamp": "2026-08-24T14:38:12Z",
  "data": {
    "tempJitter": 0.2,
    "moistureJitter": -0.4,
    "solarYield": 4.28
  }
}
```

### New Coordinator Decision:
```json
{
  "type": "NEW_DECISION",
  "timestamp": "2026-08-24T14:38:12Z",
  "data": {
    "id": "DEC-2026-0824-001",
    "selectedAction": "IRRIGATE ZONE 2",
    "zone": "Zone 02 (Bell Pepper)",
    "duration": "15 minutes",
    "priority": 0.91,
    "confidence": 93,
    "winningAgent": "Irrigation Agent",
    "reason": "Zone 2 has high crop stress (0.82) and low soil moisture (31%). Rain is not expected.",
    "safetyCheck": {
      "status": "APPROVED",
      "waterLimit": { "pass": true },
      "energyBudget": { "pass": true },
      "weatherCheck": { "pass": true },
      "hardSafetyLimits": { "pass": true }
    }
  }
}
```

---

## 🎭 8. Dual-Mode Interface: Farmer View vs Technical View

Click the toggle in the top navbar to instantly switch modes:

* **Farmer View:** Plain-language cards, "Why was this action chosen?", intuitive health rings, and actionable watering advice without AI jargon.
* **Technical View:** Full 4-agent bidding matrix, confidence-weighted sensor fusion, safety veto logs, and predictive scarcity charts.

---

## 🎬 9. Judge Presentation Demo Mode (`▶ RUN DEMO`)

Click the **RUN DEMO** button in the navbar to open the interactive 9-step simulation player.

### Available Scenarios:
1. **Zone 2 Water Stress (Default):** High crop stress + dry soil triggers winning Irrigation Agent bid (0.89), verified safe by safety checks.
2. **Heatwave & Thermal Regulation:** High ambient temp (34.5°C) triggers Climate cooling fans powered by peak solar.
3. **Weather Intelligence: Rain Suppression:** 72% rain probability automatically suppresses scheduled irrigation, saving 28% water.
4. **Safety Veto & Graceful Degradation:** Low battery (18%) triggers CONSERVATIVE mode, vetoing 1.2 kW cooling fans and allowing only low-power pulse drip.

---

## 🔗 10. Connecting to Backend (FastAPI / Person 5)

1. Start Person 5's FastAPI backend on port `8000`.
2. Ensure CORS is enabled on the backend for `http://localhost:5173`.
3. Set `VITE_API_URL=http://localhost:8000` and `VITE_WS_URL=ws://localhost:8000/ws` in `.env`.
4. The dashboard will automatically detect the backend and switch the navbar badge to `🟢 LIVE`.
