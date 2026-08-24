import React, { useState } from 'react';
import { Cpu, DollarSign, Radio, Code, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { bomData, mqttTopicSchema } from '../data/projectData';

export default function HardwareExplorer() {
  const [activeTab, setActiveTab] = useState('bom');
  const [selectedSchemaIndex, setSelectedSchemaIndex] = useState(0);

  const totalBOM = bomData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <section id="hardware" className="py-20 bg-white border-t border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              FEASIBILITY &amp; TECH STACK
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Sub-₹5,000 Hardware Architecture
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              "Hardware-light, intelligence-heavy." Built on standard off-the-shelf microcontrollers and an open, vendor-agnostic MQTT schema.
            </p>
          </div>

          {/* Toggle between BOM and MQTT */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('bom')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'bom' 
                  ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bill of Materials (₹ BOM)
            </button>
            <button
              onClick={() => setActiveTab('mqtt')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'mqtt' 
                  ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MQTT Topic Schema
            </button>
          </div>
        </div>

        {/* Tab 1: BOM Table */}
        {activeTab === 'bom' && (
          <div className="rounded-3xl bg-white border border-emerald-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono uppercase text-[11px]">
                    <th className="py-4 px-5">Component</th>
                    <th className="py-4 px-4">Role in Stack</th>
                    <th className="py-4 px-3 text-center">Qty</th>
                    <th className="py-4 px-4 text-right">Unit Cost (₹)</th>
                    <th className="py-4 px-5 text-right font-bold text-emerald-800">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bomData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-slate-900 font-display text-xs">
                        {item.item}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {item.role}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono text-slate-500">
                        {item.qty}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        ₹{item.unitCost}
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-emerald-700">
                        ₹{item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BOM Footer Total */}
            <div className="p-5 bg-emerald-50/60 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-mono font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Fully sourced from local Indian distributors (Robu, Sunrom, ComponentKart)</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase text-slate-600 font-bold">Total System BOM:</span>
                <span className="text-2xl font-display font-extrabold text-emerald-800 bg-white px-4 py-1.5 rounded-xl border border-emerald-300 shadow-sm">
                  ₹{totalBOM.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MQTT Topic Schema */}
        {activeTab === 'mqtt' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Topic List */}
            <div className="lg:col-span-5 space-y-3">
              {mqttTopicSchema.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSchemaIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedSchemaIndex === idx
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm'
                      : 'bg-[#f7faf8] border-slate-200 text-slate-700 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1 font-semibold">
                    <span>Topic {idx + 1}</span>
                    <span className="text-emerald-700 font-bold">{item.direction}</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900 break-all">
                    {item.topic}
                  </div>
                </button>
              ))}
            </div>

            {/* Code Payload Inspector */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-emerald-400 font-bold">
                  {mqttTopicSchema[selectedSchemaIndex].topic}
                </span>
                <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-semibold">
                  JSON Schema
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 overflow-x-auto">
                <code>{mqttTopicSchema[selectedSchemaIndex].payload}</code>
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
