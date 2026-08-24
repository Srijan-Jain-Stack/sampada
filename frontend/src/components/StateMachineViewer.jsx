import React, { useState } from 'react';
import { Shield, ArrowRight, AlertTriangle, CheckCircle, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { stateMachineData } from '../data/projectData';

export default function StateMachineViewer() {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const activeState = stateMachineData[selectedStateIndex];

  return (
    <section id="state-machine" className="py-20 bg-[#f7faf8] border-t border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            DIFFERENTIATOR 1 · RESILIENT ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Graceful Degradation State Machine
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            When water tanks deplete or solar power fades, the system doesn't crash or fail blindly — it steps down through 4 deterministic stages.
          </p>
        </div>

        {/* 4 Horizontal State Progression Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stateMachineData.map((item, idx) => {
            const isSelected = selectedStateIndex === idx;
            const stateColors = {
              Normal: "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-md",
              Conservative: "bg-amber-50 border-amber-400 text-amber-800 shadow-md",
              Critical: "bg-orange-50 border-orange-400 text-orange-800 shadow-md",
              Emergency: "bg-red-50 border-red-400 text-red-800 shadow-md"
            };

            return (
              <button
                key={item.state}
                onClick={() => setSelectedStateIndex(idx)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected 
                    ? `${stateColors[item.state]} ring-2 ring-emerald-300 scale-[1.02]` 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-current shadow-2xs">
                    STAGE 0{idx + 1}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-current' : 'bg-slate-300'}`}></span>
                </div>

                <div className="text-lg font-display font-bold text-slate-900 tracking-tight">
                  {item.state} State
                </div>
                <div className="text-xs font-mono mt-1 text-slate-600">
                  {item.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed State Inspector Panel */}
        <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Active Protocol Analysis
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                {activeState.state} Protocol
              </h3>
              <p className="text-xs font-mono text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                Safety Envelope: <strong>{activeState.safetyStatus}</strong>
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block mb-1">
                  ⚡ Trigger Condition
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeState.trigger}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  🤖 Autonomous Behavior
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeState.behavior}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
