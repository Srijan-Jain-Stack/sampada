import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  Radio, 
  Sliders, 
  Zap,
  Lock
} from 'lucide-react';

export default function DecisionPipeline() {
  const [activeStep, setActiveStep] = useState(4); // default on Safety Guardrail

  const steps = [
    {
      id: 0,
      title: "1. Sensors",
      subtitle: "Multi-Sensor Fusion",
      desc: "Raw analog soil moisture, SHT31 air temp/humidity, ESP32-CAM leaf wilting classification, and INA219 battery/solar telemetry.",
      icon: Radio,
    },
    {
      id: 1,
      title: "2. Agent Bids",
      subtitle: "Situational Urgency",
      desc: "Each agent converts local telemetry into an urgency bid b_i ∈ [0.00, 1.00] with a plain-text rationale payload.",
      icon: Activity,
    },
    {
      id: 2,
      title: "3. Coordinator",
      subtitle: "Auctioneer Aggregation",
      desc: "Aggregates zone bids, checks weather forecast suppression rules, and forms the contextual feature vector x_t.",
      icon: Cpu,
    },
    {
      id: 3,
      title: "4. Contextual Bandit",
      subtitle: "LinUCB Scheduling",
      desc: "Computes Upper Confidence Bounds over discrete action space. Trainable on a laptop within hackathon timeframes without heavy RL simulators.",
      icon: Sliders,
    },
    {
      id: 4,
      title: "5. Safety Guardrail",
      subtitle: "Hardware Veto Turnstile",
      desc: "IMMUTABLE VETO GATE: Verifies that chosen actions never breach hard-coded soil wilting floors or battery safety bounds. Vetoes any unsafe AI proposal.",
      icon: Lock,
      isGuardrail: true
    },
    {
      id: 5,
      title: "6. Actuation",
      subtitle: "Relays & Solenoids",
      desc: "Fires 12V DC booster pump pulse, triggers zone solenoid valves, and modulates PWM exhaust fans.",
      icon: Zap,
    },
    {
      id: 6,
      title: "7. Audit Log",
      subtitle: "Telemetry & Commons",
      desc: "Logs decision reward (did crop stress recover?) and publishes anonymized lesson card to MQTT Commons.",
      icon: FileText,
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-emerald-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            TECHNICAL APPROACH &amp; DECISION FLOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            The 7-Stage Decision Pipeline
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            From raw micro-readings to safety-gated relay dispatch, explore the real-time execution chain.
          </p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  step.isGuardrail
                    ? isSelected 
                      ? 'bg-red-50 border-red-400 text-red-900 ring-2 ring-red-300 scale-[1.02] shadow-sm'
                      : 'bg-red-50/50 border-red-200 text-red-800 hover:bg-red-50'
                    : isSelected 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300 scale-[1.02] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    step.isGuardrail ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {step.isGuardrail && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-bold">
                      VETO
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold font-display truncate">{step.title}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">{step.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Step Inspector Card */}
        {(() => {
          const active = steps[activeStep];
          const Icon = active.icon;
          return (
            <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
              active.isGuardrail
                ? 'bg-red-50/70 border-red-200'
                : 'bg-[#f7faf8] border-emerald-100'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    active.isGuardrail ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900">{active.title} — {active.subtitle}</h3>
                    <span className="text-xs font-mono text-emerald-700 font-semibold">Execution Phase {activeStep + 1} of 7</span>
                  </div>
                </div>

                {active.isGuardrail && (
                  <div className="text-xs font-mono text-red-800 bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 font-semibold">
                    🛡️ Stage 5 Defense: "It can delay optimization, but it can never cross the safety turnstile."
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {active.desc}
              </p>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
