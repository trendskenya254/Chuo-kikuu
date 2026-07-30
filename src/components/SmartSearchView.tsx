import React, { useState } from 'react';
import { Search, Filter, BookOpen, Download, Star, SlidersHorizontal, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';
import { CBCFullBook, CurriculumSystem, GradeLevel, CBCSubject } from '../types';
import { generateInternalCBCBook } from '../utils/internalAutoGenerator';

interface SmartSearchViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onSaveBook?: (newBook: CBCFullBook) => void;
  initialQuery?: string;
}

export const SmartSearchView: React.FC<SmartSearchViewProps> = ({
  books,
  onSelectBook,
  onSaveBook,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [curriculumFilter, setCurriculumFilter] = useState<string>('All');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'title'>('newest');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccessMsg, setGeneratedSuccessMsg] = useState('');

  const filteredBooks = books.filter((b) => {
    if (curriculumFilter !== 'All' && b.curriculumSystem && b.curriculumSystem !== curriculumFilter) {
      return false;
    }
    if (gradeFilter !== 'All' && b.grade !== gradeFilter) {
      return false;
    }
    if (subjectFilter !== 'All' && !b.subject.toLowerCase().includes(subjectFilter.toLowerCase())) {
      return false;
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.grade.toLowerCase().includes(q) ||
        b.strand.toLowerCase().includes(q) ||
        b.branding?.teacherName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleResetFilters = () => {
    setQuery('');
    setCurriculumFilter('All');
    setGradeFilter('All');
    setSubjectFilter('All');
    setSortBy('newest');
  };

  const handleAutoGenerateInternal = (targetTopic?: string) => {
    setIsGenerating(true);
    setGeneratedSuccessMsg('');

    setTimeout(() => {
      const topicToGenerate = targetTopic || query.trim() || `${gradeFilter !== 'All' ? gradeFilter : 'Grade 4'} ${subjectFilter !== 'All' ? subjectFilter : 'Core Curriculum'}`;
      const targetGradeVal: GradeLevel = gradeFilter !== 'All' ? (gradeFilter as GradeLevel) : 'Grade 4';
      const targetSubjVal: CBCSubject = subjectFilter !== 'All' ? (subjectFilter as CBCSubject) : 'Integrated Science';

      const newBook = generateInternalCBCBook(topicToGenerate, targetGradeVal, targetSubjVal);

      if (onSaveBook) {
        onSaveBook(newBook);
      }
      setIsGenerating(false);
      setGeneratedSuccessMsg(`⚡ Auto-generated and posted "${newBook.title}" to Library with all 4 Target Scopes!`);
      onSelectBook(newBook);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Internal Education Brain Search & Auto-Generator
            </span>
            <span className="text-xs text-slate-400 font-semibold">{sortedBooks.length} Books Found</span>
          </div>
          <button
            onClick={() => handleAutoGenerateInternal()}
            disabled={isGenerating}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>{isGenerating ? 'Generating Notes...' : 'Auto-Generate Missing Scope'}</span>
          </button>
        </div>

        <h2 className="text-2xl font-black text-white">
          Smart Library Search & Discovery
        </h2>

        {/* Input Bar */}
        <div className="mt-4 bg-white p-2 rounded-2xl shadow-lg flex items-center gap-2 text-slate-900">
          <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, strand, PP1 to Grade 12, subject, or school..."
            className="w-full text-sm font-semibold placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {generatedSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{generatedSuccessMsg}</span>
        </div>
      )}

      {/* Multi-Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5 font-extrabold text-slate-800 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <span>Multi-Criteria Filters</span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-slate-500 hover:text-emerald-700 font-bold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Curriculum Framework</label>
            <select
              value={curriculumFilter}
              onChange={(e) => setCurriculumFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="All">All Curriculums</option>
              <option value="CBC">CBC (Competency-Based)</option>
              <option value="8-4-4 (Archive)">8-4-4 Archive</option>
              <option value="Cambridge">Cambridge International</option>
              <option value="IGCSE">IGCSE</option>
              <option value="KCPE">KCPE Revision</option>
              <option value="KCSE">KCSE Framework</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Grade Level</label>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="All">All Grades (PP1 - Grade 12)</option>
              <option value="PP1">PP1 (Pre-Primary 1)</option>
              <option value="PP2">PP2 (Pre-Primary 2)</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10 Senior</option>
              <option value="Grade 11">Grade 11 Senior</option>
              <option value="Grade 12">Grade 12 Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Subject Area</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Integrated Science">Integrated Science</option>
              <option value="Agriculture & Nutrition">Agriculture & Nutrition</option>
              <option value="English Language Arts">English Language Arts</option>
              <option value="Kiswahili Language">Kiswahili Language</option>
              <option value="Environmental Activities">Environmental Activities</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Coding, Robotics & AI">Coding, Robotics & AI</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {sortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition space-y-3 flex flex-col justify-between"
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
      ) : (
        <div className="bg-white p-10 rounded-2xl border border-dashed border-amber-300 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Missing Curriculum Scope Detected!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              No matching books found for <span className="font-bold text-slate-800">"{query || gradeFilter || 'search'}"</span>. Our internal brain generator can automatically synthesize ready notes for PP1 to Grade 12 and post it directly to your Library!
            </p>
          </div>
          <button
            onClick={() => handleAutoGenerateInternal(query)}
            disabled={isGenerating}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-xl shadow-lg transition inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>{isGenerating ? 'Auto-Generating & Posting...' : `⚡ Auto-Generate Coursebook & Post to Library`}</span>
          </button>
        </div>
      )}

    </div>
  );
};
