import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Wind, 
  BatteryCharging, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Zap,
  Layers,
  BarChart3
} from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ lang, onScrollToSection }) {
  const t = translations[lang]?.hero || translations.en.hero;
  const [activeZone, setActiveZone] = useState(1);

  const zones = [
    { id: 1, crop: "Tomatoes (Polyhouse A)", moisture: "24.5%", stress: "Medium Stress", vpd: "1.24 kPa", status: "Bidding 0.72", color: "emerald" },
    { id: 2, crop: "Capsicum (Polyhouse B)", moisture: "52.0%", stress: "Optimal", vpd: "0.95 kPa", status: "Resting", color: "teal" },
    { id: 3, crop: "Cucumber (Polyhouse C)", moisture: "19.8%", stress: "High Wilting", vpd: "1.58 kPa", status: "Bidding 0.89", color: "amber" }
  ];

  return (
    <section id="overview" className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden flex items-center bg-[#f7faf8]">
      {/* Background ambient lighting effects for light theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/60 via-teal-50/50 to-lime-50/40 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Tag & SIH Hook */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>{t.badge}</span>
            <span className="text-emerald-300">|</span>
            <span className="text-slate-600 font-medium">Dynamic Resource Scheduling</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-800 bg-white px-3.5 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>5 AGENTS · CONTEXTUAL BANDIT · SUB-₹5K HARDWARE</span>
          </div>
        </div>

        {/* Grid Layout: Editorial Text + Interactive 3-Zone Cross-Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.12]">
              <span className="text-slate-900">Autonomous Polyhouses Powered by </span>
              <span className="text-gradient-emerald">Multi-Agent Resource Arbitration</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              {t.subline}
            </p>

            {/* Core Novelty Callout Pill */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider font-mono">
                <Zap className="w-4 h-4 text-emerald-600" />
                The Core Paradigm Shift
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Traditional greenhouses fail because irrigation timers, climate fans, and solar batteries operate in disconnected silos. Our system uses a <strong className="text-emerald-800 font-semibold">LinUCB Contextual Bandit auctioneer</strong> to arbitrate competing bids with <strong className="text-emerald-800 font-semibold">immutable safety guardrails</strong>.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onScrollToSection('simulator')}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>{t.ctaSimulate}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollToSection('agents')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 hover:text-emerald-700 border border-emerald-200 transition-all shadow-sm"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{t.ctaArchitecture}</span>
              </button>
            </div>

            {/* Micro Highlights Badges */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>+10.15% Yield (AAAI 2022 Proven)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Open-Meteo Rain Suppression</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Privacy-Preserving MQTT Commons</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Multi-Agent Greenhouse Visualizer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white border border-emerald-100 p-6 shadow-xl shadow-emerald-900/5">
              
              {/* Visualizer Header */}
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">Live Multi-Zone Visualizer</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                  Cycle #4298
                </span>
              </div>

              {/* Central Coordinator Node Hexagon */}
              <div className="relative my-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-emerald-600 p-[2px] shadow-md shadow-orange-500/10">
                  <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center text-center p-1">
                    <Cpu className="w-6 h-6 text-amber-600" />
                    <span className="text-[10px] font-bold text-slate-900 tracking-tight uppercase mt-0.5">Coordinator</span>
                    <span className="text-[8px] font-mono text-emerald-700 font-bold">LinUCB</span>
                  </div>
                </div>

                {/* Flow Direction Text */}
                <div className="w-full flex justify-around my-2 text-[10px] font-mono text-emerald-800 font-medium">
                  <span className="flex items-center gap-1">↑ Bids</span>
                  <span className="text-amber-700 font-semibold">⚡ Arbitrating</span>
                  <span className="flex items-center gap-1">↓ Dispatch</span>
                </div>
              </div>

              {/* 3 Zone Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                {zones.map((zone) => {
                  const isSelected = activeZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setActiveZone(zone.id)}
                      className={`cursor-pointer rounded-xl p-2.5 transition-all text-left border ${
                        isSelected 
                          ? 'bg-emerald-50/80 border-emerald-400 shadow-sm scale-[1.02]' 
                          : 'bg-slate-50 border-slate-200 hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-700">Zone {zone.id}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-900 truncate">{zone.crop.split(' ')[0]}</div>
                      
                      <div className="mt-2 space-y-1 text-[10px] font-mono">
                        <div className="flex justify-between text-slate-500">
                          <span>Moist:</span>
                          <span className={zone.moisture.startsWith('19') ? 'text-amber-600 font-bold' : 'text-emerald-700 font-semibold'}>{zone.moisture}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>VPD:</span>
                          <span className="text-slate-800 font-medium">{zone.vpd}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-200 text-[9px] font-mono text-center">
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${
                          zone.status.includes('0.89') 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : zone.status.includes('0.72')
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {zone.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Agent Fleet Chips */}
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Safety Gate: <strong className="text-emerald-700">ARMED (Veto Check)</strong>
                </span>
                <span className="text-amber-700 font-semibold">
                  Battery: 68% ☀️
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
