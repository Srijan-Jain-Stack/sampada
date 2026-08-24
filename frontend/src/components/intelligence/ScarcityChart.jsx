import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export default function ScarcityChart({ data, type = 'energy' }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'energy' ? (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} unit=" kW" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Area 
              type="monotone" 
              dataKey="solarKw" 
              name="Solar Generation (kW)" 
              stroke="#d97706" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#solarGrad)" 
            />
            <Area 
              type="monotone" 
              dataKey="consumptionKw" 
              name="Greenhouse Demand (kW)" 
              stroke="#0f766e" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#loadGrad)" 
            />
            <Line 
              type="monotone" 
              dataKey="scarcity" 
              name="Scarcity Index (0-1)" 
              stroke="#ef4444" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
            />
          </AreaChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} unit=" L" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Area 
              type="monotone" 
              dataKey="available" 
              name="Reservoir Water (L)" 
              stroke="#2563eb" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#waterGrad)" 
            />
            <Line 
              type="monotone" 
              dataKey="usage" 
              name="Hourly Consumption (L)" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
