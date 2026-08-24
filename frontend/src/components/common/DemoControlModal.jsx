import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles
} from 'lucide-react';

export default function DemoControlModal() {
  const { demo } = useGreenhouse();

  if (!demo.isOpen) return null;

  const {
    activeScenario,
    scenarios,
    currentStep,
    isPlaying,
    speedMs,
    setSpeedMs,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    goToStep,
    selectScenario,
    close
  } = demo;

  const currentStepObj = activeScenario.steps[currentStep - 1] || activeScenario.steps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Multi-Agent Negotiation Simulator
              </h2>
              <p className="text-xs text-slate-700 font-medium">
                Step-by-step negotiation sequence for judges
              </p>
            </div>
          </div>

          <button
            onClick={close}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          
          {/* Scenario Tabs */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Choose Scenario:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => selectScenario(sc.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeScenario.id === sc.id
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 font-bold text-emerald-950'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-700 uppercase block">{sc.badge}</span>
                  <span className="text-xs truncate block mt-0.5">{sc.title.replace(/^\d+\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Stage Progress</span>
              <span className="font-mono font-bold text-emerald-700">Stage {currentStep} of 9</span>
            </div>

            <div className="grid grid-cols-9 gap-1.5">
              {activeScenario.steps.map((s) => {
                const isPassed = s.step < currentStep;
                const isCurrent = s.step === currentStep;

                return (
                  <button
                    key={s.step}
                    onClick={() => goToStep(s.step)}
                    className={`py-1.5 rounded-lg text-center text-xs font-mono transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                        : isPassed
                          ? 'bg-emerald-100 text-emerald-900 font-medium'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.step}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Card */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400">
                Step {currentStepObj.step}: {currentStepObj.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{activeScenario.badge}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {currentStepObj.detail}
            </p>

            {currentStep >= 6 && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-300">
                <span>Action: <strong>{activeScenario.decision.action}</strong></span>
                <span>Safety: <strong>✓ Approved</strong></span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            
            {/* Play/Step */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevStep}
                disabled={currentStep <= 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={isPlaying ? pause : play}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-bold text-xs shadow-2xs cursor-pointer ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
              </button>

              <button
                onClick={nextStep}
                disabled={currentStep >= 9}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={reset}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 ml-1"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Speed & Done */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setSpeedMs(2500)}
                  className={`px-2 py-0.5 rounded ${speedMs === 2500 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-700'}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setSpeedMs(1500)}
                  className={`px-2 py-0.5 rounded ${speedMs === 1500 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-700'}`}
                >
                  1.5x
                </button>
              </div>

              <button
                onClick={close}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
