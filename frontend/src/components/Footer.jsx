import React from 'react';
import { Sprout, Github, Globe, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { projectMeta } from '../data/projectData';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="bg-white border-t border-emerald-100 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle ambient light glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-100/40 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          
          {/* Brand */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 p-[1.5px]">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-slate-900">SmartGreenhouse AI</span>
                <p className="text-xs text-emerald-700 font-mono font-medium">Multi-Agent Dynamic Resource Scheduling</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              An intelligent, privacy-preserving, and explainable multi-agent system designed for Indian polyhouses. Built for Smart India Hackathon 2026.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Hard-Coded Safe · Contextual Bandit · Sub-₹5k ESP32</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-3">
              System Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#agents" className="hover:text-emerald-700 transition-colors">5 Cooperating Agents</a></li>
              <li><a href="#simulator" className="hover:text-emerald-700 transition-colors">LinUCB Bidding Sandbox</a></li>
              <li><a href="#state-machine" className="hover:text-emerald-700 transition-colors">Graceful Degradation</a></li>
              <li><a href="#commons" className="hover:text-emerald-700 transition-colors">MQTT Learning Commons</a></li>
              <li><a href="#hardware" className="hover:text-emerald-700 transition-colors">ESP32 Hardware BOM</a></li>
            </ul>
          </div>

          {/* Research & Benchmarks */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-3">
              Validated Research
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="https://ojs.aaai.org/index.php/AAAI/article/view/21440" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition-colors">iGrow (AAAI 2022)</a></li>
              <li><a href="https://doi.org/10.1016/j.apenergy.2023.122283" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition-colors">Applied Energy (2024)</a></li>
              <li><a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition-colors">Open-Meteo Weather API</a></li>
              <li><a href="#judge-qna" className="hover:text-emerald-700 transition-colors">SIH Judge Defense Q&amp;A</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Smart India Hackathon Team · Multi-Agent Smart Greenhouse
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-all hover:bg-slate-100 shadow-2xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
