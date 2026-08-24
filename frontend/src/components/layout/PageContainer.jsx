import React from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { AlertTriangle } from 'lucide-react';

export default function PageContainer({
  title,
  subtitle,
  farmerTitle,
  farmerSubtitle,
  actions,
  children
}) {
  const { isFarmerView, safetyState } = useGreenhouse();

  const displayTitle = isFarmerView && farmerTitle ? farmerTitle : title;
  const displaySubtitle = isFarmerView && farmerSubtitle ? farmerSubtitle : subtitle;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              {displaySubtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Subtle Safety Degradation Notice */}
      {safetyState.mode !== 'NORMAL' && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-amber-900 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Operating in <strong>{safetyState.mode}</strong> mode: Non-essential cooling reduced. Critical watering protected.
          </span>
        </div>
      )}

      {/* Page Content */}
      {children}
    </div>
  );
}
