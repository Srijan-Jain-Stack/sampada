import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGreenhouse } from '../../context/GreenhouseContext';
import {
  LayoutDashboard,
  Sprout,
  Droplets,
  Cpu,
  Brain,
  BarChart3,
  BookOpen
} from 'lucide-react';

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const { isFarmerView } = useGreenhouse();

  const navItems = [
    { to: '/', label: 'Overview', farmerLabel: 'Overview', icon: LayoutDashboard },
    { to: '/zones', label: 'Zones', farmerLabel: 'Crops & Zones', icon: Sprout },
    { to: '/resources', label: 'Resources', farmerLabel: 'Water & Energy', icon: Droplets },
    { to: '/agents', label: 'Agent Negotiation', farmerLabel: 'AI Engine', icon: Cpu },
    { to: '/decisions', label: 'Decisions', farmerLabel: 'History', icon: Brain },
    { to: '/analytics', label: 'Analytics', farmerLabel: 'Savings', icon: BarChart3 },
    { to: '/learning', label: 'Learning Commons', farmerLabel: 'Lessons', icon: BookOpen }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-56 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-0 lg:h-[calc(100vh-53px)]`}
      >
        <div className="p-3 space-y-1">
          <p className="text-[10px] font-bold tracking-wider text-slate-700 uppercase px-2.5 py-1">
            Menu
          </p>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {isFarmerView ? item.farmerLabel : item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Minimal Footer */}
        <div className="p-3 border-t border-slate-100 text-[11px] text-slate-700 font-medium">
          <span>SAMPADA • SIH 2026</span>
        </div>
      </aside>
    </>
  );
}
