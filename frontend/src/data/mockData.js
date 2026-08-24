/**
 * SAMPADA - Smart Greenhouse Multi-Agent System
 * Comprehensive Mock Dataset for Offline/Development Mode
 */

export const initialSystemStatus = {
  operationalState: 'NORMAL', // 'NORMAL' | 'CONSERVATIVE' | 'CRITICAL' | 'EMERGENCY'
  lastSync: new Date().toISOString(),
  wsConnected: true,
  healthScore: 88,
  activeAlertsCount: 1,
  activeZoneCount: 3,
  agentCount: 5,
  safetyGateStatus: 'ALL_PASS', // 'ALL_PASS' | 'RESTRICTED' | 'EMERGENCY_OVERRIDE'
};

export const initialOverviewMetrics = {
  cropHealth: {
    value: 82,
    unit: '%',
    status: 'Healthy',
    trend: '+3% vs yesterday',
    subtext: 'Optimal vegetative stage in Zone 1 & 3',
    color: 'emerald'
  },
  waterAvailability: {
    value: 74,
    unit: '%',
    status: 'Available',
    liters: 1480,
    maxLiters: 2000,
    subtext: '48h reserve at current run-rate',
    color: 'blue'
  },
  batteryLevel: {
    value: 81,
    unit: '%',
    status: 'Normal',
    voltage: '48.2 V',
    stateOfCharge: 81,
    subtext: 'Autonomous runtime: ~14.5 hours',
    color: 'amber'
  },
  solarGeneration: {
    value: 4.2,
    unit: 'kW',
    status: 'Generating',
    peakToday: 5.6,
    subtext: 'Clear sky irradiance (890 W/m²)',
    color: 'yellow'
  },
  safetyStatus: {
    value: 'ALL SAFE',
    unit: '',
    status: 'Operational',
    failedChecks: 0,
    totalChecks: 4,
    subtext: 'Hard limits & budgets verified',
    color: 'emerald'
  }
};

export const initialZones = [
  {
    id: 'zone-1',
    numericId: 1,
    name: 'Zone 01 — Heirloom Tomato',
    crop: 'Heirloom Tomato',
    variety: 'San Marzano',
    stage: 'Vegetative Growth (Day 34)',
    temperature: 24.8,
    tempTarget: 24.0,
    humidity: 62,
    humidityTarget: 65,
    soilMoisture: 58,
    soilMoistureTarget: 60,
    cropStress: 'LOW',
    cropStressScore: 0.18,
    waterDemand: 8, // Liters
    currentAction: 'Monitoring Micro-climate',
    currentActionType: 'MONITOR',
    agentStatus: 'Crop Agent Active',
    lastAction: 'Drip Irrigation 10m (2h ago)',
    lastActionTime: '2 hours ago',
    confidence: 96,
    health: 91,
    lightIntensity: 620, // PAR umol/m2/s
    co2Level: 650, // ppm
    ndvIndex: 0.84,
    thermalAnomaly: false,
    history: [
      { time: '10:00', temp: 23.1, moisture: 64, humidity: 68 },
      { time: '11:00', temp: 23.9, moisture: 62, humidity: 65 },
      { time: '12:00', temp: 24.5, moisture: 60, humidity: 63 },
      { time: '13:00', temp: 25.2, moisture: 59, humidity: 61 },
      { time: '14:00', temp: 24.8, moisture: 58, humidity: 62 }
    ]
  },
  {
    id: 'zone-2',
    numericId: 2,
    name: 'Zone 02 — Bell Pepper (Capsicum)',
    crop: 'Bell Pepper (Capsicum)',
    variety: 'Yellow California Wonder',
    stage: 'Fruit Setting (Day 48)',
    temperature: 28.4,
    tempTarget: 25.0,
    humidity: 68,
    humidityTarget: 60,
    soilMoisture: 31,
    soilMoistureTarget: 65,
    cropStress: 'HIGH',
    cropStressScore: 0.82,
    waterDemand: 22, // Liters
    currentAction: '💧 Irrigation In Progress',
    currentActionType: 'IRRIGATE',
    agentStatus: 'Irrigation Agent Bidding (0.89)',
    lastAction: 'Ventilation Fan 15m (45m ago)',
    lastActionTime: '45 mins ago',
    confidence: 93,
    health: 64,
    lightIntensity: 780,
    co2Level: 580,
    ndvIndex: 0.61,
    thermalAnomaly: true,
    history: [
      { time: '10:00', temp: 26.0, moisture: 42, humidity: 70 },
      { time: '11:00', temp: 27.1, moisture: 38, humidity: 69 },
      { time: '12:00', temp: 27.9, moisture: 35, humidity: 68 },
      { time: '13:00', temp: 28.8, moisture: 32, humidity: 67 },
      { time: '14:00', temp: 28.4, moisture: 31, humidity: 68 }
    ]
  },
  {
    id: 'zone-3',
    numericId: 3,
    name: 'Zone 03 — English Cucumber',
    crop: 'English Cucumber',
    variety: 'Beit Alpha',
    stage: 'Early Flowering (Day 29)',
    temperature: 26.2,
    tempTarget: 26.0,
    humidity: 71,
    humidityTarget: 70,
    soilMoisture: 54,
    soilMoistureTarget: 55,
    cropStress: 'MODERATE',
    cropStressScore: 0.38,
    waterDemand: 12, // Liters
    currentAction: 'Shade Screen 40% Deployed',
    currentActionType: 'SHADE',
    agentStatus: 'Climate Agent Monitoring',
    lastAction: 'Mist Spray 3m (1h ago)',
    lastActionTime: '1 hour ago',
    confidence: 94,
    health: 86,
    lightIntensity: 540,
    co2Level: 620,
    ndvIndex: 0.78,
    thermalAnomaly: false,
    history: [
      { time: '10:00', temp: 24.5, moisture: 58, humidity: 74 },
      { time: '11:00', temp: 25.3, moisture: 56, humidity: 73 },
      { time: '12:00', temp: 26.0, moisture: 55, humidity: 72 },
      { time: '13:00', temp: 26.5, moisture: 54, humidity: 71 },
      { time: '14:00', temp: 26.2, moisture: 54, humidity: 71 }
    ]
  }
];

export const initialAgents = [
  {
    id: 'crop-agent',
    name: 'Crop Agent',
    icon: '🌱',
    color: 'emerald',
    role: 'Biological Stress & Phenology Specialist',
    status: 'ACTIVE',
    targetZone: 'Zone 02',
    metricLabel: 'Crop Stress',
    metricValue: '0.82',
    priority: 0.82,
    bid: 0.74,
    action: 'Irrigate & Relieve Moisture Stress',
    confidence: 91,
    reasoning: 'Canopy temperature anomaly + NDVI decline in Zone 2 indicates acute transpiration deficit. Recommends immediate root-zone rehydration.',
    telemetry: {
      soilMoisture: '31%',
      canopyTempDelta: '+2.8°C',
      growthStage: 'Fruit Setting'
    }
  },
  {
    id: 'irrigation-agent',
    name: 'Irrigation Agent',
    icon: '💧',
    color: 'blue',
    role: 'Hydraulic Efficiency & Soil Dynamics',
    status: 'ACTIVE',
    targetZone: 'Zone 02',
    metricLabel: 'Water Need',
    metricValue: 'HIGH (22L)',
    priority: 0.91,
    bid: 0.89,
    action: 'Irrigate 15 min (Pulse Drip)',
    confidence: 88,
    reasoning: 'Soil water tension exceeded 65 kPa threshold. Reservoir has 74% capacity. Pulse delivery minimizes run-off and maximizes uptake.',
    telemetry: {
      flowRate: '1.47 L/min',
      pulseInterval: '3 min on / 1 min rest',
      totalDemand: '22 Liters'
    }
  },
  {
    id: 'climate-agent',
    name: 'Climate Agent',
    icon: '🌡',
    color: 'orange',
    role: 'Vapor Pressure Deficit & Thermal Regulation',
    status: 'ACTIVE',
    targetZone: 'Zone 02',
    metricLabel: 'Heat Stress',
    metricValue: '0.35',
    priority: 0.35,
    bid: 0.31,
    action: 'Exhaust Fan Stage 1 (Low Power)',
    confidence: 94,
    reasoning: 'VPD is 1.42 kPa (slightly elevated). Passive ridge vents currently adequate; recommends deferring high-power cooling until solar peak.',
    telemetry: {
      vpd: '1.42 kPa',
      ambientTemp: '28.4°C',
      ridgeVentState: '65% Open'
    }
  },
  {
    id: 'energy-agent',
    name: 'Energy Agent',
    icon: '⚡',
    color: 'amber',
    role: 'Power Budgeting & Battery Lifetime Optimization',
    status: 'ACTIVE',
    targetZone: 'All Zones',
    metricLabel: 'Scarcity',
    metricValue: 'LOW (0.19)',
    priority: 0.42,
    bid: 0.42,
    action: 'Allow Normal Operation (Green Tier)',
    confidence: 86,
    reasoning: 'Solar array generating 4.2 kW; Battery SOC at 81%. Net grid draw is 0W. Energy budget supports high-priority hydraulic pump actuation.',
    telemetry: {
      solarYield: '4.2 kW',
      batterySOC: '81%',
      systemLoad: '0.94 kW'
    }
  }
];

export const initialCoordinatorDecision = {
  id: 'DEC-2026-0824-001',
  timestamp: new Date().toLocaleTimeString(),
  selectedAction: 'IRRIGATE ZONE 2',
  actionType: 'IRRIGATE',
  zone: 'Zone 02 (Bell Pepper)',
  targetZoneId: 'zone-2',
  duration: '15 minutes',
  durationSeconds: 900,
  volumeLiters: 22,
  priority: 0.91,
  confidence: 93,
  winningAgent: 'Irrigation Agent',
  competingBids: [
    { agent: 'Irrigation Agent', bid: 0.89, action: 'Irrigate 15 min', status: 'WON' },
    { agent: 'Crop Agent', bid: 0.74, action: 'Irrigate & Relieve Stress', status: 'ALIGNED' },
    { agent: 'Energy Agent', bid: 0.42, action: 'Normal Operation', status: 'SUPPORTED' },
    { agent: 'Climate Agent', bid: 0.31, action: 'Exhaust Fan Stage 1', status: 'DEFERRED' }
  ],
  reason: 'Zone 2 has high crop stress (0.82) and low soil moisture (31%). Water demand is high (22L) while energy availability remains normal (81% Battery, 4.2 kW Solar). Rain is not expected in the next 12 hours.',
  farmerExplanation: {
    actionHeadline: '💧 Irrigating Zone 2',
    durationText: 'Duration: 15 minutes',
    whyText: 'Zone 2 has low soil moisture (31%) and the Bell Pepper plants are experiencing high water stress. Solar power is strong and rain is not forecast today.',
    safetyText: '✓ Safety checks passed — Water reserve and battery levels are plentiful.'
  },
  safetyCheck: {
    status: 'APPROVED',
    waterLimit: { pass: true, detail: '22L required vs 1480L in tank (1.5% usage)' },
    energyBudget: { pass: true, detail: 'Pump load 320W vs 4.2 kW solar generation' },
    weatherCheck: { pass: true, detail: 'Rain probability 18% (Suppression threshold > 65%)' },
    hardSafetyLimits: { pass: true, detail: 'Flow pressure 1.8 bar within 1.2–2.5 bar safety envelope' }
  }
};

export const initialResources = {
  water: {
    availableLiters: 1480,
    totalCapacityLiters: 2000,
    percentage: 74,
    currentDemandLitersPerHour: 38,
    dailyUsageLiters: 410,
    dailyBudgetLiters: 650,
    rainHarvestReserveLiters: 320,
    status: 'Available',
    trend: 'Normal consumption curve',
    chartData: [
      { time: '06:00', usage: 15, available: 1600, budget: 1600 },
      { time: '08:00', usage: 45, available: 1570, budget: 1550 },
      { time: '10:00', usage: 85, available: 1520, budget: 1500 },
      { time: '12:00', usage: 130, available: 1480, budget: 1450 },
      { time: '14:00', usage: 70, available: 1440, budget: 1400 },
      { time: '16:00', usage: 40, available: 1420, budget: 1380 },
      { time: '18:00', usage: 25, available: 1400, budget: 1350 }
    ]
  },
  battery: {
    socPercentage: 81,
    voltage: 48.2,
    currentDrawAmps: 19.5,
    powerDemandWatts: 940,
    estimatedRuntimeHours: 14.5,
    state: 'DISCHARGING_FLOAT', // 'CHARGING' | 'DISCHARGING' | 'FLOAT' | 'CRITICAL'
    healthPercent: 97,
    chartData: [
      { time: '00:00', soc: 92, solar: 0, load: 380 },
      { time: '04:00', soc: 84, solar: 0, load: 350 },
      { time: '08:00', soc: 76, solar: 1800, load: 820 },
      { time: '10:00', soc: 85, solar: 3600, load: 1100 },
      { time: '12:00', soc: 94, solar: 4500, load: 1350 },
      { time: '14:00', soc: 81, solar: 4200, load: 940 },
      { time: '16:00', soc: 78, solar: 2400, load: 850 },
      { time: '20:00', soc: 72, solar: 0, load: 420 }
    ]
  },
  energy: {
    solarGenerationKw: 4.2,
    peakSolarTodayKw: 5.6,
    gridDrawKw: 0.0,
    totalDailySolarKwh: 24.8,
    dailyEnergyBudgetKwh: 30.0,
    scarcityScore: 0.19, // 0.0 (Abundant) to 1.0 (Critical)
    scarcityTier: 'LOW',
    chartData: [
      { time: '06:00', solarKw: 0.4, consumptionKw: 0.5, scarcity: 0.4 },
      { time: '08:00', solarKw: 2.1, consumptionKw: 0.8, scarcity: 0.2 },
      { time: '10:00', solarKw: 3.8, consumptionKw: 1.1, scarcity: 0.15 },
      { time: '12:00', solarKw: 5.2, consumptionKw: 1.4, scarcity: 0.12 },
      { time: '14:00', solarKw: 4.2, consumptionKw: 0.9, scarcity: 0.19 },
      { time: '16:00', solarKw: 2.5, consumptionKw: 0.9, scarcity: 0.28 },
      { time: '18:00', solarKw: 0.6, consumptionKw: 0.7, scarcity: 0.52 },
      { time: '20:00', solarKw: 0.0, consumptionKw: 0.4, scarcity: 0.65 }
    ]
  }
};

export const initialWeather = {
  temperature: 28.0,
  humidity: 58,
  rainProbability: 18,
  expectedRainfallMm: 0.0,
  condition: 'Partly Sunny',
  icon: 'Sun',
  solarIrradiance: 890, // W/m2
  windSpeedKmh: 12.4,
  irrigationSuppressed: false,
  suppressionReason: null,
  forecast: [
    { day: 'Today', temp: '28°C', rain: '18%', icon: 'Sun', condition: 'Sunny' },
    { day: 'Tomorrow', temp: '27°C', rain: '25%', icon: 'CloudSun', condition: 'Partly Cloudy' },
    { day: 'Wednesday', temp: '25°C', rain: '72%', icon: 'CloudRain', condition: 'Rain Predicted' },
    { day: 'Thursday', temp: '26°C', rain: '45%', icon: 'CloudDrizzle', condition: 'Scattered Showers' }
  ]
};

export const initialSensorValidation = {
  soilSensorMoisture: 31,
  soilSensorStressScore: 78,
  cameraVisionStressScore: 82,
  ndviSatelliteStressScore: 79,
  fusedStressScore: 80,
  confidenceRating: 'HIGH', // 'HIGH' | 'MEDIUM' | 'LOW' | 'DISAGREEMENT'
  hasDisagreement: false,
  disagreementMessage: null,
  weights: {
    soilSensor: 0.45,
    cameraVision: 0.35,
    ndviSatellite: 0.20
  },
  sensorHealth: [
    { sensor: 'Capacitive Soil Probe Array', status: 'HEALTHY', variance: '±1.2%' },
    { sensor: 'RGB High-Res Canopy Camera', status: 'HEALTHY', variance: '±2.4%' },
    { sensor: 'Sentinel-2 / Micro-NDVI Sensor', status: 'HEALTHY', variance: '±1.8%' },
    { sensor: 'SHT40 Temp/Humidity Probe', status: 'HEALTHY', variance: '±0.4%' }
  ]
};

export const initialSafetyState = {
  mode: 'NORMAL', // 'NORMAL' | 'CONSERVATIVE' | 'CRITICAL' | 'EMERGENCY'
  description: 'All system parameters well within safe operational limits.',
  nonEssentialActions: 'REDUCED ONLY WHEN REQUIRED',
  criticalCropActions: 'PROTECTED',
  limits: [
    { name: 'Minimum Tank Water Level', threshold: '20% (400L)', current: '74% (1480L)', status: 'PASS' },
    { name: 'Battery Cut-off Voltage', threshold: '43.2V (15% SOC)', current: '48.2V (81% SOC)', status: 'PASS' },
    { name: 'Maximum Zone Temperature', threshold: '38.0°C', current: '28.4°C (Zone 2)', status: 'PASS' },
    { name: 'Actuator Thermal Overload', threshold: '65°C', current: '38.2°C', status: 'PASS' }
  ]
};

export const initialLearningLessons = [
  {
    id: 104,
    lessonNumber: '#104',
    title: 'Heat Wave Irrigation Prioritization',
    insight: 'When high ambient heat (>32°C) coincides with low battery (<35%), prioritize pulse root-zone irrigation over climate exhaust fans if crop stress exceeds 0.70.',
    confidence: 87,
    source: 'Federated Greenhouse Network (Zone 4 Node)',
    tags: ['Heat Stress', 'Battery Optimization', 'Hydraulics'],
    appliedCount: 14,
    dateAdded: '2026-08-18'
  },
  {
    id: 103,
    lessonNumber: '#103',
    title: 'Rain Forecast Irrigation Suppression',
    insight: 'When 6-hour rain probability exceeds 70% with expected rainfall > 3.0mm, suppress scheduled afternoon irrigation to save 28% water.',
    confidence: 91,
    source: 'Anonymous Maharashtra Polyhouse Cohort',
    tags: ['Weather Intelligence', 'Water Conservation'],
    appliedCount: 42,
    dateAdded: '2026-08-12'
  },
  {
    id: 102,
    lessonNumber: '#102',
    title: 'Solar Peak Pre-Cooling Buffer',
    insight: 'Pre-cool canopy microclimate by 1.5°C during peak solar generation (12:00-14:00) using excess PV power, reducing nighttime fan battery consumption by 34%.',
    confidence: 89,
    source: 'Anonymous Karnataka Precision Ag Cluster',
    tags: ['Thermal Inertia', 'Solar Utilization'],
    appliedCount: 29,
    dateAdded: '2026-08-04'
  },
  {
    id: 101,
    lessonNumber: '#101',
    title: 'Nighttime VPD Leaf Wetness Prevention',
    insight: 'Limit relative humidity above 85% after 22:00 by pulsing passive ridge louvers for 90 seconds every 20 minutes to prevent Botrytis fungal sporulation.',
    confidence: 93,
    source: 'ICAR Protected Cultivation Model',
    tags: ['Pathogen Prevention', 'Passive Ventilation'],
    appliedCount: 68,
    dateAdded: '2026-07-28'
  }
];

export const initialImpactMetrics = {
  waterEfficiency: {
    percentage: 23,
    label: 'Water Saved',
    volumeLiters: '14,280 L',
    subtext: 'vs traditional timed timer irrigation',
    trend: '+4.2% this month'
  },
  energyEfficiency: {
    percentage: 17,
    label: 'Energy Reduced',
    kwhSaved: '184 kWh',
    subtext: 'vs constant-speed greenhouse ventilation',
    trend: 'Zero grid draw during day'
  },
  cropProtection: {
    count: 14,
    label: 'Stress Events Prevented',
    cropYieldProjected: '+18.5%',
    subtext: 'Early stress intervention within 4 mins',
    trend: 'Zero wilting incidences'
  },
  farmerSupport: {
    count: 32,
    label: 'Decisions Explained',
    satisfactionRate: '98%',
    subtext: 'Plain-language actionable farmer logs',
    trend: '100% transparent AI'
  },
  sustainability: {
    percentage: 18,
    label: 'CO₂ Reduction',
    kgCo2Avoided: '142 kg',
    subtext: 'Solar-first dispatch & hydraulic efficiency',
    trend: 'SIH Green Tech Metric'
  }
};

export const initialDecisionsLog = [
  {
    id: 'DEC-1014',
    time: '14:38:12',
    action: 'IRRIGATE ZONE 2',
    zone: 'Zone 02 (Bell Pepper)',
    duration: '15 min',
    priority: 0.91,
    confidence: 93,
    agent: 'Irrigation Agent',
    reason: 'Acute soil moisture deficit (31%) & canopy stress (0.82) under high solar yield.',
    safety: 'APPROVED'
  },
  {
    id: 'DEC-1013',
    time: '13:50:00',
    action: 'DEPLOY SHADE SCREEN ZONE 3',
    zone: 'Zone 03 (Cucumber)',
    duration: '60 min',
    priority: 0.65,
    confidence: 90,
    agent: 'Climate Agent',
    reason: 'Solar radiation exceeded 850 W/m² causing transient leaf photo-inhibition.',
    safety: 'APPROVED'
  },
  {
    id: 'DEC-1012',
    time: '12:30:15',
    action: 'EXHAUST FAN PULSE ZONE 1',
    zone: 'Zone 01 (Tomato)',
    duration: '8 min',
    priority: 0.54,
    confidence: 95,
    agent: 'Climate Agent',
    reason: 'Vapor pressure deficit exceeded 1.6 kPa; humidity drop compensated.',
    safety: 'APPROVED'
  },
  {
    id: 'DEC-1011',
    time: '11:15:00',
    action: 'DRIP IRRIGATE ZONE 1',
    zone: 'Zone 01 (Tomato)',
    duration: '10 min',
    priority: 0.72,
    confidence: 96,
    agent: 'Irrigation Agent',
    reason: 'Scheduled morning root hydration based on transpiration modeling.',
    safety: 'APPROVED'
  }
];

export const initialAlerts = [
  {
    id: 'ALT-01',
    severity: 'WARNING', // 'INFO' | 'WARNING' | 'CRITICAL'
    title: 'Zone 2 Soil Moisture Alert',
    message: 'Soil moisture dropped to 31% (target 65%). Irrigation Agent bid winning.',
    timestamp: '14:35',
    zoneId: 'zone-2'
  },
  {
    id: 'ALT-02',
    severity: 'INFO',
    title: 'Solar Generation Optimal',
    message: 'Array generating 4.2 kW. Full battery float achieved.',
    timestamp: '13:00',
    zoneId: null
  }
];
