import React, { useState } from 'react';
import { BookOpen, Download, Star, Filter, Eye, Layers, GraduationCap } from 'lucide-react';
import { CBCFullBook, GradeLevel } from '../types';

interface GradePageViewProps {
  books: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
}

export const GradePageView: React.FC<GradePageViewProps> = ({ books, onSelectBook }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Grade 4');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const ALL_GRADES: GradeLevel[] = [
    'PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3',
    'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8',
    'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Teacher Resources'
  ];

  const gradeBooks = books.filter((b) => b.grade === selectedGrade);

  const filteredBooks = gradeBooks.filter((b) => {
    if (selectedSubject === 'All') return true;
    return b.subject === selectedSubject;
  });

  // Extract unique subjects available in this grade
  const subjectsInGrade = Array.from(new Set(gradeBooks.map((b) => b.subject)));

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-teal-400/30">
            Grade Portal Explorer
          </span>
          <span className="text-xs text-slate-400 font-semibold">{selectedGrade} Curriculum Syllabus</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          {selectedGrade} Learning Resources & Subject Books
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Explore complete textbooks, holiday homework workbooks, exam revision kits, and teacher guides tailored specifically for {selectedGrade}.
        </p>
      </div>

      {/* Grade Selector Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          <span>Select Grade Level</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_GRADES.map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGrade(g);
                setSelectedSubject('All');
              }}
              className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                selectedGrade === g
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter Bar */}
      {subjectsInGrade.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-extrabold text-slate-500 shrink-0">Filter Subject:</span>
          <button
            onClick={() => setSelectedSubject('All')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${
              selectedSubject === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Subjects ({gradeBooks.length})
          </button>
          {subjectsInGrade.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 ${
                selectedSubject === sub ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Books & Subject Cards Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {book.subject}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.9</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  Strand: <span className="text-slate-800 font-bold">{book.strand}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl text-slate-600 border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-semibold">Pages / Format</span>
                    <span className="font-bold text-slate-800">12 Pages • A4 Printable</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Downloads</span>
                    <span className="font-bold text-slate-800">1,240 Copies</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectBook(book)}
                  className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open & Read</span>
                </button>
                <button
                  onClick={() => {
                    onSelectBook(book);
                    window.print();
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center gap-1"
                  title="Print / PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Published Books Found for {selectedGrade}</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You can generate a new coursebook or holiday homework workbook instantly using the AI Generator Studio.
          </p>
        </div>
      )}

    </div>
  );
};
