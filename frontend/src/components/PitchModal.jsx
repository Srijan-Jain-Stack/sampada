import React from 'react';
import { X, Sprout, CheckCircle2, ShieldCheck, Cpu, Droplets, Zap, Download, Printer } from 'lucide-react';
import { projectMeta } from '../data/projectData';

export default function PitchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-emerald-200 p-6 sm:p-8 shadow-2xl my-8 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold mb-2">
            <span>{projectMeta.hackathon}</span>
            <span>·</span>
            <span>{projectMeta.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            {projectMeta.title}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 font-mono font-medium mt-1">
            "{projectMeta.tagline}"
          </p>
        </div>

        {/* Core Pitch Summary Grid */}
        <div className="space-y-4 text-xs sm:text-sm">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-mono font-bold text-emerald-800 uppercase mb-1">1. The Quantified Problem</h4>
            <p className="text-slate-700">
              Indian polyhouses manage water, fans, and solar batteries with 3 isolated rule-based timers that never communicate. Pumps cycle rapidly, batteries drain before afternoon heat peaks, and water is wasted on fixed clocks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-mono font-bold text-teal-800 uppercase mb-1">2. The Multi-Agent Solution</h4>
            <p className="text-slate-700">
              Five specialized agents (🌱 Crop Stress, 💧 Irrigation, 🌡️ Climate, ⚡ Energy, 🤖 Coordinator) continuously negotiate resource priority using a fast <strong>LinUCB Contextual Bandit</strong> with a physical <strong>Safety Guardrail Veto Gate</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-mono font-bold text-amber-800 uppercase mb-1">3. Two Novel Differentiators</h4>
            <ul className="space-y-1 text-slate-700 list-disc list-inside">
              <li><strong>Graceful Degradation State Machine:</strong> Steps through 4 deterministic states (Normal → Conservative → Critical → Emergency).</li>
              <li><strong>Greenhouse Learning Commons:</strong> Anonymized MQTT lesson card sharing across farms without leaking private location, crop yield, or sensor data.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-mono font-bold text-lime-800 uppercase mb-1">4. Validated Economics &amp; Hardware</h4>
            <p className="text-slate-700">
              +10.15% yield gain &amp; +92.70% net profit (AAAI 2022 iGrow benchmark), 34.8% water savings, on a sub-₹5,000 distributed 3× ESP32 edge hardware cluster with bilingual farmer explanations.
            </p>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-500">
            Design System: Fresh Botanical Green · Signal Orange Accent · SIH 2026
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pitch Card</span>
          </button>
        </div>

      </div>
    </div>
  );
}
