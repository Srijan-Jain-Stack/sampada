import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { Activity, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AgentStatus() {
  const { agents } = useGreenhouse();

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Agent Coordination Health Matrix
        </h4>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
          All Nodes Online
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-base">{agent.icon}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900 truncate">
                {agent.name}
              </p>
              <p className="text-[10px] text-slate-700 font-medium">
                Bid: <strong className="text-emerald-700">{agent.bid}</strong> ({agent.confidence}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
