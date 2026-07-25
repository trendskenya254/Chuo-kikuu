import React, { useState } from 'react';
import { Search, Filter, BookOpen, Download, Star, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CBCFullBook, CurriculumSystem, GradeLevel } from '../types';

interface SmartSearchViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  initialQuery?: string;
}

export const SmartSearchView: React.FC<SmartSearchViewProps> = ({
  books,
  onSelectBook,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [curriculumFilter, setCurriculumFilter] = useState<string>('All');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'title'>('newest');

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

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            Internal Education Brain Search Engine
          </span>
          <span className="text-xs text-slate-400 font-semibold">{sortedBooks.length} Books Found</span>
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
            placeholder="Search by topic, strand, grade, subject, or school..."
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
              <option value="All">All Grades</option>
              <option value="PP1">PP1</option>
              <option value="PP2">PP2</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
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
              <option value="Science">Science & Tech</option>
              <option value="Agriculture">Agriculture & Nutrition</option>
              <option value="English">English</option>
              <option value="Kiswahili">Kiswahili</option>
              <option value="Environmental">Environmental Activities</option>
              <option value="Coding">Coding, Robotics & AI</option>
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
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-2 text-slate-500">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Matching Books Found</h3>
          <p className="text-xs">Try adjusting your search query or criteria filters above.</p>
        </div>
      )}

    </div>
  );
};
