import React from 'react';

export default function MetricCard({
  title,
  value,
  unit,
  status,
  subtext
}) {
  return (
    <div className="card-clean p-4 space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
        {title}
      </p>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-slate-700">{unit}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
        <span className="font-semibold text-emerald-700">
          {status}
        </span>
        {subtext && (
          <span className="text-[11px] text-slate-700 truncate max-w-[120px]">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
