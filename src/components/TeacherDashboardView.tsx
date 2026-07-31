import React from 'react';
import { Users, BookOpen, Download, Star, Sparkles, Plus, TrendingUp, Award, CheckCircle2, FileText, Layers } from 'lucide-react';
import { CBCFullBook } from '../types';

interface TeacherDashboardViewProps {
  books: CBCFullBook[];
  onOpenGenerator: () => void;
  onSelectBook: (book: CBCFullBook) => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  books,
  onOpenGenerator,
  onSelectBook,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Teacher Welcome Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-blue-400/30">
              Teacher & Educator Portal
            </span>
            <span className="text-xs text-slate-400 font-semibold">Active Term 1 • 2026</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Mwalimu Instructional Dashboard
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Access curriculum books, schemes of work, topical CATs, and student assessment analytics.
          </p>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Books Published</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{books.length}</div>
          <p className="text-[10px] text-emerald-600 font-bold">+2 this week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Students Reached</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">420</div>
          <p className="text-[10px] text-blue-600 font-bold">3 Grade Classes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Downloads & Prints</span>
            <Download className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1,890</div>
          <p className="text-[10px] text-purple-600 font-bold">A4 PDFs Exported</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Curriculum Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">4.95 / 5</div>
          <p className="text-[10px] text-amber-600 font-bold">KICD Standard</p>
        </div>
      </div>

      {/* Published Resources List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-extrabold text-slate-900">Your Published Teaching Materials</h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">{books.length} Active Materials</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {books.map((b) => (
            <div key={b.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                  {b.grade} • {b.subject}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{b.title}</h4>
                <p className="text-slate-500">Strand: {b.strand}</p>
              </div>

              <button
                onClick={() => onSelectBook(b)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
