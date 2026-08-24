import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { 
  Sprout, 
  Droplets, 
  BatteryMedium, 
  Sun, 
  ShieldCheck, 
  Sparkles,
  CloudSun,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FarmerDashboard() {
  const { 
    metrics, 
    zones, 
    decision, 
    resources, 
    weather 
  } = useGreenhouse();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      
      {/* 1. Main Current Action Card with "Why?" */}
      <div className="card-clean p-6 space-y-4 border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Current Greenhouse Action
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {decision.farmerExplanation?.actionHeadline || `💧 ${decision.selectedAction}`}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
              {decision.farmerExplanation?.durationText || `Duration: ${decision.duration}`}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
              ✓ Safe
            </span>
          </div>
        </div>

        {/* Why Box */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Why is this action happening?
          </span>
          <p className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/70 font-medium">
            {decision.farmerExplanation?.whyText || decision.reason}
          </p>
        </div>

        {/* Safety Note */}
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{decision.farmerExplanation?.safetyText || 'Safety checks passed — Plenty of water and battery power.'}</span>
        </div>
      </div>

      {/* 2. 4 Vital Farm Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card-clean p-4">
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
            <span>Crop Health</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{metrics.cropHealth?.value}%</p>
          <span className="text-[11px] text-emerald-700 font-semibold">Healthy Growth</span>
        </div>

        <div className="card-clean p-4">
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
            <span>Water Tank</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{resources.water?.percentage}%</p>
          <span className="text-[11px] text-blue-700 font-semibold">{resources.water?.availableLiters} Liters</span>
        </div>

        <div className="card-clean p-4">
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
            <span>Solar Power</span>
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{resources.energy?.solarGenerationKw} kW</p>
          <span className="text-[11px] text-amber-700 font-semibold">Generating Free</span>
        </div>

        <div className="card-clean p-4">
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
            <span>Battery</span>
            <BatteryMedium className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{resources.battery?.socPercentage}%</p>
          <span className="text-[11px] text-teal-700 font-semibold">~{resources.battery?.estimatedRuntimeHours} hrs Backup</span>
        </div>
      </div>

      {/* 3. 3 Simple Zone Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Greenhouse Crops & Zones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {zones.map((zone) => {
            const isNeedWater = zone.soilMoisture < 40;
            return (
              <div
                key={zone.id}
                onClick={() => navigate(`/zones/${zone.id}`)}
                className="card-clean card-clean-hover p-4 cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-700 block">ZONE 0{zone.numericId}</span>
                    <h4 className="text-base font-bold text-slate-900">{zone.crop}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isNeedWater ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isNeedWater ? 'Watering' : 'Healthy'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg text-slate-700 font-medium">
                  <div>Temp: <strong className="text-slate-900">{zone.temperature}°C</strong></div>
                  <div>Moisture: <strong className="text-slate-900">{zone.soilMoisture}%</strong></div>
                </div>

                <div className="text-xs text-slate-700 flex items-center justify-between pt-1">
                  <span className="truncate">{zone.currentAction}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Weather Note */}
      <div className="card-clean p-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <CloudSun className="w-5 h-5 text-blue-600 shrink-0" />
          <span className="text-slate-700 font-medium">
            Weather: <strong>{weather.condition} ({weather.temperature}°C)</strong> — Rain chance {weather.rainProbability}%.
          </span>
        </div>
        <span className="text-slate-700 font-semibold shrink-0">
          {weather.irrigationSuppressed ? 'Watering paused for rain' : 'Normal scheduling'}
        </span>
      </div>

    </div>
  );
}
