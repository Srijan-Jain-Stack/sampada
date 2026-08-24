import React, { useState, useEffect } from 'react';
import { Sprout, Globe, Cpu, Sparkles, Activity, FileText, Menu, X } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ lang, setLang, onOpenPitchModal, onScrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang]?.nav || translations.en.nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.overview, id: 'overview' },
    { name: t.agents, id: 'agents' },
    { name: t.simulator, id: 'simulator' },
    { name: t.stateMachine, id: 'state-machine' },
    { name: t.commons, id: 'commons' },
    { name: t.hardware, id: 'hardware' },
    { name: t.matrix, id: 'comparison' },
    { name: t.roi, id: 'roi' },
    { name: t.judgeQnA, id: 'judge-qna' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm shadow-emerald-950/5' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Tag */}
        <div 
          onClick={() => onScrollToSection('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-lime-500 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight">SmartGreenhouse</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-emerald-700/80 font-medium tracking-wide">Multi-Agent Resource Arbitration</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/80 border border-emerald-100 rounded-full px-3 py-1.5 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollToSection(link.id)}
              className="text-xs font-medium text-slate-600 hover:text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-all"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Actions & Language Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Language Selector */}
          <div className="relative flex items-center bg-white border border-emerald-200/80 rounded-xl p-1 text-xs shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-600 ml-2 mr-1" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-700 font-medium text-xs focus:outline-none pr-2 cursor-pointer py-1"
            >
              <option value="en" className="bg-white text-slate-800">English</option>
              <option value="hi" className="bg-white text-slate-800">हिंदी (Hindi)</option>
              <option value="mr" className="bg-white text-slate-800">मराठी (Marathi)</option>
              <option value="te" className="bg-white text-slate-800">తెలుగు (Telugu)</option>
            </select>
          </div>

          {/* Quick Pitch Summary Modal Button */}
          <button
            onClick={onOpenPitchModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 transition-all shadow-sm"
            title="View Executive Pitch Card"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Deck Sheet</span>
          </button>

          {/* Launch Demo CTA */}
          <button
            onClick={() => onScrollToSection('simulator')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.liveDemo}</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Mobile Language Switch */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white text-xs text-emerald-700 border border-emerald-200 rounded-lg p-1.5 focus:outline-none"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
            <option value="te">TE</option>
          </select>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-600 bg-white rounded-xl border border-emerald-200 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 border-b border-emerald-100 px-4 py-4 space-y-2 backdrop-blur-2xl shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onScrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-slate-700 hover:text-emerald-600 py-2 px-3 rounded-lg hover:bg-emerald-50"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-3 border-t border-emerald-100 flex gap-2">
            <button
              onClick={() => {
                onOpenPitchModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              <FileText className="w-4 h-4" />
              Pitch Deck Sheet
            </button>
            <button
              onClick={() => {
                onScrollToSection('simulator');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600"
            >
              Live Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
