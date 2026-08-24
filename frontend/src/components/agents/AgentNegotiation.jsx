import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import AgentCard from './AgentCard';
import { ArrowRight, Bot, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AgentNegotiation() {
  const { agents, decision } = useGreenhouse();
  const safetyApproved = decision?.safetyCheck?.status === 'APPROVED';

  return (
    <div className="space-y-6">
      
      {/* 1. 4 Specialized Agents Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Specialized Micro-Climate Agents
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Autonomous agents evaluating plant stress, water need, and power constraints
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              isWinner={decision?.winningAgent === agent.name}
            />
          ))}
        </div>
      </div>

      {/* 2. 3-Step Arbitration & Execution Pipeline */}
      <div>
        <div className="mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Decision & Safety Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          
          {/* Step A: Coordinator Arbitration */}
          <div className="card-clean p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Bot className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase text-slate-900">
                  Coordinator Agent
                </h4>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Evaluates competing bids to maximize total crop yield under water & solar limits.
              </p>
              
              <div className="space-y-1 text-xs pt-1">
                {decision.competingBids?.map((cb, idx) => (
                  <div 
                    key={idx}
                    className={`px-2 py-1 rounded-md flex items-center justify-between text-[11px] ${
                      cb.status === 'WON' 
                        ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200' 
                        : 'text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{cb.agent}</span>
                    <span className="font-mono">{cb.bid}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-slate-700 font-semibold pt-2 border-t border-slate-100">
              Arbitration: Dynamic Greedy Utility
            </span>
          </div>

          {/* Step B: Safety Gate */}
          <div className="card-clean p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase text-slate-900">
                  Safety Gate
                </h4>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Deterministic filter ensuring hard physical limits and weather rules are respected.
              </p>

              <div className="space-y-1 text-xs pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-700 py-0.5">
                  <span>Tank Water Limit</span>
                  <span className={safetyApproved ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{safetyApproved ? '✓ Pass' : 'Review'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-700 py-0.5">
                  <span>Battery Cut-off Buffer</span>
                  <span className={safetyApproved ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{safetyApproved ? '✓ Pass' : 'Review'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-700 py-0.5">
                  <span>Rain Suppression Check</span>
                  <span className={safetyApproved ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{safetyApproved ? '✓ Pass' : 'Review'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-700 py-0.5">
                  <span>Actuator Thermal Safe</span>
                  <span className={safetyApproved ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{safetyApproved ? '✓ Pass' : 'Review'}</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-slate-700 font-semibold pt-2 border-t border-slate-100">
              Status: {safetyApproved ? 'Approved by Safety Gate' : 'Restricted by Safety Gate'}
            </span>
          </div>

          {/* Step C: Final Actuator Output */}
          <div className="card-clean p-4 space-y-3 flex flex-col justify-between bg-slate-900 text-white border-slate-900">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase text-white">
                    Final Action
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-400">
                  {safetyApproved ? 'Dispatched' : 'Held'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected</span>
                <p className="text-sm font-extrabold text-white">
                  {decision.selectedAction}
                </p>
                <p className="text-xs text-slate-300">
                  {decision.zone} • {decision.duration}
                </p>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Winning Agent:</span>
                  <strong className="text-white">{decision.winningAgent}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <strong className="text-emerald-400">{decision.confidence}%</strong>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Hardware: Solenoid Valve #02 ON
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
