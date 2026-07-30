import React, { useState, useMemo } from 'react';
import { BookOpen, Download, Star, Filter, Sparkles, Plus, GraduationCap, Users, FileText, Layers, Bookmark, ArrowRight, ShieldCheck, Grid, LayoutList, Calculator, Microchip, Globe, Languages, Palette, BookMarked, UserCheck, Award, X, Check, CreditCard, ChevronRight } from 'lucide-react';
import { CBCFullBook, TargetAudience } from '../types';

interface LibraryHomeViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onOpenGenerator: () => void;
  onNavigateView: (view: string) => void;
  onOpenPurchase?: (book: CBCFullBook, scope?: TargetAudience) => void;
}

// Target Book Scope & Edition Definitions
export const TARGET_EDITIONS: {
  id: TargetAudience;
  title: string;
  breakdown: string;
  description: string;
  icon: string;
  badge: string;
  border: string;
  btnBg: string;
  price: string;
}[] = [
  {
    id: 'Full Book',
    title: 'Full Book',
    breakdown: 'Cover + Teacher + Student + Rubrics',
    description: 'Complete coursebook with cover, schemes, 40-min lesson plans, textbook, worksheets & 4-tier rubrics.',
    icon: '📘',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    border: 'border-emerald-200 bg-emerald-50/50',
    btnBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    price: 'KES 49',
  },
  {
    id: 'Teacher Edition',
    title: 'Teacher Edition',
    breakdown: 'Schemes & Detailed Lesson Plans',
    description: 'Curriculum matrix, timetabled lesson plans, KIQs, resources, and special needs differentiation notes.',
    icon: '👨‍🏫',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    border: 'border-blue-200 bg-blue-50/50',
    btnBg: 'bg-blue-700 hover:bg-blue-800 text-white',
    price: 'KES 49',
  },
  {
    id: 'Student Edition',
    title: 'Student Edition',
    breakdown: 'Textbook + Practical Tasks',
    description: 'Core textbook readings, key definitions, group practicals, and community service learning (CSL) projects.',
    icon: '🎓',
    badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    border: 'border-indigo-200 bg-indigo-50/50',
    btnBg: 'bg-indigo-700 hover:bg-indigo-800 text-white',
    price: 'KES 49',
  },
  {
    id: 'School Assessment',
    title: 'School Assessment',
    breakdown: 'Worksheets & CBC Rubrics',
    description: 'Printable CAT worksheets, comprehension quizzes, answer marking keys, and CBC 4-level competency rubrics.',
    icon: '📝',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    border: 'border-amber-200 bg-amber-50/50',
    btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    price: 'KES 49',
  },
];

// Color-coded Subject Theme Config
export const SUBJECT_THEMES: Record<string, {
  name: string;
  icon: string;
  activeTab: string;
  badge: string;
  accentBar: string;
  bgLight: string;
}> = {
  science: {
    name: 'Science & Agriculture',
    icon: '🌱',
    activeTab: 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accentBar: 'border-t-4 border-t-emerald-600',
    bgLight: 'bg-emerald-50/50',
  },
  math: {
    name: 'Mathematics',
    icon: '📐',
    activeTab: 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    accentBar: 'border-t-4 border-t-blue-600',
    bgLight: 'bg-blue-50/50',
  },
  kiswahili: {
    name: 'Kiswahili',
    icon: '📚',
    activeTab: 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/40',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    accentBar: 'border-t-4 border-t-amber-600',
    bgLight: 'bg-amber-50/50',
  },
  english: {
    name: 'English Language',
    icon: '🔤',
    activeTab: 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40',
    badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    accentBar: 'border-t-4 border-t-indigo-600',
    bgLight: 'bg-indigo-50/50',
  },
  social: {
    name: 'Social Studies & CRE',
    icon: '🌍',
    activeTab: 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400/40',
    badge: 'bg-rose-100 text-rose-900 border-rose-300',
    accentBar: 'border-t-4 border-t-rose-600',
    bgLight: 'bg-rose-50/50',
  },
  creative: {
    name: 'Creative Arts & Music',
    icon: '🎨',
    activeTab: 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/40',
    badge: 'bg-purple-100 text-purple-900 border-purple-300',
    accentBar: 'border-t-4 border-t-purple-600',
    bgLight: 'bg-purple-50/50',
  },
  general: {
    name: 'General Studies',
    icon: '📖',
    activeTab: 'bg-slate-900 text-white shadow-md',
    badge: 'bg-slate-100 text-slate-900 border-slate-300',
    accentBar: 'border-t-4 border-t-slate-800',
    bgLight: 'bg-slate-50',
  }
};

export const getSubjectThemeKey = (subject: string): string => {
  const lower = subject.toLowerCase();
  if (lower.includes('agri') || lower.includes('sci') || lower.includes('nutrit') || lower.includes('envir')) return 'science';
  if (lower.includes('math') || lower.includes('calc') || lower.includes('num')) return 'math';
  if (lower.includes('kisw') || lower.includes('lugha') || lower.includes('fasihi')) return 'kiswahili';
  if (lower.includes('eng') || lower.includes('liter') || lower.includes('read')) return 'english';
  if (lower.includes('soci') || lower.includes('cre') || lower.includes('relig') || lower.includes('hist') || lower.includes('geo')) return 'social';
  if (lower.includes('art') || lower.includes('musi') || lower.includes('craft') || lower.includes('sport')) return 'creative';
  return 'general';
};

export const LibraryHomeView: React.FC<LibraryHomeViewProps> = ({
  books,
  onSelectBook,
  onOpenGenerator,
  onNavigateView,
  onOpenPurchase,
}) => {
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<string>('all');
  const [selectedEditionTab, setSelectedEditionTab] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');
  const [editionModalBook, setEditionModalBook] = useState<CBCFullBook | null>(null);

  const FEATURED_COLLECTIONS = [
    { id: 'homework', title: 'Holiday Homework', desc: 'Term 1, 2 & 3 Revision Assignments', icon: '📙', color: 'bg-amber-50 text-amber-900 border-amber-200' },
    { id: 'teacher', title: 'Teacher Notes & Schemes', desc: '40-min Detailed Lesson Schemes', icon: '📘', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { id: 'student', title: 'Student Textbooks', desc: 'Core Concept Explanations', icon: '📗', color: 'bg-blue-50 text-blue-900 border-blue-200' },
    { id: 'revision', title: 'Revision & Exam Kits', desc: 'Topical CATs & Marking Keys', icon: '📕', color: 'bg-rose-50 text-rose-900 border-rose-200' },
  ];

  // Subject Counts & Categorization
  const subjectGroups = useMemo(() => {
    const groups: Record<string, CBCFullBook[]> = {
      science: [],
      math: [],
      kiswahili: [],
      english: [],
      social: [],
      creative: [],
      general: [],
    };

    books.forEach((book) => {
      // Grade filter
      if (selectedGrade !== 'All' && book.grade !== selectedGrade) {
        return;
      }
      // Target Edition filter
      if (selectedEditionTab !== 'all' && book.targetAudience && book.targetAudience !== selectedEditionTab) {
        // If filter is specific, still match if book contains the target edition content
      }
      const key = getSubjectThemeKey(book.subject);
      if (groups[key]) {
        groups[key].push(book);
      } else {
        groups.general.push(book);
      }
    });

    return groups;
  }, [books, selectedGrade, selectedEditionTab]);

  // Filtered Flat List for Grid View or Selected Subject Tab
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchesGrade = selectedGrade === 'All' || b.grade === selectedGrade;
      const key = getSubjectThemeKey(b.subject);
      const matchesSubject = selectedSubjectTab === 'all' || key === selectedSubjectTab;
      return matchesGrade && matchesSubject;
    });
  }, [books, selectedGrade, selectedSubjectTab]);

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
            Browse through national curriculum coursebooks with automatic Target Scope & Edition generation (Full Book, Teacher, Student, & Assessment).
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

      {/* TARGET BOOK SCOPE & EDITION BANNER BAR */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Target Book Scope & Edition System</span>
              <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                4 Editions KES 49
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Every coursebook in the library includes 4 distinct target editions ready for instant preview, purchase, or download.
            </p>
          </div>

          {/* Edition Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setSelectedEditionTab('all')}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition cursor-pointer whitespace-nowrap ${
                selectedEditionTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Scopes
            </button>
            {TARGET_EDITIONS.map((ed) => (
              <button
                key={ed.id}
                onClick={() => setSelectedEditionTab(ed.id)}
                className={`px-3 py-1.5 rounded-xl font-black transition cursor-pointer whitespace-nowrap flex items-center gap-1 border ${
                  selectedEditionTab === ed.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : `${ed.border} text-slate-800 hover:shadow-xs`
                }`}
              >
                <span>{ed.icon}</span>
                <span>{ed.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Edition Cards Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TARGET_EDITIONS.map((ed) => (
            <div
              key={ed.id}
              onClick={() => setSelectedEditionTab(ed.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 hover:shadow-md ${ed.border}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <span className="text-lg">{ed.icon}</span>
                  <span>{ed.title}</span>
                </span>
                <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 shadow-2xs">
                  {ed.price}
                </span>
              </div>
              <div className={`text-[10px] font-black px-2 py-0.5 rounded-md border w-fit ${ed.badge}`}>
                {ed.breakdown}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {ed.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Available Books</div>
          <div className="text-xl font-black text-slate-900">{books.length}</div>
          <span className="text-[10px] text-emerald-600 font-bold">KICD Aligned</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Target Editions</div>
          <div className="text-xl font-black text-slate-900">4 Per Book</div>
          <span className="text-[10px] text-blue-600 font-bold">Full/Teacher/Student/CAT</span>
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

      {/* Featured Resource Collections */}
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

      {/* COLOR-CODED SUBJECT TABS & VISUAL GROUPING SECTION */}
      <div className="space-y-6 pt-2">
        
        {/* Section Title & View Mode Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Academic Library by Subject</span>
              <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Color Categorized
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select color-coded subject tabs to filter topics or switch to Grouped View for automatic subject categorization.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
              <button
                onClick={() => {
                  setViewMode('grouped');
                  setSelectedSubjectTab('all');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Group books by visual subject cards"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Grouped View</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="View books in flat responsive grid"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>

            {/* Grade Selector */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
            >
              <option value="All">All Grades</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
            </select>
          </div>
        </div>

        {/* Color-Coded Subject Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {/* ALL SUBJECTS TAB */}
          <button
            onClick={() => {
              setSelectedSubjectTab('all');
              if (viewMode === 'grid') setViewMode('grouped');
            }}
            className={`px-4 py-2.5 rounded-2xl font-black transition cursor-pointer shrink-0 flex items-center gap-2 ${
              selectedSubjectTab === 'all'
                ? 'bg-slate-900 text-white shadow-md ring-2 ring-slate-400/40'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>📚 All Subjects</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              selectedSubjectTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {books.length}
            </span>
          </button>

          {/* DYNAMIC SUBJECT COLOR TABS */}
          {Object.entries(SUBJECT_THEMES).map(([key, theme]) => {
            const count = subjectGroups[key]?.length || 0;
            const isSelected = selectedSubjectTab === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedSubjectTab(key);
                  setViewMode('grid');
                }}
                className={`px-4 py-2.5 rounded-2xl font-black transition cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? theme.activeTab
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">{theme.icon}</span>
                <span>{theme.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  isSelected ? 'bg-white/20 text-white border-white/30' : theme.badge
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* GROUPED SUBJECT CATEGORY VIEW */}
        {viewMode === 'grouped' && (
          <div className="space-y-8">
            {Object.entries(SUBJECT_THEMES).map(([key, theme]) => {
              const categoryBooks = subjectGroups[key] || [];
              if (categoryBooks.length === 0) return null;

              return (
                <div key={key} className="space-y-4">
                  {/* Category Header Bar */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${theme.bgLight} border-slate-200 shadow-2xs`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xl shrink-0">
                        {theme.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                          <span>{theme.name}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                            {categoryBooks.length} {categoryBooks.length === 1 ? 'Book' : 'Books'}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          National CBC Curriculum • Competency-Based Resources
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSubjectTab(key);
                        setViewMode('grid');
                      }}
                      className="text-xs font-black text-slate-700 hover:text-slate-950 hover:underline shrink-0 hidden sm:block"
                    >
                      Filter Only {theme.name} →
                    </button>
                  </div>

                  {/* Books Grid under Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {categoryBooks.map((book) => {
                      return (
                        <div
                          key={book.id}
                          className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-xl transition space-y-3 flex flex-col justify-between ${theme.accentBar}`}
                        >
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-start">
                              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                                {book.grade} • {book.subject}
                              </span>
                              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>4.9</span>
                              </div>
                            </div>

                            <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2">{book.title}</h4>
                            <p className="text-xs text-slate-500 font-medium">
                              Strand: <span className="font-bold text-slate-800">{book.strand}</span>
                            </p>

                            {/* Target Book Scope & Editions Breakdown Grid */}
                            <div className="pt-2 border-t border-slate-100 space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-600">
                                <span className="uppercase tracking-wider">Target Scope & Editions:</span>
                                <button
                                  onClick={() => setEditionModalBook(book)}
                                  className="text-emerald-700 hover:underline cursor-pointer"
                                >
                                  Details →
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-1 text-[10px]">
                                {TARGET_EDITIONS.map((ed) => (
                                  <button
                                    key={ed.id}
                                    onClick={() => {
                                      if (onOpenPurchase) {
                                        onOpenPurchase(book, ed.id);
                                      } else {
                                        onSelectBook(book);
                                      }
                                    }}
                                    className={`px-2 py-1 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${ed.border} hover:scale-102`}
                                    title={`${ed.title}: ${ed.breakdown}`}
                                  >
                                    <span className="font-black text-slate-800 flex items-center gap-1 truncate">
                                      <span>{ed.icon}</span>
                                      <span className="truncate">{ed.title}</span>
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="text-[11px] text-slate-400 pt-1">
                              School: {book.branding?.schoolName}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                            <button
                              onClick={() => onSelectBook(book)}
                              className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Open Book</span>
                            </button>
                            {onOpenPurchase && (
                              <button
                                onClick={() => onOpenPurchase(book, 'Full Book')}
                                className="py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                                title="Purchase Access or STK Push Download"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>49 KES</span>
                              </button>
                            )}
                            <button
                              onClick={() => {
                                onSelectBook(book);
                                window.print();
                              }}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition cursor-pointer"
                              title="Print or Export PDF"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FLAT GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
              <span>Showing {filteredBooks.length} books</span>
              {selectedSubjectTab !== 'all' && (
                <button
                  onClick={() => setSelectedSubjectTab('all')}
                  className="text-emerald-700 hover:underline font-extrabold"
                >
                  Clear Subject Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => {
                const key = getSubjectThemeKey(book.subject);
                const theme = SUBJECT_THEMES[key] || SUBJECT_THEMES.general;

                return (
                  <div
                    key={book.id}
                    className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-lg transition space-y-3 flex flex-col justify-between ${theme.accentBar}`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
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

                      {/* Target Book Scope & Editions Breakdown Grid */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-600">
                          <span className="uppercase tracking-wider">Target Scope & Editions:</span>
                          <button
                            onClick={() => setEditionModalBook(book)}
                            className="text-emerald-700 hover:underline cursor-pointer"
                          >
                            Details →
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                          {TARGET_EDITIONS.map((ed) => (
                            <button
                              key={ed.id}
                              onClick={() => {
                                if (onOpenPurchase) {
                                  onOpenPurchase(book, ed.id);
                                } else {
                                  onSelectBook(book);
                                }
                              }}
                              className={`px-2 py-1 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${ed.border} hover:scale-102`}
                              title={`${ed.title}: ${ed.breakdown}`}
                            >
                              <span className="font-black text-slate-800 flex items-center gap-1 truncate">
                                <span>{ed.icon}</span>
                                <span className="truncate">{ed.title}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 pt-1">
                        School: {book.branding?.schoolName}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onSelectBook(book)}
                        className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Open Book</span>
                      </button>
                      {onOpenPurchase && (
                        <button
                          onClick={() => onOpenPurchase(book, 'Full Book')}
                          className="py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                          title="Purchase Access or STK Push Download"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>49 KES</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onSelectBook(book);
                          window.print();
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition cursor-pointer"
                        title="Print or Export PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* TARGET BOOK SCOPE & EDITION BREAKDOWN MODAL */}
      {editionModalBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden text-slate-900 animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setEditionModalBook(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/10 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-950" /> Target Edition Matrix
                </span>
                <span className="text-xs text-slate-300 font-bold">{editionModalBook.grade}</span>
              </div>

              <h2 className="text-lg font-black text-white">{editionModalBook.title}</h2>
              <p className="text-xs text-slate-300 mt-1">
                Choose a specific Target Scope & Edition below to view or purchase via Safaricom M-Pesa STK Push.
              </p>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3">
                {TARGET_EDITIONS.map((ed) => (
                  <div
                    key={ed.id}
                    className={`p-4 rounded-2xl border space-y-2 transition ${ed.border} hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{ed.icon}</span>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">{ed.title}</h3>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border inline-block ${ed.badge}`}>
                            {ed.breakdown}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        {ed.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">{ed.description}</p>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditionModalBook(null);
                          onSelectBook(editionModalBook);
                        }}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Preview Scope</span>
                      </button>

                      {onOpenPurchase && (
                        <button
                          onClick={() => {
                            const b = editionModalBook;
                            setEditionModalBook(null);
                            onOpenPurchase(b, ed.id);
                          }}
                          className={`py-2 px-4 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${ed.btnBg}`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Get {ed.title} (49 KES)</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


