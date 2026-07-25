import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, BookOpen, GraduationCap, Award, Layers } from 'lucide-react';

interface GenerationProgressBarProps {
  isLoading: boolean;
}

const STAGES = [
  { label: 'Analyzing KICD Syllabus & Core Competencies', icon: Sparkles, pct: 15 },
  { label: 'Structuring 40-Min Timetabled Lesson Plans', icon: BookOpen, pct: 35 },
  { label: 'Generating Student Readings & Practical CSL Tasks', icon: GraduationCap, pct: 60 },
  { label: 'Building Formative CAT Worksheets & Rubrics Matrix', icon: Award, pct: 82 },
  { label: 'Synthesizing Printable Flashcards & Coursebook Layout', icon: Layers, pct: 98 },
];

export const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({ isLoading }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStageIdx(0);
      setProgress(5);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const next = prev + Math.floor(Math.random() * 6) + 3;
        
        // Update stage based on progress
        if (next > 80) setCurrentStageIdx(4);
        else if (next > 60) setCurrentStageIdx(3);
        else if (next > 35) setCurrentStageIdx(2);
        else if (next > 15) setCurrentStageIdx(1);
        else setCurrentStageIdx(0);

        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const currentStage = STAGES[currentStageIdx];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-blue-900/40 space-y-5 animate-fade-in">
      
      {/* Header Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Synthesizing CBC Coursebook</h3>
            <p className="text-xs text-blue-300 font-medium">
              {currentStage.label}
            </p>
          </div>
        </div>
        <span className="text-sm font-extrabold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
          {progress}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 border border-slate-700 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stage Checklist Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
        {STAGES.map((stg, idx) => {
          const isDone = idx < currentStageIdx;
          const isCurrent = idx === currentStageIdx;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl text-[10px] font-bold border transition flex items-center gap-1.5 ${
                isDone
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                  : isCurrent
                  ? 'bg-blue-900/80 border-blue-500 text-white shadow-xs'
                  : 'bg-slate-800/40 border-slate-800 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <stg.icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-300 animate-bounce' : 'text-slate-500'}`} />
              )}
              <span className="truncate">{stg.label.split(' ')[0]} {stg.label.split(' ')[1]}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
