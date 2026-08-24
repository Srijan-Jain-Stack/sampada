import React from 'react';
import { Sprout, Search } from 'lucide-react';

export default function EmptyState({ 
  title = 'No Records Found', 
  message = 'There are no active entries matching the specified criteria.',
  icon: Icon = Sprout 
}) {
  return (
    <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-3 max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-extrabold text-slate-900 text-base">
        {title}
      </h4>
      <p className="text-xs text-slate-700 font-medium">
        {message}
      </p>
    </div>
  );
}
