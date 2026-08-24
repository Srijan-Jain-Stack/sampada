import React, { useState } from 'react';
import { useGreenhouse } from '../context/GreenhouseContext';
import PageContainer from '../components/layout/PageContainer';
import LearningCard from '../components/learning/LearningCard';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Tag 
} from 'lucide-react';

export default function LearningPage() {
  const { learningLessons, isFarmerView } = useGreenhouse();
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = ['ALL', 'Heat Stress', 'Water Conservation', 'Weather Intelligence', 'Thermal Inertia', 'Pathogen Prevention'];

  const filteredLessons = learningLessons.filter(lesson => {
    const matchesTag = selectedTag === 'ALL' || lesson.tags?.includes(selectedTag);
    const matchesSearch = searchQuery === '' || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.insight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.lessonNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <PageContainer
      title="Greenhouse Learning Commons"
      subtitle="Federated, privacy-preserving agronomic intelligence shared anonymously across polyhouse nodes"
      farmerTitle="Community Farming Insights"
      farmerSubtitle="Helpful automated farming lessons learned from greenhouses across India"
    >
      <div className="space-y-8">
        
        {/* 1. Privacy Banner & Federated Protocol Notice */}
        <div className="p-6 rounded-3xl bg-white border border-emerald-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                100% Anonymous & Privacy-Preserving Knowledge Exchange
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                Only validated optimization patterns and differential weights are shared. Zero crop yield, owner identity, or camera streams leave your greenhouse.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
            MQTT Federated Protocol
          </span>
        </div>

        {/* 2. Search & Tag Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shared lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-emerald-500 w-full sm:w-56 shadow-2xs"
            />
          </div>
        </div>

        {/* 3. Lessons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLessons.map((lesson) => (
            <LearningCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

      </div>
    </PageContainer>
  );
}
