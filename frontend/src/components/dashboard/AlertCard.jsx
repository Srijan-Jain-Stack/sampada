import React from 'react';
import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { useGreenhouse } from '../../context/GreenhouseContext';

export default function AlertCard({ alert }) {
  const { dismissAlert } = useGreenhouse();

  const isWarning = alert.severity === 'WARNING';
  const isCritical = alert.severity === 'CRITICAL';

  const style = isCritical ? {
    bg: 'bg-rose-50 border-rose-300 text-rose-900',
    icon: AlertCircle,
    iconColor: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-800'
  } : isWarning ? {
    bg: 'bg-amber-50 border-amber-300 text-amber-900',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-800'
  } : {
    bg: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: Info,
    iconColor: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-800'
  };

  const Icon = style.icon;

  return (
    <div className={`p-4 rounded-xl border ${style.bg} flex items-start justify-between gap-3 shadow-2xs transition-all`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs">{alert.title}</span>
            <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${style.badge}`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-normal">
            {alert.message}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-mono text-slate-700">
          {alert.timestamp}
        </span>
        <button
          onClick={() => dismissAlert(alert.id)}
          className="p-1 rounded-md text-slate-700 hover:text-slate-900 hover:bg-black/5"
          title="Dismiss Alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
