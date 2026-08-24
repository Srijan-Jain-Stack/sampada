import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GreenhouseProvider } from './context/GreenhouseContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import DemoControlModal from './components/common/DemoControlModal';

// Pages
import OverviewPage from './pages/OverviewPage';
import ZonesPage from './pages/ZonesPage';
import ZoneDetailPage from './pages/ZoneDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import AgentsPage from './pages/AgentsPage';
import DecisionsPage from './pages/DecisionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LearningPage from './pages/LearningPage';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <GreenhouseProvider>
      <Router>
        <div className="min-h-screen bg-[#f8faf9] text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
          
          {/* Persistent Top Navbar */}
          <Navbar 
            mobileMenuOpen={mobileMenuOpen}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          {/* Core App Shell: Sidebar + Routed Main Content */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Persistent Sidebar */}
            <Sidebar 
              mobileOpen={mobileMenuOpen}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />

            {/* Scrollable Main Content Container */}
            <main className="flex-1 overflow-y-auto min-w-0 pb-16">
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/zones" element={<ZonesPage />} />
                <Route path="/zones/:id" element={<ZoneDetailPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/decisions" element={<DecisionsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          {/* Interactive Judge Demo Control Modal */}
          <DemoControlModal />

        </div>
      </Router>
    </GreenhouseProvider>
  );
}
