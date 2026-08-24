import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck, Tag, Share2 } from 'lucide-react';

export default function LearningCard({ lesson }) {
  if (!lesson) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        
        {/* Header: Lesson # and Confidence */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300">
              LESSON {lesson.lessonNumber}
            </span>
            <span className="text-xs font-extrabold text-slate-900 truncate">
              {lesson.title}
            </span>
          </div>

          <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 shrink-0">
            {lesson.confidence}% Confidence
          </span>
        </div>

        {/* The Core Insight */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          "{lesson.insight}"
        </div>

        {/* Tags */}
        {lesson.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {lesson.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Privacy Safe Origin & Applied Count */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
        <span className="truncate max-w-[200px]">
          Source: <strong className="text-slate-700 font-semibold">{lesson.source}</strong>
        </span>
        <span className="font-mono font-bold text-emerald-800 shrink-0">
          Applied {lesson.appliedCount}x
        </span>
      </div>
    </div>
  );
}
