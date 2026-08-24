import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AgentCard({ agent, isWinner = false }) {
  const isWinning = isWinner || agent.status === 'WINNING' || agent.status === 'WON';

  return (
    <div className={`card-clean card-clean-hover p-4 flex flex-col justify-between space-y-3 relative ${
      isWinning ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/20' : ''
    }`}>
      
      {/* Winner Spotlight Tag */}
      {isWinning && (
        <span className="absolute top-2.5 right-2.5 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
          <Sparkles className="w-2.5 h-2.5" /> Winning
        </span>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl">{agent.icon}</span>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-900">
              {agent.name}
            </h4>
            <p className="text-[11px] text-slate-700 font-medium">
              {agent.targetZone}
            </p>
          </div>
        </div>

        {/* 2 Key Stats */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-700 uppercase font-semibold block">{agent.metricLabel}</span>
            <span className="font-bold text-slate-900 text-sm">{agent.metricValue}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-700 uppercase font-semibold block">Agent Bid</span>
            <span className="font-bold text-emerald-700 text-sm">{agent.bid}</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
        <span className="text-[10px] uppercase font-semibold text-slate-700 block">Proposed Action</span>
        <p className="font-bold text-slate-900 truncate mt-0.5">
          {agent.action}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
        <span>Conf: <strong className="text-slate-700">{agent.confidence}%</strong></span>
        <span className="font-mono text-[10px] text-slate-700">{agent.status}</span>
      </div>

    </div>
  );
}
