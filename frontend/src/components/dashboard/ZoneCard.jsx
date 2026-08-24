import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function ZoneCard({ zone }) {
  const navigate = useNavigate();

  const isAttention = zone.cropStress === 'HIGH' || zone.cropStressScore >= 0.7;
  const isModerate = zone.cropStress === 'MODERATE';

  return (
    <div 
      onClick={() => navigate(`/zones/${zone.id}`)}
      className="card-clean card-clean-hover p-4 cursor-pointer flex flex-col justify-between space-y-4"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-700 font-semibold">
                ZONE 0{zone.numericId}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isAttention ? 'bg-amber-100 text-amber-900' :
                isModerate ? 'bg-blue-100 text-blue-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {isAttention ? 'Attention' : isModerate ? 'Moderate' : 'Optimal'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {zone.crop}
            </h3>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-700 uppercase font-semibold block">Temp</span>
            <span className="text-sm font-bold text-slate-900">{zone.temperature}°C</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-700 uppercase font-semibold block">Humidity</span>
            <span className="text-sm font-bold text-slate-900">{zone.humidity}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-700 uppercase font-semibold block">Moisture</span>
            <span className={`text-sm font-bold ${zone.soilMoisture < 40 ? 'text-amber-800' : 'text-slate-900'}`}>
              {zone.soilMoisture}%
            </span>
          </div>
        </div>
      </div>

      {/* Current Action Footer */}
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-800 truncate pr-2">
          {zone.currentAction}
        </span>
        <span className="text-[11px] font-mono text-slate-700 shrink-0">
          {zone.confidence}%
        </span>
      </div>
    </div>
  );
}
