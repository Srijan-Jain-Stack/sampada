import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { Layers, CheckCircle2, AlertTriangle, ArrowDown } from 'lucide-react';

export default function SensorValidation({ validationData }) {
  const { sensorValidation: defaultValidation } = useGreenhouse();
  const data = validationData || defaultValidation;

  if (!data) return null;
  const isDisagreement = data.hasDisagreement || data.confidenceRating === 'DISAGREEMENT' || data.confidenceRating === 'LOW';

  return (
    <div className="card-clean p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Cross-Sensor Validation
          </h4>
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isDisagreement ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isDisagreement ? 'Fault Checked' : 'Validated'}
        </span>
      </div>

      {/* 3 Sensor Inputs */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">Soil Sensor</span>
          <span className="text-base font-bold text-slate-900">{data.soilSensorStressScore}%</span>
          <span className="text-[10px] text-slate-700 block">45% Wt</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">Camera Vision</span>
          <span className="text-base font-bold text-slate-900">{data.cameraVisionStressScore}%</span>
          <span className="text-[10px] text-slate-700 block">35% Wt</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-700 uppercase font-semibold block">NDVI Satellite</span>
          <span className="text-base font-bold text-slate-900">{data.ndviSatelliteStressScore}%</span>
          <span className="text-[10px] text-slate-700 block">20% Wt</span>
        </div>
      </div>

      {/* Fusion Result */}
      {isDisagreement ? (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-800">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sensor Disagreement</span>
          </div>
          <p className="text-[11px] text-rose-800">
            {data.disagreementMessage || 'Disagreement between soil probe and canopy camera. Confidence: LOW.'}
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-emerald-800 uppercase font-semibold block">
              Confidence-Weighted Fused Stress
            </span>
            <span className="text-lg font-bold text-slate-900">
              {data.fusedStressScore}%
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence
          </span>
        </div>
      )}
    </div>
  );
}
