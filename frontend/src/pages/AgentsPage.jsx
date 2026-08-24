import React from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import AgentNegotiation from '../components/agents/AgentNegotiation';
import NegotiationTimeline from '../components/agents/NegotiationTimeline';
import AgentStatus from '../components/agents/AgentStatus';
import SafetyGate from '../components/intelligence/SafetyGate';
import { 
  Play, 
  Cpu, 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AgentsPage() {
  const { agents, decision, demo, isFarmerView } = useGreenhouse();

  return (
    <PageContainer
      title="Multi-Agent Negotiation Architecture"
      subtitle="4 Specialized greenhouse agents negotiate for scarce water & energy → Coordinator evaluates bids → Safety Gate validates decision → Final action dispatched"
      farmerTitle="AI Decision Engine"
      farmerSubtitle="How your 4 AI greenhouse agents negotiate to keep your plants healthy without wasting resources"
      actions={
        <button
          onClick={() => demo.open()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Launch Negotiation Demo</span>
        </button>
      }
    >
      <div className="space-y-8">
        
        {/* Top Agent Status Matrix */}
        <AgentStatus />

        {/* 1. Flagship Centerpiece: The Visual Multi-Agent Negotiation Pipeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
          <AgentNegotiation />
        </div>

        {/* 2. Interactive Negotiation Timeline & Safety Gate Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <NegotiationTimeline 
              steps={demo.activeScenario?.steps}
              currentStep={demo.currentStep}
              onSelectStep={(s) => demo.goToStep(s)}
            />
          </div>

          {/* Safety Gate (5 cols) */}
          <div className="lg:col-span-5">
            <SafetyGate />
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
