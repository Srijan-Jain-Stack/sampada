import React from 'react';
import { Table, Check, X, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { comparisonData } from '../data/projectData';

export default function CompetitiveMatrix() {
  return (
    <section id="comparison" className="py-20 bg-[#f7faf8] border-t border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            COMPETITIVE &amp; RESEARCH LANDSCAPE
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Why Hasn't Someone Done This Already?
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Commercial systems are centralized and cost ₹5 Lakhs+. Research pilots ignore multi-resource contention or farmer explainability. Here is how our architecture fills the exact gap.
          </p>
        </div>

        {/* Dense Comparison Table */}
        <div className="rounded-3xl bg-white border border-emerald-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-emerald-100 bg-slate-50 text-slate-700 font-mono uppercase text-[11px]">
                  <th className="py-4 px-5 font-bold">Key Capability</th>
                  <th className="py-4 px-5 font-bold text-emerald-800 bg-emerald-50 border-x border-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>OUR SYSTEM</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold text-slate-600">Priva / Ridder</th>
                  <th className="py-4 px-4 font-semibold text-slate-600">Autogrow</th>
                  <th className="py-4 px-4 font-semibold text-slate-600">Farmonaut (India)</th>
                  <th className="py-4 px-4 font-semibold text-slate-600">iGrow (AAAI '22)</th>
                  <th className="py-4 px-4 font-semibold text-slate-600">Ajagekar ('24)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    
                    {/* Capability Name */}
                    <td className="py-4 px-5 font-bold text-slate-900 font-display text-xs">
                      {row.feature}
                    </td>

                    {/* Our System Column (Highlighted) */}
                    <td className="py-4 px-5 font-semibold text-emerald-900 bg-emerald-50/60 border-x border-emerald-200 font-mono">
                      {row.ourSystem}
                    </td>

                    {/* Commercial / Research columns */}
                    <td className="py-4 px-4 text-slate-600">
                      {row.priva}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {row.autogrow}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {row.farmonaut}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {row.iGrow}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {row.ajagekar}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-emerald-100 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600">
            <span className="text-emerald-800 font-semibold">
              Slide 7 Direct Evidence · Grounded in Academic Literature &amp; Market Datasheets
            </span>
            <span className="font-bold">SIH 2026 Ready</span>
          </div>
        </div>

      </div>
    </section>
  );
}
