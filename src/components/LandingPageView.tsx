import React, { useState } from 'react';
import { Search, BookOpen, Download, Star, GraduationCap, Users, FileText, Sparkles, Compass, ShieldCheck, ArrowRight, Layers, CheckCircle } from 'lucide-react';
import { CBCFullBook } from '../types';

interface LandingPageViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onNavigateView: (view: string) => void;
  onOpenGenerator: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  books,
  onSelectBook,
  onNavigateView,
  onOpenGenerator,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('All');

  const filteredBooks = books.filter((b) => {
    if (selectedCurriculum !== 'All' && b.curriculumSystem && b.curriculumSystem !== selectedCurriculum) {
      return false;
    }
    if (!heroSearch.trim()) return true;
    const q = heroSearch.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.subject.toLowerCase().includes(q) ||
      b.grade.toLowerCase().includes(q) ||
      b.strand.toLowerCase().includes(q)
    );
  });

  const CURRICULUMS = ['All', 'CBC', 'KCSE', 'KCPE', 'Cambridge', 'IGCSE'];

  const POPULAR_RESOURCES = [
    { title: 'Teacher Notes', icon: '📘', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { title: 'Student Notes', icon: '📗', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { title: 'Holiday Homework', icon: '📙', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { title: 'Revision Books', icon: '📕', color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { title: 'Exams & CATs', icon: '📔', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { title: 'Marking Schemes', icon: '📓', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Landing Top Header / Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-teal-800 relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Education Library Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Kenya's Largest Digital Learning Platform & Publishing House
          </h1>

          <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto font-medium">
            Instantly search, view, download, print, and AI-generate curriculum-aligned textbooks, teacher guides, exam papers, holiday homework, and revision workbooks.
          </p>

          {/* Hero Search Input */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl border border-teal-700/50 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search books, notes, exams, schemes by subject or grade..."
              className="w-full text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none bg-transparent py-2"
            />
            <button
              onClick={() => onNavigateView('search')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold">
            <button
              onClick={onOpenGenerator}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Book Generator Studio</span>
            </button>
            <button
              onClick={() => onNavigateView('library')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Full Digital Library</span>
            </button>
          </div>

        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center divide-x-0 sm:divide-x divide-slate-100">
          <div className="space-y-1">
            <div className="text-2xl font-black text-emerald-700">12,500+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Books & Workbooks</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-blue-700">850+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject Categories</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-purple-700">16</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grades (PP1-Grade 12)</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-amber-700">2.5M+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Downloads</div>
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <div className="text-2xl font-black text-teal-700">50,000+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teachers & Schools</div>
          </div>
        </div>
      </section>

      {/* Browse by Curriculum */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-black text-slate-900">Browse by Curriculum System</h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">National & International Syllabi</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CURRICULUMS.map((curr) => (
            <button
              key={curr}
              onClick={() => setSelectedCurriculum(curr)}
              className={`px-5 py-2.5 text-xs font-black rounded-xl border transition cursor-pointer ${
                selectedCurriculum === curr
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {curr === 'All' ? '🌐 All Curriculums' : curr}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Resource Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-black text-slate-900">Popular Learning Resource Types</h2>
          </div>
          <button onClick={() => onNavigateView('subject')} className="text-xs font-bold text-emerald-700 hover:underline">
            View All Types →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {POPULAR_RESOURCES.map((item) => (
            <div
              key={item.title}
              onClick={() => onNavigateView('search')}
              className={`p-4 rounded-2xl border ${item.color} shadow-2xs hover:shadow-md transition cursor-pointer text-center space-y-2`}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="text-xs font-black">{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Educational Books Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Latest Published Coursebooks & Workbooks</h2>
            <p className="text-xs text-slate-500">Curriculum-aligned, printable A4 layouts with marking schemes</p>
          </div>
          <button
            onClick={() => onNavigateView('library')}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Explore All Library ({books.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.slice(0, 6).map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition group flex flex-col"
            >
              {/* Card Header / Banner */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 relative">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {book.curriculumSystem || 'CBC'} • {book.grade}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-black/20 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>4.9</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm line-clamp-2 text-white group-hover:text-amber-200 transition">
                  {book.title}
                </h3>
                <p className="text-xs text-teal-100 font-medium mt-1">{book.subject}</p>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3 text-xs text-slate-600 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Strand:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[180px]">{book.strand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">School:</span>
                    <span className="font-medium text-slate-700">{book.branding?.schoolName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-semibold">Format:</span>
                    <span className="font-bold text-emerald-700">A4 Printable • Marking Key</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectBook(book)}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-center text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Book</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      window.print();
                    }}
                    className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    title="Download PDF or Print"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 rounded-3xl p-8 border border-slate-800 text-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-300">
          <div className="space-y-2">
            <div className="text-white font-extrabold text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Internal Education Brain</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kenya's largest AI-powered digital learning platform, publishing house, and offline educational repository.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Curriculum Systems</h4>
            <ul className="space-y-1 text-slate-400">
              <li>Competency Based Curriculum (CBC)</li>
              <li>KCSE & KCPE National Exam Archive</li>
              <li>Cambridge International Education</li>
              <li>IGCSE Secondary Framework</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Resource Formats</h4>
            <ul className="space-y-1 text-slate-400">
              <li>Teacher Notes & Lesson Schemes</li>
              <li>Student Workbooks & Notes</li>
              <li>Holiday Homework & Assignments</li>
              <li>Topical Practice & Marking Schemes</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">System Certification</h4>
            <p className="text-xs text-slate-400">
              KICD Curriculum Compliant • Offline IndexedDB Persistence Engine • Instant Printable A4 Layouts
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          © 2026 Internal Education Brain. All Educational Materials Published under KICD Alignment Standards.
        </div>
      </footer>

    </div>
  );
};
