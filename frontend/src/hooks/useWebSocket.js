/**
 * SAMPADA - WebSocket Hook with Auto-Reconnect & Mock Simulator Fallback
 * Provides real-time event streaming for multi-agent negotiation, telemetry & decisions
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export function useWebSocket({ onMessage, enabled = true } = {}) {
  const [status, setStatus] = useState('CONNECTING'); // 'CONNECTING' | 'OPEN' | 'CLOSED' | 'MOCK'
  const [lastMessage, setLastMessage] = useState(null);
  const [latencyMs, setLatencyMs] = useState(18);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const mockIntervalRef = useRef(null);
  const reconnectAttempts = useRef(0);

  // Fallback mock simulation generator when backend is offline
  const startMockSimulation = useCallback(() => {
    if (mockIntervalRef.current) return;
    setStatus('MOCK');

    mockIntervalRef.current = setInterval(() => {
      // Small simulated real-time telemetry fluctuations
      const mockEvent = {
        type: 'TELEMETRY_PULSE',
        timestamp: new Date().toISOString(),
        data: {
          tempJitter: +(Math.random() * 0.4 - 0.2).toFixed(1),
          moistureJitter: +(Math.random() * 0.6 - 0.3).toFixed(1),
          solarYield: +(4.2 + Math.random() * 0.2 - 0.1).toFixed(2),
          waterFlow: +(1.4 + Math.random() * 0.1).toFixed(2),
          negotiationTick: Date.now()
        }
      };
      setLastMessage(mockEvent);
      if (onMessage) {
        onMessage(mockEvent);
      }
    }, 4000);
  }, [onMessage]);

  const stopMockSimulation = useCallback(() => {
    if (mockIntervalRef.current) {
      clearInterval(mockIntervalRef.current);
      mockIntervalRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (!enabled) return;

    try {
      setStatus('CONNECTING');
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('OPEN');
        stopMockSimulation();
        reconnectAttempts.current = 0;
        setLatencyMs(Math.floor(12 + Math.random() * 10));
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setLastMessage(parsed);
          if (onMessage) onMessage(parsed);
        } catch (e) {
          console.warn('Malformed WS message:', event.data, e);
        }
      };

      ws.onerror = () => {
        // Will trigger ws.onclose
      };

      ws.onclose = () => {
        setStatus('CLOSED');
        wsRef.current = null;

        // Start mock simulation so UI remains interactive
        startMockSimulation();

        // Exponential backoff reconnect
        const delay = Math.min(1000 * Math.pow(1.5, reconnectAttempts.current), 15000);
        reconnectAttempts.current += 1;
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      };
    } catch (err) {
      setStatus('CLOSED');
      startMockSimulation();
    }
  }, [enabled, onMessage, startMockSimulation, stopMockSimulation]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      stopMockSimulation();
    };
  }, [connect, stopMockSimulation]);

  const sendMessage = useCallback((msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
      return true;
    }
    return false;
  }, []);

  const reconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    reconnectAttempts.current = 0;
    connect();
  }, [connect]);

  return {
    status, // 'OPEN' | 'MOCK' | 'CONNECTING' | 'CLOSED'
    isLive: status === 'OPEN',
    isMock: status === 'MOCK',
    lastMessage,
    latencyMs,
    sendMessage,
    reconnect
  };
}

export default useWebSocket;
