import React from 'react';
import { BookOpen, MapPin, ExternalLink, ArrowRight, CheckCircle2, Sparkles, Milestone } from 'lucide-react';
import { referencesData } from '../data/projectData';

export default function ReferencesRoadmap() {
  const roadmapSteps = [
    {
      phase: "Near-Term (Hackathon Scope)",
      title: "Weather Suppression & MQTT Commons Live Demo",
      desc: "Complete 15-minute Open-Meteo rainfall suppression integration, LinUCB edge training pipeline, and local 3-zone ESP32 relay actuation testbench.",
      status: "COMPLETED / DEMO READY",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      phase: "Mid-Term (Q3-Q4 2026)",
      title: "Real Sentinel-2 NDVI Ingestion & IMD API Bridge",
      desc: "Automated Google Earth Engine / Sentinel-2 vegetation index ingestion pipeline and direct India Meteorological Department (IMD) API gateway once registration reopens.",
      status: "IN DEVELOPMENT",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300"
    },
    {
      phase: "Long-Term (2027 Scale)",
      title: "Open Vendor-Agnostic MQTT Standard & Drone Bridge",
      desc: "Publishing the open JSON schema standard for 3rd-party fertigation / dosing pumps and autonomous greenhouse drone canopy inspection integration.",
      status: "PLANNED",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-emerald-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            ACADEMIC FOUNDATION &amp; ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Research Citations &amp; Future Scalability
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            "Everything on this system is either published research or a live open API — we are not asking you to trust a black box."
          </p>
        </div>

        {/* Citations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {referencesData.map((ref) => (
            <div
              key={ref.id}
              className="rounded-2xl bg-[#f7faf8] border border-emerald-100 p-5 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-700 font-bold mb-1">
                  <span>{ref.venue}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-display font-bold text-slate-900 leading-snug">
                  {ref.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">{ref.authors}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-emerald-800 font-mono font-bold">
                ★ {ref.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* 3-Phase Strategic Roadmap */}
        <div className="rounded-3xl bg-emerald-50/50 border border-emerald-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-6">
            <Milestone className="w-4 h-4 text-emerald-600" />
            Project Deployment Roadmap
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-emerald-100 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{step.phase}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${step.badgeColor}`}>
                      {step.status}
                    </span>
                  </div>
                  <h4 className="text-base font-display font-bold text-slate-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Phase {idx + 1} Target</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
