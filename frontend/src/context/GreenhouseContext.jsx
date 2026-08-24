/**
 * SAMPADA - Global Greenhouse Context & State Engine
 * Manages dual views (Farmer/Technical), real-time agent state, and 9-step SIH demo engine
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  initialAlerts,
  initialSystemStatus
} from '../data/mockData';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { sampadaAPI } from '../api/sampadaAPI';
import { useWebSocket } from '../hooks/useWebSocket';

const GreenhouseContext = createContext(null);

export function GreenhouseProvider({ children }) {
  // 1. View Mode (Farmer vs Technical)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('sampada_view_mode') || 'technical';
  });

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const next = prev === 'farmer' ? 'technical' : 'farmer';
      localStorage.setItem('sampada_view_mode', next);
      return next;
    });
  };

  // 2. Core State
  const [systemStatus, setSystemStatus] = useState(initialSystemStatus);
  const [metrics, setMetrics] = useState(initialOverviewMetrics);
  const [zones, setZones] = useState(initialZones);
  const [agents, setAgents] = useState(initialAgents);
  const [decision, setDecision] = useState(initialCoordinatorDecision);
  const [resources, setResources] = useState(initialResources);
  const [weather, setWeather] = useState(initialWeather);
  const [sensorValidation, setSensorValidation] = useState(initialSensorValidation);
  const [safetyState, setSafetyState] = useState(initialSafetyState);
  const [learningLessons, setLearningLessons] = useState(initialLearningLessons);
  const [impactMetrics, setImpactMetrics] = useState(initialImpactMetrics);
  const [decisionsLog, setDecisionsLog] = useState(initialDecisionsLog);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [liveEvents, setLiveEvents] = useState([
    { id: 'evt-1', time: '14:38:12', text: 'Irrigation Agent bid 0.89 evaluated by Coordinator', type: 'DECISION' },
    { id: 'evt-2', time: '14:38:15', text: 'Safety Gate passed 4/4 checks. Solenoid Valve #2 open', type: 'ACTION' },
    { id: 'evt-3', time: '14:35:00', text: 'Zone 2 soil moisture at 31% (alert triggered)', type: 'ALERT' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // 3. Demo Engine State (9-Step Interactive Showcase)
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState('zone-2-water-stress');
  const [demoCurrentStep, setDemoCurrentStep] = useState(1);
  const [demoIsPlaying, setDemoIsPlaying] = useState(false);
  const [demoSpeedMs, setDemoSpeedMs] = useState(2500);
  const demoTimerRef = useRef(null);

  const activeScenario = DEMO_SCENARIOS.find(s => s.id === activeScenarioId) || DEMO_SCENARIOS[0];

  // 4. WebSocket Message Handler
  const handleWsMessage = useCallback((msg) => {
    if (!msg) return;

    if (msg.type === 'TELEMETRY_PULSE') {
      // Dynamic tiny jitter for live feel
      setZones(prev => prev.map(z => {
        if (z.id === 'zone-2') {
          return {
            ...z,
            temperature: +(z.temperature + (msg.data?.tempJitter || 0)).toFixed(1)
          };
        }
        return z;
      }));
    } else if (msg.type === 'NEW_DECISION') {
      setDecision(msg.data);
      setDecisionsLog(prev => [msg.data, ...prev.slice(0, 15)]);
      setLiveEvents(prev => [
        { id: `evt-${Date.now()}`, time: new Date().toLocaleTimeString(), text: `New Action: ${msg.data.selectedAction}`, type: 'DECISION' },
        ...prev.slice(0, 20)
      ]);
    } else if (msg.type === 'ZONE_UPDATE') {
      setZones(prev => prev.map(z => z.id === msg.data.id ? { ...z, ...msg.data } : z));
    } else if (msg.type === 'ALERT_NEW') {
      setAlerts(prev => [msg.data, ...prev]);
    }
  }, []);

  const ws = useWebSocket({ onMessage: handleWsMessage });

  // 5. Initial Data Load
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await sampadaAPI.getDashboard();
      if (res.data) {
        if (res.data.metrics) setMetrics(res.data.metrics);
        if (res.data.zones) setZones(res.data.zones);
        if (res.data.agents) setAgents(res.data.agents);
        if (res.data.decision) setDecision(res.data.decision);
        if (res.data.resources) setResources(res.data.resources);
        if (res.data.weather) setWeather(res.data.weather);
        if (res.data.sensorValidation) setSensorValidation(res.data.sensorValidation);
        if (res.data.safetyState) setSafetyState(res.data.safetyState);
        if (res.data.impact) setImpactMetrics(res.data.impact);
      }
      setApiError(null);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // 6. Apply Scenario Data to State
  const applyScenarioState = useCallback((scenario, stepIndex) => {
    if (!scenario) return;

    // Apply zone updates
    setZones(prev => prev.map(z => {
      if (z.id === scenario.zoneState.zoneId) {
        return {
          ...z,
          cropStress: scenario.zoneState.cropStress,
          cropStressScore: scenario.zoneState.cropStressScore,
          soilMoisture: scenario.zoneState.soilMoisture,
          temperature: scenario.zoneState.temp,
          waterDemand: scenario.zoneState.waterDemand
        };
      }
      return z;
    }));

    // Apply resource updates
    setResources(prev => ({
      ...prev,
      water: { ...prev.water, percentage: scenario.resources.waterPercent },
      battery: { ...prev.battery, socPercentage: scenario.resources.batterySOC },
      energy: { ...prev.energy, solarGenerationKw: scenario.resources.solarKw }
    }));

    // Apply weather updates
    setWeather(prev => ({
      ...prev,
      temperature: scenario.weather.temp,
      rainProbability: scenario.weather.rainProb,
      irrigationSuppressed: scenario.weather.suppressed || false,
      suppressionReason: scenario.weather.suppressionReason || null,
      expectedRainfallMm: scenario.weather.expectedRainfallMm || 0
    }));

    // Apply Agent bids
    setAgents(prev => prev.map(a => {
      const match = scenario.agents.find(sa => sa.id === a.id);
      if (match) {
        return {
          ...a,
          bid: match.bid,
          priority: match.priority,
          action: match.action,
          status: match.status,
          confidence: match.confidence
        };
      }
      return a;
    }));

    // If on step >= 6, show scenario decision
    if (stepIndex >= 6) {
      setDecision(prev => ({
        ...prev,
        selectedAction: scenario.decision.action,
        zone: scenario.decision.target,
        duration: scenario.decision.duration,
        priority: scenario.decision.priority,
        confidence: scenario.decision.confidence,
        reason: scenario.decision.reason,
        farmerExplanation: {
          actionHeadline: scenario.decision.action,
          durationText: `Duration: ${scenario.decision.duration}`,
          whyText: scenario.decision.farmerReason,
          safetyText: `✓ ${scenario.decision.safetyGate}`
        }
      }));
    }

    // Add live event
    const currentStepObj = scenario.steps[stepIndex - 1];
    if (currentStepObj) {
      setLiveEvents(prev => [
        {
          id: `demo-evt-${Date.now()}`,
          time: new Date().toLocaleTimeString(),
          text: `[Demo Step ${currentStepObj.step}/9] ${currentStepObj.name}: ${currentStepObj.detail}`,
          type: 'DEMO'
        },
        ...prev.slice(0, 15)
      ]);
    }
  }, []);

  // 7. Demo Playback Engine
  const nextDemoStep = useCallback(() => {
    setDemoCurrentStep(prev => {
      if (prev >= 9) {
        setDemoIsPlaying(false);
        return 9;
      }
      const next = prev + 1;
      applyScenarioState(activeScenario, next);
      return next;
    });
  }, [activeScenario, applyScenarioState]);

  const prevDemoStep = useCallback(() => {
    setDemoCurrentStep(prev => {
      const next = Math.max(1, prev - 1);
      applyScenarioState(activeScenario, next);
      return next;
    });
  }, [activeScenario, applyScenarioState]);

  const goToDemoStep = useCallback((stepNumber) => {
    const valid = Math.max(1, Math.min(9, stepNumber));
    setDemoCurrentStep(valid);
    applyScenarioState(activeScenario, valid);
  }, [activeScenario, applyScenarioState]);

  const selectScenario = useCallback((scenarioId) => {
    setActiveScenarioId(scenarioId);
    setDemoCurrentStep(1);
    setDemoIsPlaying(false);
    const target = DEMO_SCENARIOS.find(s => s.id === scenarioId) || DEMO_SCENARIOS[0];
    applyScenarioState(target, 1);
  }, [applyScenarioState]);

  const playDemo = () => setDemoIsPlaying(true);
  const pauseDemo = () => setDemoIsPlaying(false);

  const resetDemo = () => {
    setDemoIsPlaying(false);
    setDemoCurrentStep(1);
    applyScenarioState(activeScenario, 1);
  };

  const openDemoModal = (scenarioId) => {
    if (scenarioId) {
      selectScenario(scenarioId);
    }
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setDemoIsPlaying(false);
    setDemoModalOpen(false);
  };

  // Demo auto-advance interval
  useEffect(() => {
    if (demoIsPlaying) {
      demoTimerRef.current = setInterval(() => {
        setDemoCurrentStep(current => {
          if (current >= 9) {
            setDemoIsPlaying(false);
            return 9;
          }
          const next = current + 1;
          applyScenarioState(activeScenario, next);
          return next;
        });
      }, demoSpeedMs);
    } else {
      if (demoTimerRef.current) {
        clearInterval(demoTimerRef.current);
      }
    }

    return () => {
      if (demoTimerRef.current) clearInterval(demoTimerRef.current);
    };
  }, [demoIsPlaying, demoSpeedMs, activeScenario, applyScenarioState]);

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const value = {
    // View mode
    viewMode,
    setViewMode,
    toggleViewMode,
    isFarmerView: viewMode === 'farmer',
    isTechnicalView: viewMode === 'technical',

    // Core data
    systemStatus,
    metrics,
    zones,
    agents,
    decision,
    resources,
    weather,
    sensorValidation,
    safetyState,
    learningLessons,
    impactMetrics,
    decisionsLog,
    alerts,
    liveEvents,
    isLoading,
    apiError,
    refreshData: fetchAllData,
    dismissAlert,

    // WebSocket state
    wsStatus: ws.status,
    isWsLive: ws.isLive,
    isWsMock: ws.isMock,
    latencyMs: ws.latencyMs,
    reconnectWs: ws.reconnect,

    // Demo Controls
    demo: {
      isOpen: demoModalOpen,
      open: openDemoModal,
      close: closeDemoModal,
      scenarios: DEMO_SCENARIOS,
      activeScenario,
      activeScenarioId,
      currentStep: demoCurrentStep,
      isPlaying: demoIsPlaying,
      speedMs: demoSpeedMs,
      setSpeedMs: setDemoSpeedMs,
      play: playDemo,
      pause: pauseDemo,
      reset: resetDemo,
      nextStep: nextDemoStep,
      prevStep: prevDemoStep,
      goToStep: goToDemoStep,
      selectScenario
    }
  };

  return (
    <GreenhouseContext.Provider value={value}>
      {children}
    </GreenhouseContext.Provider>
  );
}

export function useGreenhouse() {
  const context = useContext(GreenhouseContext);
  if (!context) {
    throw new Error('useGreenhouse must be used within a GreenhouseProvider');
  }
  return context;
}

export default GreenhouseContext;
