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
const USE_MOCK_FALLBACK = true;

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
    return { data, isMock: false, error: null };
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
      const res = await fetch(`${API_BASE_URL}/api/demo/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId })
      });
      return await res.json();
    } catch {
      return { success: true, localOnly: true, scenarioId };
    }
  }
};

export default sampadaAPI;
