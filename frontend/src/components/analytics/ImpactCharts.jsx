import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const savingsHistory = [
  { month: 'Week 1', waterSaved: 18, energySaved: 12, traditionalCost: 4200, sampadaCost: 3100 },
  { month: 'Week 2', waterSaved: 22, energySaved: 15, traditionalCost: 4500, sampadaCost: 3200 },
  { month: 'Week 3', waterSaved: 25, energySaved: 19, traditionalCost: 4800, sampadaCost: 3350 },
  { month: 'Week 4', waterSaved: 23, energySaved: 17, traditionalCost: 4600, sampadaCost: 3250 }
];

const agentArbitrationShare = [
  { name: 'Irrigation Agent', value: 42, color: '#2563eb' },
  { name: 'Crop Agent', value: 26, color: '#10b981' },
  { name: 'Climate Agent', value: 20, color: '#f97316' },
  { name: 'Energy Agent', value: 12, color: '#eab308' }
];

export default function ImpactCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* 1. Monthly Savings Comparison (Recharts Bar) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
            Resource Savings Over Time (%)
          </h4>
          <p className="text-xs text-slate-700 font-medium">
            Dynamic scheduling vs fixed-timer baseline
          </p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="waterSaved" name="Water Saved (%)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="energySaved" name="Energy Saved (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Agent Arbitration Win Share (Recharts Pie) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
            Agent Decision Win Distribution
          </h4>
          <p className="text-xs text-slate-700 font-medium">
            Percentage of winning bids awarded by Coordinator
          </p>
        </div>

        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agentArbitrationShare}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {agentArbitrationShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(val) => `${val}%`}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
