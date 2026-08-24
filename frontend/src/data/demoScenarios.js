/**
 * SAMPADA - Demo Scenarios & Interactive Step-by-Step Simulator Engine
 * Tailored for Smart India Hackathon (SIH 2026) Evaluation
 */

export const DEMO_SCENARIOS = [
  {
    id: 'zone-2-water-stress',
    title: '1. Standard Scenario: Zone 2 Water Stress (Default)',
    subtitle: 'High canopy stress + dry root-zone triggers high-priority irrigation bid',
    badge: 'Standard Flow',
    description: 'Zone 2 (Bell Pepper) experiences critical moisture depletion (31%). Irrigation Agent submits high bid (0.89), verified safe by Energy/Safety gates.',
    zoneState: {
      zoneId: 'zone-2',
      crop: 'Bell Pepper (Capsicum)',
      soilMoisture: 31,
      cropStress: 'HIGH',
      cropStressScore: 0.82,
      temp: 28.4,
      waterDemand: 22
    },
    resources: {
      waterPercent: 74,
      batterySOC: 81,
      solarKw: 4.2
    },
    weather: {
      temp: 28,
      rainProb: 18,
      suppressed: false
    },
    agents: [
      { id: 'crop-agent', name: 'Crop Agent', bid: 0.74, priority: 0.82, action: 'Irrigate & Relieve Moisture Stress', status: 'ALIGNED', confidence: 91 },
      { id: 'irrigation-agent', name: 'Irrigation Agent', bid: 0.89, priority: 0.91, action: 'Irrigate 15 min (Pulse Drip)', status: 'WINNING', confidence: 88 },
      { id: 'climate-agent', name: 'Climate Agent', bid: 0.31, priority: 0.35, action: 'Exhaust Fan Stage 1', status: 'DEFERRED', confidence: 94 },
      { id: 'energy-agent', name: 'Energy Agent', bid: 0.42, priority: 0.42, action: 'Allow Normal Operation', status: 'SUPPORTED', confidence: 86 }
    ],
    decision: {
      action: 'IRRIGATE ZONE 2',
      target: 'Zone 02 (Bell Pepper)',
      duration: '15 min',
      priority: 0.91,
      confidence: 93,
      reason: 'Zone 2 has high crop stress (0.82) and low soil moisture (31%). Water demand is high (22L) while energy availability remains plentiful (81% Battery, 4.2 kW Solar).',
      farmerReason: 'Zone 2 has low soil moisture and the bell peppers need water. Solar power is strong and rain is not forecast.',
      safetyGate: 'APPROVED — Water reserve & battery limits fully satisfied.'
    },
    steps: [
      { step: 1, name: 'Sensor Ingestion', detail: 'Soil capacitance probe drops to 31% in Zone 2; thermal camera detects +2.8°C canopy hot spot.' },
      { step: 2, name: 'Crop Agent Evaluation', detail: 'Crop Agent computes biological stress score 0.82 and issues stress alert.' },
      { step: 3, name: 'Irrigation Agent Bid', detail: 'Irrigation Agent formulates 15-minute pulse drip demand (22 Liters) with bid weight 0.89.' },
      { step: 4, name: 'Climate Agent Bid', detail: 'Climate Agent evaluates VPD (1.42 kPa) and submits low-priority fan bid (0.31).' },
      { step: 5, name: 'Energy Agent Budgeting', detail: 'Energy Agent checks PV yield (4.2 kW) and clears green-tier hydraulic actuator power (bid 0.42).' },
      { step: 6, name: 'Coordinator Arbitration', detail: 'Coordinator evaluates utility matrix: Irrigation Agent (0.89) wins highest marginal crop utility.' },
      { step: 7, name: 'Safety Gate Verification', detail: 'Safety Guard runs 4-point check: Tank level (74%), Battery (81%), Rain (18%), Pressure (1.8 bar) — ALL PASS.' },
      { step: 8, name: 'Final Actuator Dispatch', detail: 'Solenoid Valve #2 pulses open for 15 minutes. Solenoids in Zone 1 & 3 remain isolated.' },
      { step: 9, name: 'Audit & Learning Commons', detail: 'Decision logged with telemetry hash; anonymous learning pattern emitted to decentralized pool.' }
    ]
  },
  {
    id: 'heatwave-energy-scarcity',
    title: '2. Heatwave & Thermal Regulation Scenario',
    subtitle: 'VPD surge + high ambient heat triggers Climate cooling without draining battery',
    badge: 'Climate Focus',
    description: 'Ambient temperatures spike to 34.5°C in Zone 1. Climate Agent wins arbitration with variable-frequency ventilation cooling.',
    zoneState: {
      zoneId: 'zone-1',
      crop: 'Heirloom Tomato',
      soilMoisture: 52,
      cropStress: 'MODERATE',
      cropStressScore: 0.58,
      temp: 34.5,
      waterDemand: 10
    },
    resources: {
      waterPercent: 74,
      batterySOC: 68,
      solarKw: 5.1
    },
    weather: {
      temp: 35,
      rainProb: 5,
      suppressed: false
    },
    agents: [
      { id: 'crop-agent', name: 'Crop Agent', bid: 0.62, priority: 0.65, action: 'Mist Cooling Buffer', status: 'SUPPORTED', confidence: 92 },
      { id: 'irrigation-agent', name: 'Irrigation Agent', bid: 0.45, priority: 0.50, action: 'Hold Root Hydration', status: 'DEFERRED', confidence: 89 },
      { id: 'climate-agent', name: 'Climate Agent', bid: 0.94, priority: 0.95, action: 'Exhaust Fan Stage 2 & Wet Wall', status: 'WINNING', confidence: 96 },
      { id: 'energy-agent', name: 'Energy Agent', bid: 0.70, priority: 0.72, action: 'Direct Solar Peak Utilization', status: 'ALIGNED', confidence: 91 }
    ],
    decision: {
      action: 'VENTILATE & COOL ZONE 1',
      target: 'Zone 01 (Heirloom Tomato)',
      duration: '20 min',
      priority: 0.94,
      confidence: 95,
      reason: 'Zone 1 canopy temperature reached 34.5°C with severe VPD escalation (2.2 kPa). Direct solar generation (5.1 kW) powers stage-2 cooling fans without battery drawdown.',
      farmerReason: 'Zone 1 is too hot (34.5°C). Exhaust fans and cooling screens are active using free peak solar electricity.',
      safetyGate: 'APPROVED — Inverter capacity and thermal safety envelopes confirmed.'
    },
    steps: [
      { step: 1, name: 'Thermal Sensor Surge', detail: 'Zone 1 RTD probe registers 34.5°C; solar irradiance peaks at 980 W/m².' },
      { step: 2, name: 'Crop Agent Phenology Check', detail: 'Tomato flower abortion danger threshold (33°C) exceeded; bids for rapid cooling.' },
      { step: 3, name: 'Irrigation Agent Deferral', detail: 'Soil moisture is stable at 52%; Irrigation Agent yields priority to thermal regulation.' },
      { step: 4, name: 'Climate Agent Priority Bid', detail: 'Climate Agent bids 0.94 requesting 20-minute Stage-2 ventilation and wet-pad activation.' },
      { step: 5, name: 'Energy Agent Solar Alignment', detail: 'Excess PV production (5.1 kW) directly channeled to 3-phase cooling motors.' },
      { step: 6, name: 'Coordinator Arbitration', detail: 'Coordinator awards priority to Climate Agent to prevent irreversible blossom drop.' },
      { step: 7, name: 'Safety Gate Verification', detail: 'Airflow velocity checked (< 1.5 m/s plant mechanical tolerance); safety approved.' },
      { step: 8, name: 'Actuator Modulation', detail: 'Ridge louvers open to 100%, high-efficiency EC fan ramps to 2,400 RPM.' },
      { step: 9, name: 'Micro-climate Settling', detail: 'Canopy temperature decreases by 3.2°C in 8 minutes; logged to Analytics.' }
    ]
  },
  {
    id: 'rain-suppression-scenario',
    title: '3. Weather Intelligence: Rain Suppression',
    subtitle: 'Approaching rainstorm automatically suppresses irrigation, saving 28% water',
    badge: 'Weather AI',
    description: 'Weather intelligence detects 72% rain probability with 4.1mm expected precipitation. Scheduled irrigation is safely suppressed.',
    zoneState: {
      zoneId: 'zone-2',
      crop: 'Bell Pepper (Capsicum)',
      soilMoisture: 42,
      cropStress: 'MODERATE',
      cropStressScore: 0.44,
      temp: 23.2,
      waterDemand: 18
    },
    resources: {
      waterPercent: 74,
      batterySOC: 75,
      solarKw: 1.4
    },
    weather: {
      temp: 23.2,
      rainProb: 72,
      expectedRainfallMm: 4.1,
      suppressed: true,
      suppressionReason: 'Incoming rainstorm detected (72% prob, 4.1mm). Natural rainwater harvesting active.'
    },
    agents: [
      { id: 'crop-agent', name: 'Crop Agent', bid: 0.40, priority: 0.42, action: 'Monitor Soil Infiltration', status: 'ALIGNED', confidence: 94 },
      { id: 'irrigation-agent', name: 'Irrigation Agent', bid: 0.72, priority: 0.75, action: 'Irrigate 12 min', status: 'SUPPRESSED', confidence: 85 },
      { id: 'climate-agent', name: 'Climate Agent', bid: 0.35, priority: 0.38, action: 'Close Ridge Vents for Rain', status: 'WINNING', confidence: 97 },
      { id: 'energy-agent', name: 'Energy Agent', bid: 0.50, priority: 0.50, action: 'Conserve Battery for Cloud Cover', status: 'SUPPORTED', confidence: 88 }
    ],
    decision: {
      action: 'CLOSE RIDGE VENTS & SUPPRESS IRRIGATION',
      target: 'All Zones (Rain Harvesting)',
      duration: 'Ongoing',
      priority: 0.88,
      confidence: 97,
      reason: '72% precipitation probability with 4.1mm expected rainfall. Irrigation Agent bid overridden by Weather Intelligence rule (Lesson #103) to prevent root waterlogging.',
      farmerReason: 'Irrigation paused. Rain is coming (72% chance). Greenhouse roof vents closed to keep plants dry, rain tanks collecting water.',
      safetyGate: 'OVERRIDE APPLIED — Water conservation rule active.'
    },
    steps: [
      { step: 1, name: 'Satellite Weather Feed', detail: 'Doppler radar feed registers convective storm cell within 8 km; barometric pressure dropping.' },
      { step: 2, name: 'Irrigation Agent Scheduled Bid', detail: 'Irrigation Agent prepares routine 18L irrigation bid (0.72).' },
      { step: 3, name: 'Weather Intelligence Intercept', detail: 'Weather AI compares forecast against Learning Lesson #103 (>70% rain probability).' },
      { step: 4, name: 'Irrigation Suppression Trigger', detail: 'Hydraulic command suppressed; rain harvest valves pre-armed.' },
      { step: 5, name: 'Climate Agent Storm Protection', detail: 'Climate Agent requests automated closure of ridge vents to prevent internal flooding.' },
      { step: 6, name: 'Coordinator Evaluation', detail: 'Coordinator confirms weather suppression override; redirects focus to storm prep.' },
      { step: 7, name: 'Safety Guard Gate Check', detail: 'Vents motorized seals checked; anti-pinch safety sensors active.' },
      { step: 8, name: 'Motorized Roof Enclosure', detail: 'Linear actuators close ridge louvers to 0%; rain gutters diverted to main 2,000L tank.' },
      { step: 9, name: 'Water Conservation Metric Log', detail: '18 Liters preserved; 45 Liters rain harvested; logged in Impact Dashboard.' }
    ]
  },
  {
    id: 'critical-battery-veto',
    title: '4. Safety Veto & Graceful Degradation',
    subtitle: 'Low battery triggers CONSERVATIVE mode, throttling non-essential loads',
    badge: 'Safety Veto',
    description: 'Battery state-of-charge drops to 18% during extended cloudy period. Safety Gate vetoes high-power fans, allowing only low-power pulse drip.',
    zoneState: {
      zoneId: 'zone-3',
      crop: 'English Cucumber',
      soilMoisture: 48,
      cropStress: 'HIGH',
      cropStressScore: 0.76,
      temp: 29.8,
      waterDemand: 14
    },
    resources: {
      waterPercent: 62,
      batterySOC: 18,
      solarKw: 0.3
    },
    weather: {
      temp: 27,
      rainProb: 30,
      suppressed: false
    },
    agents: [
      { id: 'crop-agent', name: 'Crop Agent', bid: 0.78, priority: 0.80, action: 'Critical Root Rehydration', status: 'APPROVED', confidence: 93 },
      { id: 'irrigation-agent', name: 'Irrigation Agent', bid: 0.85, priority: 0.88, action: 'Pulse Drip 8 min (Low Power)', status: 'WINNING', confidence: 91 },
      { id: 'climate-agent', name: 'Climate Agent', bid: 0.82, priority: 0.84, action: 'Stage 3 Exhaust Fan (1.2 kW)', status: 'VETOED_BY_SAFETY', confidence: 95 },
      { id: 'energy-agent', name: 'Energy Agent', bid: 0.98, priority: 0.99, action: 'Emergency Load Shedding', status: 'CRITICAL', confidence: 99 }
    ],
    decision: {
      action: 'LOW-POWER PULSE DRIP (SAFETY RESTRICTED)',
      target: 'Zone 03 (Cucumber)',
      duration: '8 min',
      priority: 0.85,
      confidence: 94,
      reason: 'Battery SOC is 18% (Critical threshold). System transitioned to CONSERVATIVE state. Safety Gate vetoed 1.2 kW cooling fan and approved low-power 45W gravity-assisted drip.',
      farmerReason: 'Battery is low (18%). Heavy cooling fans stopped to save power. Low-power water drip running to keep plants safe.',
      safetyGate: 'RESTRICTED — Non-essential climate loads vetoed by Energy Agent.'
    },
    steps: [
      { step: 1, name: 'Battery Under-Voltage Alert', detail: 'Battery SOC drops to 18% (43.8V); Solar array obscured by dense cloud cover (0.3 kW).' },
      { step: 2, name: 'System State Transition', detail: 'System state machine shifts from NORMAL → CONSERVATIVE degradation mode.' },
      { step: 3, name: 'Climate Agent High-Power Bid', detail: 'Climate Agent requests 1.2 kW exhaust fans (bid 0.82) to mitigate 29.8°C heat.' },
      { step: 4, name: 'Energy Agent Emergency Veto', detail: 'Energy Agent exercises priority override (0.98) flagging battery cut-off hazard.' },
      { step: 5, name: 'Irrigation Agent Low-Power Option', detail: 'Irrigation Agent presents 45W gravity pulse drip alternative (bid 0.85).' },
      { step: 6, name: 'Coordinator Arbitration', detail: 'Coordinator rejects Climate bid due to power deficit; accepts low-power irrigation.' },
      { step: 7, name: 'Safety Gate Hard Interlock', detail: 'Safety Gate confirms fan relay locked open; approves 45W pump relay only.' },
      { step: 8, name: 'Protected Actuation', detail: 'Protected crop hydration active for 8 minutes; vital biological baseline maintained.' },
      { step: 9, name: 'Autonomous Recovery Monitor', detail: 'Battery discharge halted within safe buffer; alert dispatched to farmer.' }
    ]
  }
];
