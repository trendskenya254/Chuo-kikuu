import React from 'react';
import { GraduationCap, Award, BookOpen, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CBCFullBook } from '../types';

interface CoverPageViewProps {
  book: CBCFullBook;
}

export const CoverPageView: React.FC<CoverPageViewProps> = ({ book }) => {
  const { branding, grade, subject, title, strand, subStrand } = book;

  const themeClasses: Record<string, { bg: string; text: string; border: string; accent: string; badge: string }> = {
    emerald: {
      bg: 'from-emerald-900 via-emerald-800 to-slate-900',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      accent: 'bg-emerald-500',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
    },
    navy: {
      bg: 'from-slate-950 via-slate-900 to-indigo-950',
      text: 'text-indigo-300',
      border: 'border-indigo-500/40',
      accent: 'bg-indigo-500',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
    },
    crimson: {
      bg: 'from-rose-950 via-rose-900 to-slate-950',
      text: 'text-rose-300',
      border: 'border-rose-500/40',
      accent: 'bg-rose-500',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-400/40'
    },
    amber: {
      bg: 'from-amber-950 via-amber-900 to-slate-950',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      accent: 'bg-amber-500',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-400/40'
    },
    purple: {
      bg: 'from-purple-950 via-purple-900 to-slate-950',
      text: 'text-purple-300',
      border: 'border-purple-500/40',
      accent: 'bg-purple-500',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
    }
  };

  const theme = themeClasses[branding.coverTheme] || themeClasses.emerald;

  return (
    <div className="w-full flex justify-center py-4 print:p-0">
      <div
        className={`w-full max-w-3xl aspect-[1/1.414] bg-gradient-to-br ${theme.bg} text-white rounded-2xl print:rounded-none shadow-2xl p-8 md:p-12 flex flex-col justify-between border-4 ${theme.border} relative overflow-hidden page-break-after-always`}
      >
        {/* Subtle Watermark Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Top Header: School Info & Crest */}
        <div className="text-center space-y-3 z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner mb-2">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-xl md:text-2xl font-black tracking-wide uppercase text-white drop-shadow-sm">
            {branding.schoolName || 'OFFICIAL ACADEMIC LEARNING RESOURCE'}
          </h2>

          {branding.motto && (
            <p className="text-xs md:text-sm font-medium italic text-slate-200/90 tracking-wider">
              "{branding.motto}"
            </p>
          )}

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${theme.badge}`}>
              {book.curriculumSystem || 'CBC'} CURRICULUM COMPLIANT
            </span>
            {book.bookCategory && (
              <span className="text-[11px] font-extrabold uppercase text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                {book.bookCategory}
              </span>
            )}
            <span className="text-[11px] font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-full">
              {branding.term} • {branding.year}
            </span>
          </div>
        </div>

        {/* Center Section: Book Title, Grade & Subject */}
        <div className="my-auto py-6 text-center space-y-5 z-10">
          
          <div className="inline-flex items-center gap-2 flex-wrap justify-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-4 py-1.5 rounded-xl shadow-xs">
              {grade} • {subject}
            </span>
            <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border ${
              book.difficultyLevel === 'Remedial'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                : book.difficultyLevel === 'Enrichment'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : 'bg-blue-500/20 text-blue-300 border-blue-400/40'
            }`}>
              Level: {book.difficultyLevel || 'Standard'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {title}
          </h1>

          <div className="max-w-xl mx-auto border-t border-b border-white/15 py-3 space-y-1">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
              STRAND: <span className="text-white font-bold">{strand}</span>
            </p>
            {subStrand && (
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                SUB-STRAND: <span className="text-white font-bold">{subStrand}</span>
              </p>
            )}
          </div>

          {/* Fillable Learner & Parent Information Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 max-w-xl mx-auto text-left space-y-2.5 text-xs">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="flex-1">
                <span className="text-slate-300 text-[10px] uppercase font-bold tracking-wider block">Learner's Full Name:</span>
                <div className="border-b-2 border-dashed border-white/40 pb-0.5 text-white font-bold">
                  ____________________________________
                </div>
              </div>
              <div className="w-full sm:w-32">
                <span className="text-slate-300 text-[10px] uppercase font-bold tracking-wider block">Adm / Reg No:</span>
                <div className="border-b-2 border-dashed border-white/40 pb-0.5 text-white font-bold">
                  ____________
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-[11px]">
              <div>
                <span className="text-slate-300 text-[10px] uppercase font-bold block">Parent / Guardian Signature:</span>
                <div className="text-slate-400 italic">Sign: __________________</div>
              </div>
              <div>
                <span className="text-slate-300 text-[10px] uppercase font-bold block">Teacher Verification:</span>
                <div className="text-slate-400 italic">Sign & Stamp: ___________</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Author Details & Copyright Footer */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs z-10">
          
          <div className="text-center sm:text-left space-y-0.5">
            <p className="text-slate-300 font-medium">Prepared & Authored By:</p>
            <p className="font-extrabold text-sm text-white">{branding.teacherName || 'Mwalimu Specialist'}</p>
            <p className="text-slate-400 text-[11px]">{branding.className || grade}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <p className="font-bold text-white">Full CBC Coursebook</p>
              <p>Ready for Printing & PDF</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
