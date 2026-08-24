import React, { useState } from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import ScarcityChart from '../components/intelligence/ScarcityChart';
import { 
  Droplets, 
  BatteryCharging, 
  Sun, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

export default function ResourcesPage() {
  const { resources, isFarmerView } = useGreenhouse();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'water' | 'battery' | 'energy'

  if (!resources) return null;
  const { water, battery, energy } = resources;

  return (
    <PageContainer
      title="Dynamic Resource Scheduling & Storage"
      subtitle="Real-time multi-agent hydraulic budgeting, battery State-of-Charge (SOC) management, and solar predictive scarcity curves"
      farmerTitle="Water & Energy Resources"
      farmerSubtitle="Check remaining water tank capacity, solar electricity generation, and battery backup"
    >
      <div className="space-y-8">
        
        {/* 1. Top 3 Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Water Tank */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Water Reservoir</h3>
                  <p className="text-[11px] text-slate-700 font-medium">Main 2,000L Underground Tank</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                {water.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">{water.percentage}%</span>
                <span className="text-xs font-bold text-slate-700">{water.availableLiters} / {water.totalCapacityLiters} Liters</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${water.percentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Hourly Demand</span>
                <span className="font-bold text-slate-900">{water.currentDemandLitersPerHour} L/hr</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Rain Harvest Buffer</span>
                <span className="font-bold text-blue-700">+{water.rainHarvestReserveLiters} L</span>
              </div>
            </div>
          </div>

          {/* Battery Storage */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">LiFePO4 Battery</h3>
                  <p className="text-[11px] text-slate-700 font-medium">48V 100Ah Storage Bank</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {battery.socPercentage}% SOC
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">{battery.socPercentage}%</span>
                <span className="text-xs font-bold text-slate-700">{battery.voltage} Volts</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${battery.socPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Power Demand</span>
                <span className="font-bold text-slate-900">{battery.powerDemandWatts} Watts</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Estimated Runtime</span>
                <span className="font-bold text-emerald-700">~{battery.estimatedRuntimeHours} hrs</span>
              </div>
            </div>
          </div>

          {/* Solar Energy & Scarcity */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Solar & Scarcity</h3>
                  <p className="text-[11px] text-slate-700 font-medium">6.0 kW Rooftop Monocrystalline PV</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {energy.scarcityTier} Scarcity
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">{energy.solarGenerationKw} kW</span>
                <span className="text-xs font-bold text-slate-700">Peak: {energy.peakSolarTodayKw} kW</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div 
                  className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (energy.solarGenerationKw / 6.0) * 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Daily PV Yield</span>
                <span className="font-bold text-slate-900">{energy.totalDailySolarKwh} kWh</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 block text-[10px]">Grid Import</span>
                <span className="font-bold text-emerald-700">0.0 kW (Zero Grid)</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Recharts Predictive Scarcity & Hourly Consumption Curves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Energy Scarcity Curve */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                24-Hour Solar PV vs Power Demand Curves
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Scarcity index peaks during cloudy spells and evening hours
              </p>
            </div>
            <ScarcityChart data={energy.chartData} type="energy" />
          </div>

          {/* Water Reservoir Consumption Curve */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Water Tank Reservoir Level & Pulse Consumption (L)
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Autonomous schedule ensures tank never breaches the 20% safety cut-off
              </p>
            </div>
            <ScarcityChart data={water.chartData} type="water" />
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
