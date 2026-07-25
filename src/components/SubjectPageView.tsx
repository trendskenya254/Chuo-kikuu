import React, { useState } from 'react';
import { BookOpen, Download, FileText, ChevronRight, Award, CheckCircle2, Bookmark, Share2 } from 'lucide-react';
import { CBCFullBook } from '../types';

interface SubjectPageViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onNavigateView: (view: string) => void;
}

export const SubjectPageView: React.FC<SubjectPageViewProps> = ({
  books,
  onSelectBook,
  onNavigateView,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');

  const CATEGORIES = [
    'All',
    'Teacher Notes',
    'Student Notes',
    'Holiday Homework',
    'Worksheets & Practice',
    'Exams & CATs',
    'Marking Schemes',
    'Lesson Plans',
    'Flashcards',
    'Projects & Competency'
  ];

  const SUBJECTS = [
    'Mathematics',
    'Science & Technology',
    'Agriculture & Nutrition',
    'English Language Arts',
    'Kiswahili Language',
    'Social Studies',
    'Environmental Activities',
    'Coding, Robotics & AI',
    'Creative Arts & Sports',
    'Financial Literacy'
  ];

  const subjectBooks = books.filter((b) => b.subject.toLowerCase().includes(selectedSubject.toLowerCase()) || selectedSubject === 'All');

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-white px-4 py-2.5 rounded-xl border border-slate-200">
        <button onClick={() => onNavigateView('landing')} className="hover:text-emerald-700">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button onClick={() => onNavigateView('library')} className="hover:text-emerald-700">Library</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{selectedSubject} Materials</span>
      </div>

      {/* Subject Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-2xl border border-teal-800 shadow-md">
        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
          Subject Knowledge Hub
        </span>
        <h2 className="text-2xl font-black text-white mt-1">
          {selectedSubject} Curriculum Repository
        </h2>
        <p className="text-xs text-teal-100 mt-1 max-w-2xl">
          Complete repository of standardized teacher instructional guides, student explanatory notes, holiday assignments, topical CATs, and marking schemes for {selectedSubject}.
        </p>

        {/* Subject Switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 text-xs">
          {SUBJECTS.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition ${
                selectedSubject === sub
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 font-black rounded-xl shrink-0 transition ${
              activeCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Books List / Grid */}
      <div className="space-y-4">
        {subjectBooks.length > 0 ? (
          subjectBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {book.grade}
                  </span>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {book.bookCategory || 'Student Textbook & Notes'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{book.title}</h3>
                <p className="text-xs text-slate-500">
                  Strand: <span className="font-bold text-slate-800">{book.strand}</span> • Sub-strand: {book.subStrand}
                </p>
                <div className="text-[11px] text-slate-400 font-medium pt-1">
                  Author: {book.branding?.teacherName} • School: {book.branding?.schoolName}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onSelectBook(book)}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Book</span>
                </button>
                <button
                  onClick={() => {
                    onSelectBook(book);
                    window.print();
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 space-y-2">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Materials Found in {selectedSubject}</h3>
            <p className="text-xs">Use the AI Book Generator to generate a new book for this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};
