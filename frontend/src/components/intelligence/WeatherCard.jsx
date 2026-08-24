import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { CloudSun, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WeatherCard({ weatherData }) {
  const { weather: defaultWeather } = useGreenhouse();
  const weather = weatherData || defaultWeather;

  if (!weather) return null;
  const isSuppressed = weather.irrigationSuppressed || weather.rainProbability >= 65;

  return (
    <div className="card-clean p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Weather Intelligence
          </h4>
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isSuppressed ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isSuppressed ? 'Rain Suppression Active' : 'Normal'}
        </span>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">Temp</span>
          <span className="text-base font-bold text-slate-900">{weather.temperature}°C</span>
          <span className="text-[10px] text-slate-700 block mt-0.5">{weather.condition}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">Rain Probability</span>
          <span className={`text-base font-bold ${weather.rainProbability > 50 ? 'text-blue-600' : 'text-slate-900'}`}>
            {weather.rainProbability}%
          </span>
          <span className="text-[10px] text-slate-700 block mt-0.5">Exp: {weather.expectedRainfallMm || 0}mm</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">Solar Irradiance</span>
          <span className="text-base font-bold text-amber-700">{weather.solarIrradiance || 890}</span>
          <span className="text-[10px] text-slate-700 block mt-0.5">W/m²</span>
        </div>
      </div>

      {/* Suppression alert or clear status */}
      {isSuppressed ? (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Irrigation Suppressed</span>
          </div>
          <p className="text-[11px] text-amber-800">
            {weather.suppressionReason || 'Rain forecast detected. Scheduled watering paused to save water.'}
          </p>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs text-slate-700">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            No rain suppression
          </span>
          <span className="text-[10px] font-mono text-slate-700">Canopy Dry</span>
        </div>
      )}

      {/* 4-Day Forecast Strip */}
      {weather.forecast && (
        <div className="grid grid-cols-4 gap-1 text-center text-xs pt-1 border-t border-slate-100">
          {weather.forecast.map((fc, i) => (
            <div key={i} className="p-1.5 rounded-lg bg-slate-50/70">
              <span className="text-[10px] text-slate-700 font-semibold block">{fc.day}</span>
              <span className="font-bold text-slate-900 block">{fc.temp}</span>
              <span className="text-[10px] text-blue-700 block">{fc.rain}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
