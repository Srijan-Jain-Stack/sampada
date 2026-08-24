import React from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import ZoneCard from '../components/dashboard/ZoneCard';
import { Sprout, Layers, Activity, Thermometer, Droplets, Wind, Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ZonesPage() {
  const { zones, isFarmerView } = useGreenhouse();
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Greenhouse Micro-Climate Zones"
      subtitle="Spatial multi-zone monitoring, crop phenology stages & targeted actuator dispatch"
      farmerTitle="Greenhouse Crops & Zones"
      farmerSubtitle="Check crop health and moisture levels across all 3 greenhouse zones"
    >
      <div className="space-y-8">
        
        {/* 1. Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
        </div>

        {/* 2. Technical Zone Comparison Matrix */}
        {!isFarmerView && (
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Multi-Zone Sensor Cross-Comparison Matrix
                </h3>
                <p className="text-xs text-slate-700 font-medium">
                  Real-time environmental parameters across all 3 protected polyhouse bays
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                3 Nodes Synchronized
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3">Zone / Crop</th>
                    <th className="p-3">Growth Stage</th>
                    <th className="p-3">Temp (°C)</th>
                    <th className="p-3">Humidity (%)</th>
                    <th className="p-3">Soil Moisture (%)</th>
                    <th className="p-3">Crop Stress</th>
                    <th className="p-3">Water Need</th>
                    <th className="p-3">Current Action</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {zones.map((z) => (
                    <tr key={z.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3 font-bold text-slate-900">
                        {z.name}
                      </td>
                      <td className="p-3 text-slate-700">
                        {z.stage}
                      </td>
                      <td className="p-3">
                        <span className="font-bold">{z.temperature}°C</span>
                        <span className="text-[10px] text-slate-700 block">Target: {z.tempTarget}°C</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold">{z.humidity}%</span>
                        <span className="text-[10px] text-slate-700 block">Target: {z.humidityTarget}%</span>
                      </td>
                      <td className="p-3">
                        <span className={`font-bold ${z.soilMoisture < 40 ? 'text-amber-800' : 'text-slate-900'}`}>
                          {z.soilMoisture}%
                        </span>
                        <span className="text-[10px] text-slate-700 block">Target: {z.soilMoistureTarget}%</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          z.cropStress === 'HIGH' ? 'bg-amber-100 text-amber-900' :
                          z.cropStress === 'MODERATE' ? 'bg-blue-100 text-blue-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {z.cropStress} ({(z.cropStressScore * 100).toFixed(0)}%)
                        </span>
                      </td>
                      <td className="p-3 font-bold text-blue-700">
                        {z.waterDemand} Liters
                      </td>
                      <td className="p-3 text-emerald-800 font-semibold">
                        {z.currentAction}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => navigate(`/zones/${z.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold transition-all cursor-pointer"
                        >
                          View →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </PageContainer>
  );
}
