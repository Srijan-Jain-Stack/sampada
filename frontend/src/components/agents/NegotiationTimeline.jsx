import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Play, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function NegotiationTimeline({ steps, currentStep = 1, onSelectStep }) {
  const { demo } = useGreenhouse();
  const timelineSteps = steps || demo.activeScenario?.steps || [];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
            9-Stage Negotiation & Execution Sequence
          </h4>
          <p className="text-xs text-slate-700 font-medium">
            Step-by-step lifecycle from raw sensor anomaly to verified actuator actuation
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
          Step {currentStep} of {timelineSteps.length}
        </span>
      </div>

      <div className="space-y-2">
        {timelineSteps.map((s, idx) => {
          const isPassed = s.step < currentStep;
          const isCurrent = s.step === currentStep;

          return (
            <div
              key={s.step}
              onClick={() => onSelectStep && onSelectStep(s.step)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isCurrent
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                  : isPassed
                    ? 'bg-slate-50/70 border-slate-200/80 opacity-90'
                    : 'bg-white border-slate-100 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isPassed ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                    ✓
                  </div>
                ) : isCurrent ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold animate-bounce shadow-xs">
                    {s.step}
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center text-xs font-bold">
                    {s.step}
                  </div>
                )}
              </div>

              <div className="min-w-0 space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className={`text-xs font-extrabold ${isCurrent ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {s.name}
                  </h5>
                  {isCurrent && (
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 animate-pulse">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-normal">
                  {s.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
