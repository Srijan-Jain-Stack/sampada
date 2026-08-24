export const projectMeta = {
  title: "Multi-Agent Smart Greenhouse with Dynamic Resource Scheduling",
  tagline: "AI agents that negotiate for scarce water and power in real time — and explain every decision in the farmer's own language.",
  hackathon: "Smart India Hackathon (SIH 2026)",
  category: "Agriculture, FoodTech & Rural Development",
  hardwareBudget: "₹3,500 – ₹4,800 (3× ESP32 Mesh)",
  corePrinciple: "Local decisions are always safe by hard-coded bounds. Every intelligent layer only adjusts priority within those bounds — it never overrides them."
};

export const agentsData = [
  {
    id: "crop",
    name: "Crop Stress Agent",
    iconName: "Sprout",
    color: "#10b981",
    tagline: "Biological Health & Wilting Early Warning",
    inputs: [
      "Capacitive Soil Moisture v1.2 (Zone Level)",
      "ESP32-CAM Visual Wilting Index (CNN edge)",
      "Sentinel-2 / Landsat NDVI Macro Trend (Optional)"
    ],
    biddingFormula: "Bid = w_1(1 - Moisture%) + w_2(WiltingIndex) + w_3(VPD_stress)",
    actionTarget: "Submits zone-specific biological water urgency scores to Coordinator",
    description: "Continuously tracks physical root-zone moisture and combines it with on-device computer vision to detect plant wilting before visible leaf necrosis occurs."
  },
  {
    id: "irrigation",
    name: "Irrigation Agent",
    iconName: "Droplets",
    color: "#06b6d4",
    tagline: "Precision Drip Scheduling & Cooldown Enforcer",
    inputs: [
      "Water Tank Level Ultrasound Sensor (JSN-SR04T)",
      "Time-Since-Last-Irrigation Timer (Cooldown)",
      "Soil Field Capacity / Wilting Point Limits"
    ],
    biddingFormula: "Bid = CropUrgency * (1 / TankScarcityFactor) * CooldownPenalty",
    actionTarget: "Zone Drip Solenoid Valves & 12V DC Booster Pump (PWM / Pulse)",
    description: "Translates biological stress into exact milliliter pulse irrigations, strictly enforcing hydraulic resting cycles to prevent root rot and anaerobic soil conditions."
  },
  {
    id: "climate",
    name: "Climate Agent",
    iconName: "Wind",
    color: "#2fb6a6",
    tagline: "VPD, Microclimate & Heat Mitigation",
    inputs: [
      "SHT31 / DHT22 Air Temperature (°C)",
      "Relative Humidity (%RH)",
      "Vapor Pressure Deficit (VPD in kPa)"
    ],
    biddingFormula: "Bid = max(0, (Temp - Temp_target)/10) + (VPD_deficit * 0.4)",
    actionTarget: "Exhaust Fans, Polyhouse Roll-up Curtains & High-Pressure Misting",
    description: "Maintains optimal photosynthesis VPD windows (0.8 - 1.2 kPa). When heat stress peaks, it requests immediate fan and misting actuation before leaf stomata close."
  },
  {
    id: "energy",
    name: "Energy Agent",
    iconName: "BatteryCharging",
    color: "#f59e0b",
    tagline: "Battery State-of-Charge & Solar Budgeting",
    inputs: [
      "INA219 I2C Solar Panel Voltage & Current",
      "Lead-Acid / LiFePO4 Battery State of Charge (%)",
      "Solar Irradiance Forecast & Peak Sun Hours"
    ],
    biddingFormula: "Budget = Battery_SoC% + (Solar_W / 50) - Reserved_Evening_KWh",
    actionTarget: "Rations power allowances for pump, fans, and misting solenoids",
    description: "Runs predictive linear and exponential trend fitting on energy consumption. Prevents battery exhaustion during critical 2 PM afternoon heat peaks."
  },
  {
    id: "coordinator",
    name: "Coordinator Agent (LinUCB + Guardrail)",
    iconName: "Cpu",
    color: "#f5821f",
    tagline: "Contextual Bandit Auctioneer & Safety Gate",
    inputs: [
      "All 4 Agent Bids & Rationale Strings",
      "Open-Meteo 15-min Live Weather Forecast",
      "MQTT Commons Prior Knowledge Lessons"
    ],
    biddingFormula: "Score(a) = θ_a^T x_t + α * sqrt(x_t^T A_a^-1 x_t) [LinUCB]",
    actionTarget: "Final Actuator Dispatch over MQTT + Plain-Language Explanation",
    description: "Acts as the central market auctioneer. Solves multi-resource contention using contextual bandits, passes decisions through an immutable safety turnstile, and writes audit logs."
  }
];

export const stateMachineData = [
  {
    state: "Normal",
    color: "emerald",
    badge: "Full Autonomous Optimization",
    trigger: "All water tank (>40%), battery (>50%), and climate variables within optimal bounds.",
    behavior: "All 3 zones receive precision micro-irrigations; climate fans maintain strict VPD targets.",
    safetyStatus: "Optimal Efficiency"
  },
  {
    state: "Conservative",
    color: "amber",
    badge: "Predicted Scarcity Trend",
    trigger: "Water tank falling or battery SoC < 40% with high forecast demand.",
    behavior: "Non-stressed zones delayed by ~30 mins; fan speeds reduced by 25%; solar-synchronized pumping.",
    safetyStatus: "Resource Rationing"
  },
  {
    state: "Critical",
    color: "orange",
    badge: "Resource Below Threshold",
    trigger: "Water tank < 20% OR Battery SoC < 25% OR extreme heat (>42°C).",
    behavior: "Low-urgency zones halted completely. Only high-stress zones receive emergency pulses.",
    safetyStatus: "Yield Preservation"
  },
  {
    state: "Emergency",
    color: "danger",
    badge: "Hard Safety Floor Reached",
    trigger: "Water tank < 8% OR Battery SoC < 15% OR sensor discrepancy fault.",
    behavior: "Strict survival mode. Only life-critical zone watered; acoustic alarm triggered; safety guardrail active.",
    safetyStatus: "Crop Survival Priority"
  }
];

export const comparisonData = [
  {
    feature: "Multi-Agent Negotiation",
    ourSystem: "✓ Full (Water + Energy + Climate dynamic bidding)",
    priva: "✗ Centralized single PID / rule loops",
    autogrow: "Partial (Multi-zone, no arbitration)",
    farmonaut: "✗ No actuation (satellite advisory)",
    iGrow: "✗ Single-greenhouse single-loop RL",
    ajagekar: "✓ Energy demand response only"
  },
  {
    feature: "Cross-Farm Learning",
    ourSystem: "✓ Privacy-Preserving MQTT Commons",
    priva: "✗ Closed silo",
    autogrow: "✗ Closed silo",
    farmonaut: "✗ Static global models",
    iGrow: "✗ Single simulation",
    ajagekar: "✗ Fleet coordination without learning transfer"
  },
  {
    feature: "Explainability to Farmer",
    ourSystem: "✓ Plain-Language, Bilingual (Hindi/Marathi/Eng/Tel)",
    priva: "✗ Technical engineer graphs only",
    autogrow: "✗ Complex sensor graphs",
    farmonaut: "Partial (Generic SMS advisory)",
    iGrow: "✗ Black-box neural network",
    ajagekar: "✗ Black-box Actor-Critic DRL"
  },
  {
    feature: "Total Hardware Cost",
    ourSystem: "₹3,500 – ₹5,000 (Sub-$60, 3× ESP32)",
    priva: "High (₹5,00,000+ / $6,000+)",
    autogrow: "Medium-High (₹1,50,000+)",
    farmonaut: "Low (SaaS subscription, no hardware)",
    iGrow: "Research-only (Cloud GPUs required)",
    ajagekar: "Research-only (High-performance cluster)"
  },
  {
    feature: "Weather & Satellite Aware",
    ourSystem: "✓ Live Open-Meteo rain suppression + Sentinel-2",
    priva: "Partial (On-site weather station required)",
    autogrow: "Partial (External weather add-on)",
    farmonaut: "✓ Satellite-first (5-day revisit latency)",
    iGrow: "✗ Simulated fixed weather",
    ajagekar: "✗ Grid pricing only"
  },
  {
    feature: "Hardware Independence",
    ourSystem: "✓ Open MQTT schema (any sensor/actuator)",
    priva: "✗ Proprietary locked hardware",
    autogrow: "✗ Proprietary controllers",
    farmonaut: "N/A (App only)",
    iGrow: "N/A (Simulation)",
    ajagekar: "N/A (Simulation)"
  }
];

export const bomData = [
  { item: "ESP32 DevKit V1 (Main Coordinator & Bridge)", qty: 1, unitCost: 380, total: 380, role: "MQTT Broker connection, LinUCB edge scheduler, WiFi/BLE" },
  { item: "ESP32 DevKit V1 (Zone 1 & 2 Node)", qty: 1, unitCost: 380, total: 380, role: "Zone sensor ADC reads, Solenoid valve PWM firing" },
  { item: "ESP32-CAM AI-Thinker (Crop Wilting Vision)", qty: 1, unitCost: 590, total: 590, role: "Micro-CNN leaf angle and canopy turgidity analysis" },
  { item: "Capacitive Soil Moisture Sensors v1.2 (Corrosion-resistant)", qty: 3, unitCost: 95, total: 285, role: "Analog volumetric soil water content (3 Zones)" },
  { item: "SHT31-D Industrial Temp & Humidity Sensor (I2C)", qty: 2, unitCost: 260, total: 520, role: "High-accuracy microclimate & VPD calculations" },
  { item: "INA219 I2C High-Side DC Current/Voltage Sensor", qty: 1, unitCost: 180, total: 180, role: "Solar panel & 12V battery power telemetry" },
  { item: "4-Channel 5V Optocoupler Relay Board", qty: 1, unitCost: 190, total: 190, role: "Pump, 3× Solenoid valves & fan switching" },
  { item: "JSN-SR04T Waterproof Ultrasonic Tank Sensor", qty: 1, unitCost: 360, total: 360, role: "Water reservoir depth & depletion rate tracking" },
  { item: "12V 5W Poly Solar Panel + TP4056 / Buck Converter", qty: 1, unitCost: 750, total: 750, role: "Edge node off-grid autonomy and power testing" },
  { item: "Enclosure, Terminals, Connectors & PCB Proto", qty: 1, unitCost: 350, total: 350, role: "IP65 weatherproof greenhouse field deployment" }
];

export const mqttTopicSchema = [
  {
    topic: "greenhouse/zone/{1,2,3}/telemetry",
    direction: "ESP32 → Coordinator",
    payload: `{\n  "zone_id": 1,\n  "soil_moisture_pct": 24.5,\n  "temp_c": 31.8,\n  "humidity_pct": 62.0,\n  "vpd_kpa": 1.42,\n  "wilting_index": 0.68,\n  "timestamp": 1724510400\n}`
  },
  {
    topic: "greenhouse/energy/telemetry",
    direction: "Power Node → Coordinator",
    payload: `{\n  "solar_voltage_v": 13.8,\n  "solar_current_ma": 420.0,\n  "battery_soc_pct": 64.5,\n  "battery_temp_c": 28.1\n}`
  },
  {
    topic: "greenhouse/coordinator/dispatch",
    direction: "Coordinator → Relays",
    payload: `{\n  "decision_id": "DEC_2026_0824_042",\n  "actions": [\n    {"target": "solenoid_zone_1", "state": "PULSE", "duration_sec": 45},\n    {"target": "misting_line", "state": "ON", "duration_sec": 20},\n    {"target": "exhaust_fan", "state": "PWM", "level_pct": 70}\n  ],\n  "guardrail_status": "PASSED",\n  "state_mode": "NORMAL"\n}`
  },
  {
    topic: "greenhouse/commons/lessons",
    direction: "Coordinator ↔ Global MQTT Broker",
    payload: `{\n  "context_hash": "CTX_HEAT_38C_SOIL22_BATT60",\n  "action_vector": [0.45, 0.20, 0.70],\n  "outcome_reward": 0.88,\n  "water_saved_ml": 850,\n  "validated_by": 14\n}`
  }
];

export const judgeQnAData = [
  {
    question: "What if the AI makes a wrong call and fails to water drying crops?",
    answer: "The AI cannot kill crops because of our Hard Safety Guardrail Check (the physical veto turnstile). The LinUCB contextual bandit only operates within strictly hard-coded safety envelopes (e.g., if soil moisture drops below 18%, irrigation triggers regardless of AI preference). The intelligent layer only optimizes priority, timing, and multi-resource rationing within those safe bounds.",
    badge: "Safety & Determinism"
  },
  {
    question: "Why use a Contextual Bandit (LinUCB) instead of Deep Reinforcement Learning like iGrow?",
    answer: "Deep RL (like iGrow's bi-level neural network simulator) requires weeks of training on heavy GPU servers, massive datasets, and suffers from simulation-to-reality transfer gap. LinUCB with logistic weights trains in minutes on a laptop or Raspberry Pi from logged CSVs, guarantees fast convergence, provides mathematically bounded regret, and is transparent for auditability in a hackathon deployment.",
    badge: "Algorithmic Pragmatism"
  },
  {
    question: "How is this different from existing greenhouse controllers like Priva or Autogrow?",
    answer: "Commercial systems (Priva, Ridder) cost ₹5 Lakhs+, use centralized isolated PID loops, and do NOT negotiate between competing resources (water vs solar energy vs climate fans) under scarcity. Furthermore, they are closed proprietary silos that don't offer plain-language farmer explanations or cross-farm federated learning.",
    badge: "Market Differentiation"
  },
  {
    question: "Does this scale beyond one greenhouse to multiple farms?",
    answer: "Yes, via the Greenhouse Learning Commons over MQTT. Greenhouses publish and subscribe to anonymized 'lesson cards' ({context, action, outcome}). A pulled lesson nudges the bandit's initial Bayesian prior weights without transmitting raw sensor data, farm location, crop yield, or identity. Local on-device experience always dominates over time.",
    badge: "Scalability & Privacy"
  },
  {
    question: "Is this genuinely buildable on sub-₹5,000 hardware in real rural conditions?",
    answer: "Absolutely. Our entire hardware stack uses 3 standard ESP32 microcontrollers (₹380 each), standard capacitive soil sensors (₹95), SHT31 (₹260), an ESP32-CAM (₹590), and an INA219 power monitor (₹180), totaling ₹3,955. Sensor readings are cached locally and synced over lightweight MQTT, allowing full operation even during intermittent rural cellular connectivity.",
    badge: "Hardware Feasibility"
  },
  {
    question: "How do you avoid relying on slow satellite NDVI data?",
    answer: "We treat Sentinel-2 / Landsat NDVI and NASA SMAP strictly as slow 'macro' signals (2–5 day revisit latency) used for baseline calibration, never as real-time triggers. Real-time sub-second control is driven entirely by ground soil probes and the ESP32-CAM visual wilting classifier.",
    badge: "Sensor Fusion Integrity"
  }
];

export const referencesData = [
  {
    id: "igrow2022",
    title: "iGrow: A Smart Agriculture Solution to Autonomous Greenhouse Control",
    authors: "Cao, X. et al. (2022)",
    venue: "Proceedings of the AAAI Conference on Artificial Intelligence, 36(11), 11837–11845",
    highlight: "+10.15% Yield & +92.70% Net Profit in real tomato pilot",
    link: "https://ojs.aaai.org/index.php/AAAI/article/view/21440"
  },
  {
    id: "ajagekar2024",
    title: "Energy management for demand response in networked greenhouses with multi-agent deep reinforcement learning",
    authors: "Ajagekar, A., Decardi-Nelson, B., & You, F. (2024)",
    venue: "Applied Energy, Vol. 355",
    highlight: "Validated multi-agent coordination across 5-greenhouse microgrid",
    link: "https://doi.org/10.1016/j.apenergy.2023.122283"
  },
  {
    id: "irrmap2025",
    title: "IrrMap: A Large-Scale Comprehensive Dataset for Irrigation Method Mapping",
    authors: "Mandal, N. C. et al. (2025)",
    venue: "Proc. ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    highlight: "1.1M-patch satellite dataset across 1.68M farms",
    link: "https://dl.acm.org"
  },
  {
    id: "openmeteo",
    title: "Open-Meteo Global Weather API",
    authors: "Open-Meteo High-Resolution Numerical Weather Prediction Models",
    venue: "open-meteo.com/en/docs (Seamless 15-min rainfall suppression)",
    highlight: "Free, zero-key high reliability weather forecast API",
    link: "https://open-meteo.com"
  }
];
