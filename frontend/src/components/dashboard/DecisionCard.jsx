import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function DecisionCard({ decisionData }) {
  const { decision: defaultDecision, isFarmerView } = useGreenhouse();
  const decision = decisionData || defaultDecision;

  if (!decision) return null;

  return (
    <div className="card-clean p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {isFarmerView ? 'Recommended Action' : 'Coordinator Decision'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-700">
            {decision.timestamp || 'Synchronized'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            ✓ Approved
          </span>
        </div>
      </div>

      {/* Main Action Spotlight */}
      <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">
            Approved Schedule
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            {decision.selectedAction}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Target: <strong>{decision.zone}</strong> • Duration: <strong>{decision.duration}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-2.5 py-1 rounded-lg bg-white border border-emerald-100 text-center">
            <span className="text-[10px] uppercase text-slate-700 block font-semibold">Confidence</span>
            <span className="text-xs font-bold text-emerald-700">{decision.confidence}%</span>
          </div>
          {!isFarmerView && (
            <div className="px-2.5 py-1 rounded-lg bg-white border border-emerald-100 text-center">
              <span className="text-[10px] uppercase text-slate-700 block font-semibold">Priority</span>
              <span className="text-xs font-bold text-slate-800">{decision.priority}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reason Box */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-slate-700 uppercase">
          {isFarmerView ? 'Why was this chosen?' : 'Coordinator Rationale'}
        </span>
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
          {isFarmerView && decision.farmerExplanation
            ? decision.farmerExplanation.whyText
            : decision.reason}
        </p>
      </div>

      {/* Minimal Safety Check List */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Safety Gate:
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Water Limit
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Power Budget
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Weather Check
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Safe Pressure
        </span>
      </div>
    </div>
  );
}
