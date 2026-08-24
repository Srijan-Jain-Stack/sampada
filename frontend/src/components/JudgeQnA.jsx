import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { judgeQnAData } from '../data/projectData';

export default function JudgeQnA() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="judge-qna" className="py-20 bg-[#f7faf8] border-t border-emerald-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            STAGE DEFENSE &amp; JUDGE PREP · SIH 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Anticipated Judge Questions &amp; Proofs
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Every technical decision is backed by peer-reviewed literature and hard-coded mathematical constraints.
          </p>
        </div>

        {/* Q&A Accordion */}
        <div className="space-y-4">
          {judgeQnAData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-slate-900">
                      "{item.question}"
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 hidden sm:inline-block">
                      {item.badge}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-emerald-100">
                    <p className="bg-white p-4 rounded-xl border border-slate-200 text-slate-800 shadow-2xs">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
