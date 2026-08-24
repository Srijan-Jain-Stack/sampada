import React from 'react';
import { 
  Droplets, 
  Zap, 
  ShieldCheck, 
  HeartHandshake, 
  Leaf, 
  TrendingUp 
} from 'lucide-react';

const impactIcons = {
  waterEfficiency: Droplets,
  energyEfficiency: Zap,
  cropProtection: ShieldCheck,
  farmerSupport: HeartHandshake,
  sustainability: Leaf
};

const impactColors = {
  waterEfficiency: {
    bg: 'bg-blue-50 text-blue-700',
    border: 'border-blue-200',
    stat: 'text-blue-700',
    pill: 'bg-blue-100 text-blue-800'
  },
  energyEfficiency: {
    bg: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
    stat: 'text-amber-700',
    pill: 'bg-amber-100 text-amber-900'
  },
  cropProtection: {
    bg: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-200',
    stat: 'text-emerald-700',
    pill: 'bg-emerald-100 text-emerald-800'
  },
  farmerSupport: {
    bg: 'bg-teal-50 text-teal-700',
    border: 'border-teal-200',
    stat: 'text-teal-700',
    pill: 'bg-teal-100 text-teal-800'
  },
  sustainability: {
    bg: 'bg-emerald-50 text-emerald-800',
    border: 'border-emerald-300',
    stat: 'text-emerald-800',
    pill: 'bg-emerald-100 text-emerald-800'
  }
};

export default function ImpactCard({ type, metric }) {
  if (!metric) return null;

  const Icon = impactIcons[type] || Leaf;
  const style = impactColors[type] || impactColors.sustainability;

  return (
    <div className={`p-5 rounded-2xl bg-white border ${style.border} shadow-xs hover:shadow-md transition-all space-y-3`}>
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${style.pill}`}>
          SIH Verified
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-black ${style.stat}`}>
            {metric.percentage ? `${metric.percentage}%` : metric.count}
          </span>
          <span className="text-xs font-bold text-slate-700 ml-1">
            {metric.label}
          </span>
        </div>
        <p className="text-xs text-slate-700 font-medium mt-1">
          {metric.subtext}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700 font-medium">
        <span>Trend:</span>
        <span className="font-bold text-slate-800">{metric.trend}</span>
      </div>
    </div>
  );
}
