import React from 'react';
import { Droplets, BatteryMedium, Sun } from 'lucide-react';

export default function ResourceCard({ resources }) {
  if (!resources) return null;
  const { water, battery, energy } = resources;

  return (
    <div className="card-clean p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Resource Reserves
        </h3>
        <span className="text-[10px] font-semibold text-slate-700">
          Optimal State
        </span>
      </div>

      <div className="space-y-4">
        {/* Water */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Water Reservoir
            </span>
            <span className="font-bold text-slate-900">
              {water.percentage}% ({water.availableLiters}L)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${water.percentage}%` }}
            />
          </div>
        </div>

        {/* Battery */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <BatteryMedium className="w-3.5 h-3.5 text-amber-600" />
              LiFePO4 Battery
            </span>
            <span className="font-bold text-slate-900">
              {battery.socPercentage}% ({battery.voltage}V)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${battery.socPercentage}%` }}
            />
          </div>
        </div>

        {/* Solar */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-slate-700">Solar PV Output</span>
          </div>
          <span className="font-bold text-slate-900">
            {energy.solarGenerationKw} kW
          </span>
        </div>
      </div>
    </div>
  );
}
