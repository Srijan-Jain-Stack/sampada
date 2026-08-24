import React, { useState } from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import DecisionCard from '../components/dashboard/DecisionCard';
import { 
  Brain, 
  Search, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Bot,
  Layers
} from 'lucide-react';

export default function DecisionsPage() {
  const { decisionsLog, decision, isFarmerView } = useGreenhouse();
  const [filterAgent, setFilterAgent] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLog = decisionsLog.filter(item => {
    const matchesAgent = filterAgent === 'ALL' || item.agent?.toLowerCase().includes(filterAgent.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      item.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  return (
    <PageContainer
      title="Coordinator Decisions & Audit Log"
      subtitle="Complete chronological history of multi-agent evaluations, winning bids, and deterministic safety checks"
      farmerTitle="Greenhouse Actions & History"
      farmerSubtitle="Review all past automated actions taken by your smart greenhouse system"
    >
      <div className="space-y-8">
        
        {/* 1. Latest Decision Prominent Spotlight */}
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-3">
            Latest Autonomous Dispatch
          </h2>
          <DecisionCard />
        </div>

        {/* 2. Decisions Audit History & Filter Bar */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Historical Decision Log & Rationale Trail
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Transparent AI explanations for every valve pulse and fan actuation
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search decisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-emerald-500 w-40 sm:w-48"
                />
              </div>

              {/* Agent Filter */}
              <select
                value={filterAgent}
                onChange={(e) => setFilterAgent(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:bg-white"
              >
                <option value="ALL">All Agents</option>
                <option value="Irrigation">Irrigation Agent</option>
                <option value="Climate">Climate Agent</option>
                <option value="Crop">Crop Agent</option>
                <option value="Energy">Energy Agent</option>
              </select>
            </div>
          </div>

          {/* Table of Decisions */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3">ID / Time</th>
                  <th className="p-3">Selected Action</th>
                  <th className="p-3">Target Zone</th>
                  <th className="p-3">Winning Agent</th>
                  <th className="p-3">Duration</th>
                  {!isFarmerView && <th className="p-3">Priority / Conf</th>}
                  <th className="p-3">Explanation Rationale</th>
                  <th className="p-3 text-right">Safety Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredLog.map((dec) => (
                  <tr key={dec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div>{dec.id}</div>
                      <span className="text-[10px] text-slate-700 font-normal">{dec.time}</span>
                    </td>
                    <td className="p-3 font-bold text-emerald-950">
                      {dec.action}
                    </td>
                    <td className="p-3 text-slate-700 whitespace-nowrap">
                      {dec.zone}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                        {dec.agent}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {dec.duration}
                    </td>
                    {!isFarmerView && (
                      <td className="p-3 font-mono whitespace-nowrap">
                        <span className="text-emerald-700 font-bold">{dec.priority}</span>
                        <span className="text-slate-700 text-[10px]"> ({dec.confidence}%)</span>
                      </td>
                    )}
                    <td className="p-3 text-slate-700 max-w-xs text-xs font-normal">
                      "{dec.reason}"
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {dec.safety}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
