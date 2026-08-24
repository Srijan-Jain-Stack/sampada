/**
 * SAMPADA - Centralized REST API Service Layer
 * Clean abstraction handling backend REST API with fallback to local mock data
 */

import {
  initialOverviewMetrics,
  initialZones,
  initialAgents,
  initialCoordinatorDecision,
  initialResources,
  initialWeather,
  initialSensorValidation,
  initialSafetyState,
  initialLearningLessons,
  initialImpactMetrics,
  initialDecisionsLog,
  initialSystemStatus
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Mock data is useful for isolated design work, but must be explicitly opted
// into. A disconnected backend should never look like a live greenhouse.
const USE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true';

const AGENT_UI = {
  crop: { id: 'crop-agent', name: 'Crop Agent', icon: '🌱', color: 'emerald', role: 'Biological Stress & Phenology Specialist', metricLabel: 'Crop Stress' },
  irrigation: { id: 'irrigation-agent', name: 'Irrigation Agent', icon: '💧', color: 'blue', role: 'Hydraulic Efficiency & Soil Dynamics', metricLabel: 'Water Need' },
  climate: { id: 'climate-agent', name: 'Climate Agent', icon: '🌡', color: 'orange', role: 'Vapor Pressure Deficit & Thermal Regulation', metricLabel: 'Heat Stress' },
  energy: { id: 'energy-agent', name: 'Energy Agent', icon: '⚡', color: 'amber', role: 'Power Budgeting & Battery Lifetime Optimization', metricLabel: 'Energy Priority' }
};

const zoneId = (id) => `zone-${String(id).replace(/\D/g, '') || id}`;
const zoneLabel = (id) => `Zone ${String(id).replace(/\D/g, '').padStart(2, '0')}`;

/** Convert the agents' wire contracts into the UI view model in one place. */
export function normalizeDashboard(payload) {
  if (!payload?.agent_outputs || !payload?.zones || Array.isArray(payload.zones)) return payload;
  const rawStates = Object.values(payload.zones);
  const latestDecisions = (payload.decisions || []).slice(-rawStates.length);
  const decisionsByZone = Object.fromEntries(latestDecisions.map((item) => [item.zone_id, item]));

  const zones = Object.entries(payload.zones).map(([id, state]) => {
    const template = initialZones.find((zone) => zone.id === zoneId(id)) || initialZones[0];
    const soilMoisture = state.soil_moisture ?? state.soil_moisture_pct ?? template.soilMoisture;
    const cropBid = payload.agent_outputs.crop?.[id];
    const cropStressScore = cropBid?.stress_score ?? template.cropStressScore * 100;
    const zoneDecision = decisionsByZone[id];
    const action = zoneDecision?.action;
    const currentAction = zoneDecision
      ? zoneDecision.allowed ? action.command.replaceAll('_', ' ') : 'SAFETY HOLD'
      : 'Monitoring Micro-climate';
    return {
      ...template,
      id: zoneId(id),
      numericId: Number(String(id).replace(/\D/g, '')) || template.numericId,
      name: `${zoneLabel(id)} — ${state.crop || template.crop}`,
      crop: state.crop || template.crop,
      temperature: state.temperature ?? template.temperature,
      humidity: state.humidity ?? template.humidity,
      soilMoisture,
      waterDemand: state.water_demand ?? template.waterDemand,
      cropStressScore,
      cropStress: cropStressScore >= 75 ? 'HIGH' : cropStressScore >= 40 ? 'MODERATE' : 'LOW',
      health: Math.max(0, Math.round(100 - cropStressScore)),
      currentAction,
      currentActionType: action?.command || 'MONITOR',
      confidence: Math.round((zoneDecision?.winning_bid?.confidence ?? template.confidence / 100) * 100)
    };
  });

  const agents = Object.entries(AGENT_UI).map(([agent, meta]) => {
    const bids = Object.values(payload.agent_outputs[agent] || {});
    const bid = bids.sort((a, b) => b.priority - a.priority)[0];
    const fallback = initialAgents.find((item) => item.id === meta.id);
    return {
      ...fallback,
      ...meta,
      status: bid ? 'ACTIVE' : 'WAITING',
      targetZone: bid ? zoneLabel(bid.zone_id) : fallback.targetZone,
      metricValue: bid ? String(bid.priority) : fallback.metricValue,
      priority: bid?.priority ?? fallback.priority,
      bid: bid?.bid ?? fallback.bid,
      action: bid?.recommended_action ?? fallback.action,
      confidence: Math.round((bid?.confidence ?? fallback.confidence / 100) * 100),
      reasoning: bid?.reason ?? fallback.reasoning
    };
  });

  const rawDecision = latestDecisions.at(-1);
  const winner = rawDecision?.winning_bid;
  const decision = rawDecision ? {
    ...initialCoordinatorDecision,
    id: `DEC-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    selectedAction: rawDecision.allowed ? rawDecision.action.command : 'SAFETY HOLD',
    actionType: rawDecision.action?.command || 'MONITOR',
    zone: zoneLabel(rawDecision.zone_id),
    targetZoneId: zoneId(rawDecision.zone_id),
    duration: `${rawDecision.action?.duration_minutes ?? 0} minutes`,
    priority: winner.priority,
    confidence: Math.round(winner.confidence * 100),
    winningAgent: AGENT_UI[winner.agent]?.name || winner.agent,
    competingBids: Object.values(payload.agent_outputs).map((perAgent) => perAgent[rawDecision.zone_id]).filter(Boolean).map((bid) => ({
      agent: AGENT_UI[bid.agent]?.name || bid.agent,
      bid: bid.bid,
      action: bid.recommended_action,
      status: bid.agent === winner.agent ? 'WON' : 'DEFERRED'
    })),
    reason: rawDecision.reason,
    safetyCheck: { ...initialCoordinatorDecision.safetyCheck, status: rawDecision.allowed ? 'APPROVED' : 'REJECTED' }
  } : initialCoordinatorDecision;

  const average = (key, fallback = 0) => rawStates.length
    ? rawStates.reduce((total, state) => total + Number(state[key] ?? 0), 0) / rawStates.length
    : fallback;
  const averageTank = average('tank_level', 0);
  const averageBattery = average('battery', 0);
  const solarKw = average('solar_power', 0) / 1000;
  const cropHealth = Math.round(zones.reduce((total, zone) => total + zone.health, 0) / Math.max(1, zones.length));
  const approved = latestDecisions.filter((item) => item.allowed).length;
  const allSafe = rawStates.length > 0 && approved === rawStates.length;

  // Preserve the presentation fields expected by the UI, but replace their live
  // values with the telemetry and decisions returned by the Python services.
  const resources = {
    ...initialResources,
    water: {
      ...initialResources.water,
      percentage: Math.round(averageTank),
      availableLiters: Math.round(initialResources.water.totalCapacityLiters * averageTank / 100),
      status: averageTank < 20 ? 'LOW' : 'AVAILABLE'
    },
    battery: { ...initialResources.battery, socPercentage: Math.round(averageBattery) },
    energy: { ...initialResources.energy, solarGenerationKw: Number(solarKw.toFixed(2)) }
  };
  const metrics = {
    ...initialOverviewMetrics,
    cropHealth: { ...initialOverviewMetrics.cropHealth, value: cropHealth, status: cropHealth >= 75 ? 'Healthy' : cropHealth >= 45 ? 'Attention' : 'Critical' },
    waterAvailability: { ...initialOverviewMetrics.waterAvailability, value: Math.round(averageTank), liters: resources.water.availableLiters },
    batteryLevel: { ...initialOverviewMetrics.batteryLevel, value: Math.round(averageBattery), stateOfCharge: Math.round(averageBattery) },
    solarGeneration: { ...initialOverviewMetrics.solarGeneration, value: Number(solarKw.toFixed(2)) },
    safetyStatus: { ...initialOverviewMetrics.safetyStatus, value: allSafe ? 'ALL SAFE' : 'REVIEW', status: allSafe ? 'All Safe' : 'Action Restricted', failedChecks: rawStates.length - approved, totalChecks: rawStates.length }
  };

  return { ...payload, zones, agents, decision, resources, metrics };
}

/**
 * Generic fetch wrapper with timeout and fallback
 */
async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data: endpoint === '/api/dashboard' ? normalizeDashboard(data) : data, isMock: false, error: null };
  } catch (err) {
    if (USE_MOCK_FALLBACK) {
      return { data: fallbackData, isMock: true, error: err.message };
    }
    throw err;
  }
}

export const sampadaAPI = {
  // 1. Dashboard combined payload
  async getDashboard() {
    return fetchWithFallback('/api/dashboard', {
      systemStatus: initialSystemStatus,
      metrics: initialOverviewMetrics,
      zones: initialZones,
      agents: initialAgents,
      decision: initialCoordinatorDecision,
      resources: initialResources,
      weather: initialWeather,
      sensorValidation: initialSensorValidation,
      safetyState: initialSafetyState,
      impact: initialImpactMetrics
    });
  },

  // 2. Zones
  async getZones() {
    return fetchWithFallback('/api/zones', initialZones);
  },

  async getZoneById(zoneId) {
    const fallback = initialZones.find(z => z.id === zoneId) || initialZones[0];
    return fetchWithFallback(`/api/zones/${zoneId}`, fallback);
  },

  // 3. Resources (Water, Battery, Energy)
  async getResources() {
    return fetchWithFallback('/api/resources', initialResources);
  },

  // 4. Multi-Agent statuses and bids
  async getAgents() {
    return fetchWithFallback('/api/agents', initialAgents);
  },

  // 5. Coordinator decisions & history
  async getDecisions() {
    return fetchWithFallback('/api/decisions', {
      currentDecision: initialCoordinatorDecision,
      history: initialDecisionsLog
    });
  },

  // 6. Learning Commons lessons
  async getLearning() {
    return fetchWithFallback('/api/learning', initialLearningLessons);
  },

  // 7. Impact analytics metrics
  async getImpact() {
    return fetchWithFallback('/api/impact', initialImpactMetrics);
  },

  // 8. Weather intelligence
  async getWeather() {
    return fetchWithFallback('/api/weather', initialWeather);
  },

  // 9. Cross-sensor validation
  async getSensorValidation() {
    return fetchWithFallback('/api/sensors/validate', initialSensorValidation);
  },

  // 10. Trigger demo scenario on backend (if online)
  async triggerDemoScenario(scenarioId) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/demo/cycle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario_id: scenarioId })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      return { ...result, dashboard: normalizeDashboard(result.dashboard), localOnly: false };
    } catch {
      return { success: true, localOnly: true, scenarioId };
    }
  }
};

export default sampadaAPI;
