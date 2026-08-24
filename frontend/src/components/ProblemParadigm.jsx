import React, { useState } from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  HelpCircle, 
  Cpu, 
  Droplets, 
  Sun, 
  Wind, 
  Layers, 
  Compass, 
  Sparkles 
} from 'lucide-react';

export default function ProblemParadigm() {
  const [selectedMatrixPoint, setSelectedMatrixPoint] = useState('our-system');

  const matrixPoints = [
    {
      id: 'commercial',
      label: 'Commercial Controllers (Priva, Autogrow)',
      quadrant: 'Bottom-Left (Single Greenhouse · Reactive)',
      coords: { x: '22%', y: '80%' },
      pros: 'Reliable single-variable PID',
      gap: 'Extremely expensive (₹5L+), closed silos, no multi-resource arbitration.'
    },
    {
      id: 'igrow',
      label: 'iGrow (Cao et al., AAAI 2022)',
      quadrant: 'Top-Left (Single Greenhouse · Learns)',
      coords: { x: '28%', y: '25%' },
      pros: '+10.15% yield gain proven',
      gap: 'Heavy cloud neural-network simulator, single greenhouse loop only, no cross-farm transfer, high compute cost.'
    },
    {
      id: 'ajagekar',
      label: 'Multi-Agent DRL (Ajagekar et al., 2024)',
      quadrant: 'Middle-Right (Multi-Farm · Energy Only)',
      coords: { x: '75%', y: '50%' },
      pros: 'Scales multi-agent coordination for microgrid energy',
      gap: 'Energy-only focus; ignores irrigation/crop stress agents, zero explainability to farmers.'
    },
    {
      id: 'our-system',
      label: 'OUR SYSTEM (Multi-Agent + MQTT Commons)',
      quadrant: 'Top-Right (Networked Fleet · Learns & Explains)',
      coords: { x: '86%', y: '16%' },
      pros: 'Simultaneous water + climate + energy arbitration, LinUCB on sub-₹5k ESP32, bilingual explainability, federated MQTT learning commons.',
      gap: 'The true novel sweet spot for smallholders & commercial polyhouses.'
    }
  ];

  return (
    <section className="py-20 bg-[#f7faf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            RESEARCH FOUNDATION &amp; GAP ANALYSIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Why Traditional Polyhouses Fail Under Real Scarcity
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            This isn't a sensor problem — sensors are commoditized. It is a <strong className="text-emerald-700 font-semibold">resource-arbitration and trust problem</strong>.
          </p>
        </div>

        {/* Part A: The Disconnected Silos vs Multi-Agent Coordination (Split Screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* TODAY: The Failure Mode */}
          <div className="rounded-3xl bg-red-50/50 border border-red-200 p-6 sm:p-8 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-red-200 pb-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">Status Quo: Disconnected Silos</h3>
              </div>
              <span className="text-xs font-mono text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200 font-bold">
                3 Blind Controllers
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-red-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">Irrigation Timer</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Waters blindly on fixed clock schedules, even when it rains or water tanks are near empty.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-red-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">Climate Thermostat</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Cycles fans and misting continuously without checking if the battery has enough reserve for afternoon peak heat.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-red-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">Solar / Battery Inverter</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Drains completely by 1:30 PM, shutting down polyhouses at the exact moment heat stress is most severe.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-red-100/70 border border-red-200 text-xs text-red-800 font-mono flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>Result: Premature equipment wear, depleted batteries, water waste, and unexplained crop wilting.</span>
            </div>
          </div>

          {/* OUR PARADIGM: Dynamic Multi-Agent Coordinator */}
          <div className="rounded-3xl bg-emerald-50/50 border border-emerald-200 p-6 sm:p-8 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-emerald-200 pb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">Our Solution: Multi-Agent Arbitration</h3>
              </div>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                Unified Ecosystem
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 font-mono uppercase">LinUCB Contextual Auctioneer</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Collects urgency bids from crop, water, and climate agents every cycle. Dynamically schedules resources under strict constraints.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-teal-800 font-mono uppercase">Open-Meteo Rain Suppression</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Suppresses non-critical irrigation when rain probability &gt; 60% and &gt; 2mm forecast, saving hundreds of liters per cycle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-lime-800 font-mono uppercase">Safety Guardrail Check (Veto Gate)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Immutable hardware safety bounds ensure that regardless of AI weights, soil and battery never breach hazardous limits.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-emerald-100/80 border border-emerald-200 text-xs text-emerald-900 font-mono flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Result: +10.15% Yield, 34.8% Water Savings, and 100% Explainable Decisions for Farmers.</span>
            </div>
          </div>

        </div>

        {/* Part B: Interactive 2x2 Research Positioning Matrix */}
        <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">Research Gap Validation</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight mt-0.5">
                The 2×2 Positioning Matrix
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Click any point to inspect positioning
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* The 2x2 Visual Canvas */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-slate-50 border border-emerald-200/80 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                
                {/* Axis lines */}
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-300 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-4 right-4 h-px bg-slate-300 -translate-y-1/2"></div>

                {/* Axis Labels */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-sm">
                  Learns &amp; Explains (Adaptive AI) ↑
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                  ↓ Reactive / Rule-Based (Static PID)
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-wider -rotate-90 origin-center bg-white px-2 py-0.5 rounded border border-slate-200">
                  ← Single Greenhouse
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider rotate-90 origin-center bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-sm">
                  Networked Multi-Farm →
                </div>

                {/* Plotted Points */}
                {matrixPoints.map((point) => {
                  const isSelected = selectedMatrixPoint === point.id;
                  const isOurSystem = point.id === 'our-system';
                  return (
                    <button
                      key={point.id}
                      onClick={() => setSelectedMatrixPoint(point.id)}
                      style={{ left: point.coords.x, top: point.coords.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group z-20 transition-all ${
                        isSelected ? 'scale-110' : 'hover:scale-105 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all ${
                        isOurSystem 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-200' 
                          : 'bg-white border border-slate-400 text-slate-700'
                      }`}>
                        {isOurSystem ? '★' : '•'}
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded whitespace-nowrap shadow-sm ${
                        isOurSystem 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
                          : 'bg-white text-slate-700 border border-slate-300'
                      }`}>
                        {point.label.split(' ')[0]} {point.id === 'our-system' ? 'System' : ''}
                      </span>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Matrix Inspector Card */}
            <div className="lg:col-span-5">
              {(() => {
                const current = matrixPoints.find(p => p.id === selectedMatrixPoint) || matrixPoints[3];
                const isOur = current.id === 'our-system';
                return (
                  <div className={`rounded-2xl p-6 border transition-all ${
                    isOur 
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-md shadow-emerald-950/5' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase">
                      <span>{current.quadrant}</span>
                    </div>

                    <h4 className="text-lg font-display font-bold text-slate-900 mt-1">
                      {current.label}
                    </h4>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-500 font-mono font-bold block mb-0.5">Strength / Contribution:</span>
                        <p className="text-slate-700">{current.pros}</p>
                      </div>

                      <div className={`p-3 rounded-xl border ${isOur ? 'bg-white border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                        <span className={`font-mono font-bold block mb-0.5 ${isOur ? 'text-emerald-700' : 'text-red-700'}`}>
                          {isOur ? 'Novelty & Sweet Spot:' : 'Critical Research Gap:'}
                        </span>
                        <p className="text-slate-700 leading-relaxed">{current.gap}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono">Slide 3 &amp; 4 Defense</span>
                      <span className="text-emerald-700 font-bold font-mono">SIH 2026</span>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
