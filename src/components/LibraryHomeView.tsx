import React, { useState } from 'react';
import { BookOpen, Download, Star, Filter, Sparkles, Plus, GraduationCap, Users, FileText, Layers, Bookmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { CBCFullBook } from '../types';

interface LibraryHomeViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onOpenGenerator: () => void;
  onNavigateView: (view: string) => void;
}

export const LibraryHomeView: React.FC<LibraryHomeViewProps> = ({
  books,
  onSelectBook,
  onOpenGenerator,
  onNavigateView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const FEATURED_COLLECTIONS = [
    { id: 'homework', title: 'Holiday Homework', desc: 'Term 1, 2 & 3 Revision Assignments', icon: '📙', color: 'bg-amber-50 text-amber-900 border-amber-200' },
    { id: 'teacher', title: 'Teacher Notes & Schemes', desc: '40-min Detailed Lesson Schemes', icon: '📘', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { id: 'student', title: 'Student Textbooks', desc: 'Core Concept Explanations', icon: '📗', color: 'bg-blue-50 text-blue-900 border-blue-200' },
    { id: 'revision', title: 'Revision & Exam Kits', desc: 'Topical CATs & Marking Keys', icon: '📕', color: 'bg-rose-50 text-rose-900 border-rose-200' },
  ];

  const filteredBooks = books.filter((b) => {
    if (selectedCategory === 'All') return true;
    return b.grade === selectedCategory || b.subject.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-teal-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Internal Education Brain • Library Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Digital Curriculum Library & Resource Hub
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium">
            Browse through national curriculum coursebooks, teacher guides, student revision kits, and holiday homework workbooks.
          </p>
        </div>

        <button
          onClick={onOpenGenerator}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Coursebook</span>
        </button>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Available Books</div>
          <div className="text-xl font-black text-slate-900">{books.length}</div>
          <span className="text-[10px] text-emerald-600 font-bold">KICD Aligned</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Downloads</div>
          <div className="text-xl font-black text-slate-900">2.5M+</div>
          <span className="text-[10px] text-blue-600 font-bold">Printable A4 PDFs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Teachers</div>
          <div className="text-xl font-black text-slate-900">50,000+</div>
          <span className="text-[10px] text-purple-600 font-bold">National Schools</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Grade Levels</div>
          <div className="text-xl font-black text-slate-900">16 Grades</div>
          <span className="text-[10px] text-amber-600 font-bold">PP1 to Grade 12</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Subjects Covered</div>
          <div className="text-xl font-black text-slate-900">850+</div>
          <span className="text-[10px] text-teal-600 font-bold">All Strands</span>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">Featured Resource Collections</h2>
          <button onClick={() => onNavigateView('subject')} className="text-xs font-bold text-emerald-700 hover:underline">
            View All Collections →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigateView('subject')}
              className={`p-5 rounded-2xl border ${col.color} shadow-2xs hover:shadow-md transition cursor-pointer space-y-2 flex flex-col justify-between`}
            >
              <div className="space-y-1">
                <div className="text-3xl">{col.icon}</div>
                <h3 className="font-extrabold text-sm">{col.title}</h3>
                <p className="text-xs opacity-80">{col.desc}</p>
              </div>

              <div className="pt-2 text-[11px] font-extrabold flex items-center gap-1">
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added Books */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recently Added Library Books</h2>
            <p className="text-xs text-slate-500">Master copy books generated & structured by Internal Education Brain</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                selectedCategory === 'All' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('Grade 4')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                selectedCategory === 'Grade 4' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Grade 4
            </button>
            <button
              onClick={() => setSelectedCategory('Grade 5')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                selectedCategory === 'Grade 5' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Grade 5
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-lg transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {book.grade} • {book.subject}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.9</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2">{book.title}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Strand: <span className="font-bold text-slate-800">{book.strand}</span>
                </p>
                <div className="text-[11px] text-slate-400">
                  School: {book.branding?.schoolName}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectBook(book)}
                  className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Book</span>
                </button>
                <button
                  onClick={() => {
                    onSelectBook(book);
                    window.print();
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition"
                  title="Print or Export PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
