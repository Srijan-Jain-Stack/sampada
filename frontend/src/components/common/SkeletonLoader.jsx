import React from 'react';

export default function SkeletonLoader({ count = 3, type = 'card' }) {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {type === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-200/70 border border-slate-300/40 p-5 space-y-4">
              <div className="h-4 bg-slate-300/60 rounded-md w-1/3" />
              <div className="h-8 bg-slate-300/80 rounded-md w-2/3" />
              <div className="h-24 bg-slate-300/40 rounded-xl" />
              <div className="h-4 bg-slate-300/50 rounded-md w-full" />
            </div>
          ))}
        </div>
      )}

      {type === 'metrics' && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200/70 p-4 space-y-2">
              <div className="h-3 bg-slate-300/60 rounded w-1/2" />
              <div className="h-7 bg-slate-300/80 rounded w-3/4" />
              <div className="h-3 bg-slate-300/40 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {type === 'text' && (
        <div className="space-y-2">
          <div className="h-4 bg-slate-300/70 rounded w-3/4" />
          <div className="h-4 bg-slate-300/50 rounded w-full" />
          <div className="h-4 bg-slate-300/50 rounded w-5/6" />
        </div>
      )}
    </div>
  );
}
