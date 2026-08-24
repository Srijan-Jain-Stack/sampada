import React, { useState } from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import MetricCard from '../components/dashboard/MetricCard';
import ZoneCard from '../components/dashboard/ZoneCard';
import DecisionCard from '../components/dashboard/DecisionCard';
import ResourceCard from '../components/dashboard/ResourceCard';
import AlertCard from '../components/dashboard/AlertCard';
import AgentNegotiation from '../components/agents/AgentNegotiation';
import WeatherCard from '../components/intelligence/WeatherCard';
import SensorValidation from '../components/intelligence/SensorValidation';
import FarmerDashboard from '../components/farmer/FarmerDashboard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OverviewPage() {
  const { 
    isFarmerView, 
    metrics, 
    zones, 
    decision, 
    resources, 
    alerts, 
    liveEvents, 
    isLoading 
  } = useGreenhouse();
  const navigate = useNavigate();

  const [intelTab, setIntelTab] = useState('weather'); // 'weather' | 'sensors'

  if (isLoading) {
    return (
      <PageContainer title="Greenhouse Overview">
        <SkeletonLoader count={3} type="metrics" />
        <SkeletonLoader count={3} type="card" />
      </PageContainer>
    );
  }

  // Farmer Mode
  if (isFarmerView) {
    return (
      <PageContainer
        farmerTitle="Greenhouse Dashboard"
        farmerSubtitle="Real-time crop monitoring and automated scheduling"
      >
        <FarmerDashboard />
      </PageContainer>
    );
  }

  // Technical Mode
  return (
    <PageContainer
      title="Greenhouse Overview"
      subtitle="Multi-agent negotiation and dynamic resource scheduling"
    >
      <div className="space-y-6">
        
        {/* 1. Top 5 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <MetricCard
            title="Crop Health"
            value={metrics.cropHealth?.value}
            unit={metrics.cropHealth?.unit}
            status={metrics.cropHealth?.status}
            subtext="3 Zones Monitored"
          />
          <MetricCard
            title="Water Tank"
            value={metrics.waterAvailability?.value}
            unit={metrics.waterAvailability?.unit}
            status={metrics.waterAvailability?.status}
            subtext={`${resources.water?.availableLiters}L Available`}
          />
          <MetricCard
            title="Battery SOC"
            value={metrics.batteryLevel?.value}
            unit={metrics.batteryLevel?.unit}
            status={metrics.batteryLevel?.status}
            subtext="48.2V Stable"
          />
          <MetricCard
            title="Solar Array"
            value={metrics.solarGeneration?.value}
            unit={metrics.solarGeneration?.unit}
            status={metrics.solarGeneration?.status}
            subtext="Generating"
          />
          <MetricCard
            title="Safety Gate"
            value={metrics.safetyStatus?.value}
            unit=""
            status={metrics.safetyStatus?.status}
            subtext={`${(metrics.safetyStatus?.totalChecks || 0) - (metrics.safetyStatus?.failedChecks || 0)}/${metrics.safetyStatus?.totalChecks || 0} Passed`}
          />
        </div>

        {/* 2. 3 Zones Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Greenhouse Zones
            </h2>
            <button
              onClick={() => navigate('/zones')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        </div>

        {/* 3. Agent Negotiation (Centerpiece) */}
        <div className="card-clean p-5 space-y-4">
          <AgentNegotiation />
        </div>

        {/* 4. Decision & Resources Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7">
            <DecisionCard />
          </div>
          <div className="lg:col-span-5">
            <ResourceCard resources={resources} />
          </div>
        </div>

        {/* 5. Weather Intelligence & Sensor Fusion Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <WeatherCard />
          <SensorValidation />
        </div>

        {/* 6. Alerts & Live Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Alerts */}
          <div className="card-clean p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                System Alerts ({alerts.length})
              </h3>
              <span className="text-[10px] font-semibold text-slate-700">Live</span>
            </div>

            {alerts.length === 0 ? (
              <p className="text-xs text-slate-700 py-3 text-center">
                ✓ No active alerts. System healthy.
              </p>
            ) : (
              <div className="space-y-2">
                {alerts.map((alt) => (
                  <AlertCard key={alt.id} alert={alt} />
                ))}
              </div>
            )}
          </div>

          {/* Live Events */}
          <div className="card-clean p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recent Event Stream
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                WebSocket Connected
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {liveEvents.slice(0, 6).map((evt) => (
                <div 
                  key={evt.id} 
                  className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-800 font-medium truncate flex-1 pr-2">
                    {evt.text}
                  </span>
                  <span className="text-[10px] font-mono text-slate-700 shrink-0">
                    {evt.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
