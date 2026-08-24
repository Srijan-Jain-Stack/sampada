import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  AlertOctagon, 
  Droplets, 
  Zap, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Languages, 
  Activity, 
  ArrowRight,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { translations } from '../data/translations';
import { runNegotiationCycle } from '../utils/simulatorEngine';

export default function LiveNegotiationSandbox({ lang }) {
  const t = translations[lang]?.simulator || translations.en.simulator;

  // Simulator State Parameters
  const [zone1Moisture, setZone1Moisture] = useState(21);
  const [zone2Moisture, setZone2Moisture] = useState(48);
  const [zone3Moisture, setZone3Moisture] = useState(19);
  const [tankLevel, setTankLevel] = useState(45);
  const [batterySoC, setBatterySoC] = useState(55);
  const [weatherScenario, setWeatherScenario] = useState('moderate');
  const [timeOfDay, setTimeOfDay] = useState('afternoon_peak');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    runCycle();
  }, [zone1Moisture, zone2Moisture, zone3Moisture, tankLevel, batterySoC, weatherScenario, timeOfDay, lang]);

  const runCycle = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = runNegotiationCycle({
        zone1Moisture,
        zone2Moisture,
        zone3Moisture,
        tankLevel,
        batterySoC,
        weatherScenario,
        timeOfDay
      }, lang);
      setSimulationResult(result);
      setIsSimulating(false);
    }, 100);
  };

  const applyPreset = (presetType) => {
    if (presetType === 'rain_suppression') {
      setZone1Moisture(26);
      setZone2Moisture(32);
      setZone3Moisture(24);
      setTankLevel(50);
      setBatterySoC(70);
      setWeatherScenario('rain_approaching');
      setTimeOfDay('morning');
    } else if (presetType === 'afternoon_heatwave') {
      setZone1Moisture(17);
      setZone2Moisture(38);
      setZone3Moisture(15);
      setTankLevel(25);
      setBatterySoC(32);
      setWeatherScenario('severe_heatwave');
      setTimeOfDay('afternoon_peak');
    } else if (presetType === 'emergency_low_tank') {
      setZone1Moisture(14);
      setZone2Moisture(22);
      setZone3Moisture(13);
      setTankLevel(8);
      setBatterySoC(18);
      setWeatherScenario('clear_hot');
      setTimeOfDay('afternoon_peak');
    } else {
      // Nominal
      setZone1Moisture(45);
      setZone2Moisture(50);
      setZone3Moisture(42);
      setTankLevel(80);
      setBatterySoC(85);
      setWeatherScenario('moderate');
      setTimeOfDay('morning');
    }
  };

  return (
    <section id="simulator" className="py-20 bg-[#f7faf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              INTERACTIVE HACKATHON LIVE SANDBOX
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-1 font-medium">Scenarios:</span>
            <button
              onClick={() => applyPreset('rain_suppression')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 transition-all"
            >
              🌧️ Rain Suppression
            </button>
            <button
              onClick={() => applyPreset('afternoon_heatwave')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all"
            >
              🔥 41°C Heatwave Scarcity
            </button>
            <button
              onClick={() => applyPreset('emergency_low_tank')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 transition-all"
            >
              ⚠️ Emergency Safety Floor
            </button>
            <button
              onClick={() => applyPreset('nominal')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-all"
            >
              🌿 Nominal Optimal
            </button>
          </div>
        </div>

        {/* Main Sandbox Grid: Sliders Controls (Left 5 cols) + Real-Time Engine Outputs (Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-emerald-100 p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-600" />
                Physical Sensor Controls
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold">Live Feedback</span>
            </div>

            {/* Zone 1 Moisture */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700">🌱 {t.zone1Moisture}</span>
                <span className={`font-mono font-bold ${zone1Moisture < 20 ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {zone1Moisture}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={zone1Moisture}
                onChange={(e) => setZone1Moisture(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10% (Wilting)</span>
                <span>45% (Ideal)</span>
                <span>80% (Saturated)</span>
              </div>
            </div>

            {/* Zone 2 Moisture */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700">🌶️ {t.zone2Moisture}</span>
                <span className={`font-mono font-bold ${zone2Moisture < 20 ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {zone2Moisture}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={zone2Moisture}
                onChange={(e) => setZone2Moisture(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Zone 3 Moisture */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700">🥒 {t.zone3Moisture}</span>
                <span className={`font-mono font-bold ${zone3Moisture < 20 ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {zone3Moisture}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={zone3Moisture}
                onChange={(e) => setZone3Moisture(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              
              {/* Tank Level */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                    Tank
                  </span>
                  <span className={`font-mono font-bold ${tankLevel < 20 ? 'text-red-600' : 'text-cyan-700'}`}>
                    {tankLevel}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={tankLevel}
                  onChange={(e) => setTankLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Battery SoC */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Battery
                  </span>
                  <span className={`font-mono font-bold ${batterySoC < 25 ? 'text-red-600' : 'text-amber-700'}`}>
                    {batterySoC}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={batterySoC}
                  onChange={(e) => setBatterySoC(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            {/* Weather & Time Selectors */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-500 font-semibold block mb-1">Weather Forecast</label>
                <select
                  value={weatherScenario}
                  onChange={(e) => setWeatherScenario(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 p-2 focus:outline-none"
                >
                  <option value="moderate">⛅ Nominal (28°C, 65% RH)</option>
                  <option value="clear_hot">☀️ Clear Hot (36°C, 42% RH)</option>
                  <option value="severe_heatwave">🔥 Extreme Heat (41.5°C, 32% RH)</option>
                  <option value="rain_approaching">🌧️ Rain Forecast (85% prob, 6.4mm)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-500 font-semibold block mb-1">Time of Day</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 p-2 focus:outline-none"
                >
                  <option value="morning">🌅 Morning (8:00 AM)</option>
                  <option value="afternoon_peak">☀️ Afternoon Peak (2:00 PM)</option>
                  <option value="evening">🌇 Evening (6:30 PM)</option>
                  <option value="night">🌙 Night (11:00 PM)</option>
                </select>
              </div>
            </div>

            <button
              onClick={runCycle}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? t.running : t.runCycle}</span>
            </button>

          </div>

          {/* Real-time Engine Outputs */}
          <div className="lg:col-span-7 space-y-5">
            
            {simulationResult && (
              <>
                {/* Status Mode Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full ${
                      simulationResult.systemState === 'Normal' ? 'bg-emerald-600' :
                      simulationResult.systemState === 'Conservative' ? 'bg-amber-500' :
                      simulationResult.systemState === 'Critical' ? 'bg-orange-600' : 'bg-red-600'
                    }`}></span>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-500 uppercase">State Machine Mode</div>
                      <div className="text-base font-display font-extrabold text-slate-900">
                        {simulationResult.systemState} Protocol
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block font-medium">Telemetry Snap</span>
                    <span className="text-xs font-mono text-emerald-800 font-bold">
                      {simulationResult.telemetry.tempC.toFixed(1)}°C · VPD {simulationResult.telemetry.vpdKpa} kPa
                    </span>
                  </div>
                </div>

                {/* Agent Bids Matrix */}
                <div className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-700 font-bold uppercase mb-3">
                    <span>{t.bidsTitle}</span>
                    <span className="text-emerald-700 text-[10px]">Urgency $b_i \in [0, 1]$</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {simulationResult.bids.map((bid, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-slate-800 truncate">{bid.agent.split(' ')[0]}</span>
                          <span className="text-xs font-mono font-extrabold text-emerald-700">{bid.score}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-300"
                            style={{ width: `${bid.score * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-600 truncate">{bid.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Guardrail Turnstile */}
                <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  simulationResult.guardrailStatus === 'SAFETY_OVERRIDE'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <div className="flex items-center gap-2 font-mono font-bold">
                    {simulationResult.guardrailStatus === 'SAFETY_OVERRIDE' ? (
                      <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{simulationResult.guardrailStatus === 'SAFETY_OVERRIDE' ? t.guardrailVeto : t.guardrailPassed}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 truncate max-w-xs">{simulationResult.guardrailNotes}</span>
                </div>

                {/* Plain-Language Farmer Explanation Card (The Killer Feature) */}
                <div className="rounded-2xl bg-emerald-50/90 border border-emerald-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-900 uppercase">
                      <Languages className="w-4 h-4 text-emerald-700" />
                      {t.farmerExplanation}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 font-semibold shadow-2xs">
                      Bilingual Voice-Ready
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    "{simulationResult.farmerExplanation.summary}"
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-lg bg-white border border-cyan-200 text-cyan-800 font-semibold shadow-2xs">
                      💧 {simulationResult.farmerExplanation.waterSavedNote}
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-amber-800 font-semibold shadow-2xs">
                      ⚡ {simulationResult.farmerExplanation.energySavedNote}
                    </div>
                  </div>
                </div>

                {/* Actuator Relay Dispatch List */}
                <div className="rounded-xl bg-white border border-slate-200 p-3.5 text-xs font-mono shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">Relay Actuation Dispatch:</div>
                  <div className="space-y-1">
                    {simulationResult.actions.map((act, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-700 py-1 border-b border-slate-100 last:border-none">
                        <span className="font-bold text-emerald-800">{act.target}</span>
                        <span className="text-slate-600">{act.type} ({act.durationSec ? `${act.durationSec}s` : '0s'})</span>
                      </div>
                    ))}
                  </div>
                </div>

              </>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
