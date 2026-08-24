import React from 'react';
import { AlertTriangle, RefreshCw, Radio } from 'lucide-react';

export default function ErrorState({ 
  title = 'Unable to Load Greenhouse Telemetry', 
  message = 'Connection to the backend API or WebSocket was interrupted. The dashboard is operating on cached/simulated telemetry.',
  onRetry 
}) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900">
          {title}
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
