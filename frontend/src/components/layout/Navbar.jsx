import React, { useState, useEffect } from 'react';
import { useGreenhouse } from '../../context/GreenhouseContext';
import { 
  Sprout, 
  Play, 
  User, 
  Code2, 
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ onToggleMobileMenu, mobileMenuOpen }) {
  const { 
    isFarmerView, 
    toggleViewMode, 
    isWsLive, 
    demo 
  } = useGreenhouse();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Minimal Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900">
                SAMPADA
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                SIH 2026
              </span>
            </div>
          </div>
        </div>

        {/* Center: Subtle Live Status */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isWsLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>{isWsLive ? 'Live System' : 'Simulated'}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span>{currentTime}</span>
        </div>

        {/* Right: Mode Switcher & Run Demo */}
        <div className="flex items-center gap-2.5">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => { if (!isFarmerView) toggleViewMode(); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                isFarmerView 
                  ? 'bg-white text-slate-900 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Farmer</span>
            </button>
            <button
              onClick={() => { if (isFarmerView) toggleViewMode(); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                !isFarmerView 
                  ? 'bg-white text-slate-900 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Technical</span>
            </button>
          </div>

          {/* Minimal Demo Button */}
          <button
            onClick={() => demo.open()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-2xs cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Run Demo</span>
          </button>

        </div>
      </div>
    </header>
  );
}
