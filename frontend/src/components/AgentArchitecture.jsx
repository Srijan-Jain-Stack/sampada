import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Wind, 
  BatteryCharging, 
  Cpu, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Layers,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';
import { agentsData, projectMeta } from '../data/projectData';

const iconMap = {
  Sprout: Sprout,
  Droplets: Droplets,
  Wind: Wind,
  BatteryCharging: BatteryCharging,
  Cpu: Cpu
};

export default function AgentArchitecture() {
  const [activeAgentId, setActiveAgentId] = useState('coordinator');
  const selectedAgent = agentsData.find(a => a.id === activeAgentId) || agentsData[4];

  return (
    <section id="agents" className="py-20 bg-white border-t border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Five Cooperating Agents, One Negotiation Loop
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Every control cycle, four specialized edge agents compute situational urgency scores and submit bids to the central Coordinator.
            </p>
          </div>

          {/* Catchphrase Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900 flex items-center gap-2 font-medium">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>"Five agents, one negotiation, every cycle."</span>
          </div>
        </div>

        {/* Pull Quote Callout Box */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">Core Design Principle</span>
              <blockquote className="text-lg sm:text-xl font-display font-bold text-slate-900 mt-1 leading-snug">
                "{projectMeta.corePrinciple}"
              </blockquote>
              <p className="text-xs text-slate-600 mt-2 font-mono">
                Hard-coded agronomic bounds prevent over-irrigation, root suffocation, or battery deep discharge under all circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {agentsData.map((agent) => {
            const Icon = iconMap[agent.iconName] || Cpu;
            const isSelected = activeAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected 
                    ? 'bg-emerald-50 border-emerald-400 shadow-md scale-[1.02]' 
                    : 'bg-slate-50/70 border-slate-200 hover:border-emerald-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-300'}`}></span>
                </div>

                <div className="text-sm font-display font-bold text-slate-900 truncate">{agent.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">{agent.tagline.split('&')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Inspector for Selected Agent */}
        <div className="rounded-3xl bg-[#f7faf8] border border-emerald-100 p-6 sm:p-8 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Overview & Sensory Inputs */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  {React.createElement(iconMap[selectedAgent.iconName] || Cpu, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">{selectedAgent.name}</h3>
                  <p className="text-xs font-mono text-emerald-700 font-semibold">{selectedAgent.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedAgent.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  Sensory Inputs &amp; Telemetry Feed
                </h4>
                <div className="space-y-2">
                  {selectedAgent.inputs.map((inp, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 shadow-sm">
                      <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-[10px]">
                        0{idx+1}
                      </span>
                      <span>{inp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Bidding Formula & Actuator Target */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Formula Card */}
              <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Code2 className="w-4 h-4" />
                    Urgency Bidding Algorithm
                  </span>
                  <span className="font-semibold text-slate-600">Edge Bounded</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{selectedAgent.biddingFormula}</code>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 font-mono">
                  Generates an urgency coefficient in [0.00, 1.00] with contextual rationale payload.
                </p>
              </div>

              {/* Actuation Target Card */}
              <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                    <Terminal className="w-4 h-4" />
                    Actuation / Target Relays
                  </span>
                  <span className="font-semibold text-slate-600">PWM / Solenoids</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">
                  {selectedAgent.actionTarget}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
