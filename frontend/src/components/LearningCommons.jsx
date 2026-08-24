import React, { useState } from 'react';
import { Network, Share2, Shield, Plus, ArrowUpRight, Check, Sparkles, MessageSquare } from 'lucide-react';

export default function LearningCommons() {
  const [lessons, setLessons] = useState([
    {
      id: "LESSON-0941",
      context: "Temp > 39°C + Soil 22% + Low Battery (SoC < 30%)",
      action: "Pulsed misting 15s every 8 min + delayed root irrigation by 40 min",
      outcome: "+18% Water Saved, Zero Leaf Necrosis",
      validatedBy: 28,
      source: "Greenhouse Node #8 (Maharashtra Polyhouse Cluster)",
      timestamp: "2 mins ago"
    },
    {
      id: "LESSON-0940",
      context: "Rain Forecast > 70% (Open-Meteo) + Saturated Root Zone",
      action: "Suppressed drip valves across all 3 zones + opened side vents 40%",
      outcome: "1,150 Litres Conserved in Single Rain Event",
      validatedBy: 42,
      source: "Greenhouse Node #3 (Punjab Polyhouse)",
      timestamp: "14 mins ago"
    },
    {
      id: "LESSON-0939",
      context: "Afternoon Solar Peak + High VPD (> 1.6 kPa) in Capsicum",
      action: "Direct DC fan PWM coupling with solar output without drawing battery",
      outcome: "Zero Battery Depletion, Leaf Stomata Remained Open",
      validatedBy: 19,
      source: "Greenhouse Node #12 (Karnataka Cluster)",
      timestamp: "1 hour ago"
    }
  ]);

  const handlePublishLesson = () => {
    const newEntry = {
      id: `LESSON-094${lessons.length + 2}`,
      context: "Extreme Heat (41°C) + High Evaporation Stress",
      action: "Pre-cooled soil with 20s pulse at 11:30 AM before peak solar heat",
      outcome: "Prevented midday wilting spike, 100% crop survival",
      validatedBy: 1,
      source: "Local Node #1 (Nashik Pilot)",
      timestamp: "Just now"
    };
    setLessons([newEntry, ...lessons]);
  };

  const handleValidate = (id) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, validatedBy: l.validatedBy + 1 } : l));
  };

  return (
    <section id="commons" className="py-20 bg-white border-t border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
              <Network className="w-3.5 h-3.5 text-emerald-600" />
              DIFFERENTIATOR 2 · FEDERATED LEARNING
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Greenhouse Learning Commons
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Privacy-preserving federated knowledge exchange over MQTT. Farms share anonymized "lesson cards" to bootstrap LinUCB learning without sharing crop yield, farm GPS, or identity.
            </p>
          </div>

          <button
            onClick={handlePublishLesson}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Simulated Lesson Card</span>
          </button>
        </div>

        {/* Catchphrase Quote */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-8 flex items-center justify-between">
          <p className="text-xs sm:text-sm font-mono text-emerald-900 font-semibold italic">
            "Like farmers swapping tips over a fence — except the fence is MQTT and the tip is anonymous."
          </p>
          <span className="text-[11px] font-mono text-slate-500 font-bold">Zero Private Data Leak</span>
        </div>

        {/* Lesson Cards Stream */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-2xl bg-[#f7faf8] border border-emerald-100 p-5 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3 text-xs font-mono">
                  <span className="font-bold text-emerald-700">{lesson.id}</span>
                  <span className="text-slate-500">{lesson.timestamp}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Context Hash</span>
                    <p className="text-slate-800 font-mono mt-0.5 font-medium">{lesson.context}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-700 block font-bold">Action Taken</span>
                    <p className="text-slate-700 mt-0.5">{lesson.action}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-700 block font-bold">Outcome Delta</span>
                    <p className="text-emerald-800 font-bold mt-0.5">{lesson.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
                  {lesson.source}
                </span>
                
                <button
                  onClick={() => handleValidate(lesson.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200 transition-colors text-xs font-mono font-bold"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Validated by {lesson.validatedBy}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
