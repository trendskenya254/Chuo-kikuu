import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, ArrowRight, BookOpen, Layers, Search, ShieldCheck } from 'lucide-react';

interface AIProcessingProgressProps {
  bookTitle?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
}

export const AIProcessingProgress: React.FC<AIProcessingProgressProps> = ({
  bookTitle = 'CBC Primary Coursebook',
  isCompleted = false,
  onComplete,
}) => {
  const [progress, setProgress] = useState(isCompleted ? 100 : 78);
  const [activeStep, setActiveStep] = useState(isCompleted ? 4 : 3);

  const steps = [
    { title: 'Curriculum Generation', label: 'Synthesizing KICD Strand Alignment & KIQs', icon: <BookOpen className="w-4 h-4" /> },
    { title: 'A4 Page Formatting', label: 'Calculating Typography, Margins & Page-Breaks', icon: <Layers className="w-4 h-4" /> },
    { title: 'Diagrams & Worksheets', label: 'Generating SVG Visuals & Assessment Rubrics', icon: <Sparkles className="w-4 h-4" /> },
    { title: 'AI Indexing & Search', label: 'Vectorizing Search Tokens & Key Concepts', icon: <Search className="w-4 h-4" /> },
    { title: 'Master Persistence', label: 'Writing Master Copy to IndexedDB & Cache', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 100;
        }
        const next = prev + 4;
        if (next > 85 && activeStep < 4) setActiveStep(4);
        return next;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [isCompleted, activeStep, onComplete]);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl border border-blue-800/50 shadow-xl space-y-4 print:hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-800/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600/30 text-blue-400 rounded-xl border border-blue-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-white">
                {progress === 100 ? 'AI Post-Generation Processing Complete' : 'AI Processing & Indexing In Progress'}
              </h3>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                progress === 100
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
              }`}>
                {progress}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Generating index tokens, printable page breaks, and teacher guides for <span className="text-amber-300 font-bold">{bookTitle}</span>
            </p>
          </div>
        </div>

        {progress < 100 && (
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl font-bold self-end sm:self-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>AI Indexing Engine</span>
          </div>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1.5">
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {steps.map((step, idx) => {
          const isDone = progress === 100 || idx < activeStep;
          const isCurrent = idx === activeStep && progress < 100;

          return (
            <div
              key={step.title}
              className={`p-2.5 rounded-xl border transition flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : isCurrent
                  ? 'bg-blue-900/60 border-blue-400 text-white ring-1 ring-blue-400/50'
                  : 'bg-slate-800/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{step.title}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 shrink-0" />
                )}
              </div>
              <p className="text-[9px] line-clamp-2 leading-tight opacity-80">{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
