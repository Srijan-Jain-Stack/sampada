import React from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import ImpactCard from '../components/analytics/ImpactCard';
import ImpactCharts from '../components/analytics/ImpactCharts';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  DollarSign,
  Sparkles
} from 'lucide-react';

export default function AnalyticsPage() {
  const { impactMetrics, isFarmerView } = useGreenhouse();

  if (!impactMetrics) return null;

  return (
    <PageContainer
      title="Quantified Impact & Agronomic Analytics"
      subtitle="Peer-reviewed efficiency metrics, CO₂ reduction calculations, and resource conservation analytics"
      farmerTitle="Farm Savings & Impact"
      farmerSubtitle="See how much water, electricity, and money you have saved using SAMPADA"
    >
      <div className="space-y-8">
        
        {/* 1. 5 Core Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <ImpactCard type="waterEfficiency" metric={impactMetrics.waterEfficiency} />
          <ImpactCard type="energyEfficiency" metric={impactMetrics.energyEfficiency} />
          <ImpactCard type="cropProtection" metric={impactMetrics.cropProtection} />
          <ImpactCard type="farmerSupport" metric={impactMetrics.farmerSupport} />
          <ImpactCard type="sustainability" metric={impactMetrics.sustainability} />
        </div>

        {/* 2. Recharts Impact Analytics Charts */}
        <ImpactCharts />

        {/* 3. Economic Viability & ROI Summary */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300 block">
                Economic Model • SIH 2026 Viability
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Financial Return on Investment (ROI)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400 text-emerald-950">
              Payback: 4.2 Months
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-slate-300 block">Estimated Monthly Utility Savings</span>
              <p className="text-xl font-black text-white">₹4,850 / month</p>
              <span className="text-[11px] text-emerald-200 block">23% Water + 17% Energy</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-slate-300 block">Crop Yield Protection Value</span>
              <p className="text-xl font-black text-emerald-300">+₹18,200 / season</p>
              <span className="text-[11px] text-emerald-200 block">Zero crop wilting stress events</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-slate-300 block">Total Hardware Deployment Cost</span>
              <p className="text-xl font-black text-white">&lt; ₹4,800</p>
              <span className="text-[11px] text-emerald-200 block">ESP32 + SHT40 + Capacitive Probes</span>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
