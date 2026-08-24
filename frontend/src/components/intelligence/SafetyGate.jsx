import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Droplets, 
  BatteryMedium, 
  Sun,
  Activity,
  Layers
} from 'lucide-react';

const stateDetails = {
  NORMAL: {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    color: 'emerald',
    icon: ShieldCheck,
    title: '🟢 NORMAL STATE',
    desc: 'All reserves ample. Full optimization across all 3 zones with zero throttles.'
  },
  CONSERVATIVE: {
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    color: 'amber',
    icon: AlertTriangle,
    title: '🟡 CONSERVATIVE STATE',
    desc: 'Marginal power or water reserves. Heavy climate cooling throttled; critical crop hydration maintained.'
  },
  CRITICAL: {
    badge: 'bg-orange-100 text-orange-900 border-orange-300',
    color: 'orange',
    icon: ShieldAlert,
    title: '🟠 CRITICAL STATE',
    desc: 'Power deficit. Load-shedding active. Only pulse-drip irrigation to vulnerable zones permitted.'
  },
  EMERGENCY: {
    badge: 'bg-rose-100 text-rose-900 border-rose-300',
    color: 'rose',
    icon: ShieldAlert,
    title: '🔴 EMERGENCY STATE',
    desc: 'Under-voltage / Tank empty lock. All high-power actuators isolated to prevent equipment damage.'
  }
};

export default function SafetyGate() {
  const { safetyState, resources } = useGreenhouse();
  const currentMode = safetyState.mode || 'NORMAL';
  const stateMeta = stateDetails[currentMode] || stateDetails.NORMAL;
  const StateIcon = stateMeta.icon;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
              System Resource State & Safety Gate
            </h4>
            <p className="text-[11px] text-slate-700 font-medium">
              Graceful Degradation State Machine & Hard Envelope
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${stateMeta.badge}`}>
          {stateMeta.title}
        </span>
      </div>

      {/* State Callout Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex items-start gap-3">
          <StateIcon className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="font-extrabold text-sm text-slate-900">
              Active Operational Tier: {currentMode}
            </h5>
            <p className="text-xs text-slate-700 font-medium">
              {stateMeta.desc}
            </p>
          </div>
        </div>

        {/* Action Policy Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
            <span className="text-slate-700 font-medium">Non-essential actions:</span>
            <span className="font-bold text-amber-700">
              {safetyState.nonEssentialActions}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
            <span className="text-slate-700 font-medium">Critical crop actions:</span>
            <span className="font-extrabold text-emerald-700">
              {safetyState.criticalCropActions}
            </span>
          </div>
        </div>
      </div>

      {/* Resource Envelopes Progress Meters */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase font-bold text-slate-700 block">
          Telemetry vs Safety Envelope:
        </span>

        {/* Water */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Droplets className="w-3.5 h-3.5 text-blue-600" /> Water Level
            </span>
            <span className="font-mono text-slate-900">{resources.water?.percentage}% (Safe &gt; 20%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${resources.water?.percentage || 74}%` }}
            />
          </div>
        </div>

        {/* Battery */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <BatteryMedium className="w-3.5 h-3.5 text-amber-600" /> Battery SOC
            </span>
            <span className="font-mono text-slate-900">{resources.battery?.socPercentage}% (Safe &gt; 15%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${resources.battery?.socPercentage || 81}%` }}
            />
          </div>
        </div>

        {/* Solar */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Sun className="w-3.5 h-3.5 text-amber-600" /> Solar PV Yield
            </span>
            <span className="font-mono text-slate-900">{resources.energy?.solarGenerationKw} kW (Peak 5.6 kW)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-yellow-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((resources.energy?.solarGenerationKw || 4.2) / 6.0) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hard Limit Interlocks Table */}
      {safetyState.limits && (
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-700 block">
            4-Point Interlock Envelopes:
          </span>
          <div className="space-y-1 text-xs">
            {safetyState.limits.map((l, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200/50 flex items-center justify-between text-[11px]">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800">{l.name}</span>
                  <span className="text-slate-700 block text-[10px]">Threshold: {l.threshold}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-800">{l.current}</span>
                  <span className="text-emerald-700 font-extrabold text-[10px] block">✓ {l.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
