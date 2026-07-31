import React, { useState } from 'react';
import { Search, Printer, Settings, Plus, Layers, GraduationCap, X, CheckSquare, Rocket, Sparkles } from 'lucide-react';
import { CBCFullBook } from '../types';

interface HeaderProps {
  currentBook: CBCFullBook | null;
  savedBooks: CBCFullBook[];
  onSelectBook: (book: CBCFullBook) => void;
  onOpenGenerator: () => void;
  onOpenBranding: () => void;
  onPrint: () => void;
  queuedBookIds: string[];
  onOpenPrintQueue: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenPackager?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBook,
  savedBooks,
  onSelectBook,
  onOpenGenerator,
  onOpenBranding,
  onPrint,
  queuedBookIds,
  onOpenPrintQueue,
  searchQuery,
  onSearchChange,
  onOpenPackager,
}) => {
  const filteredBooks = savedBooks.filter((book) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.subject.toLowerCase().includes(q) ||
      book.grade.toLowerCase().includes(q) ||
      book.strand.toLowerCase().includes(q) ||
      book.branding.teacherName.toLowerCase().includes(q) ||
      book.branding.schoolName.toLowerCase().includes(q)
    );
  });

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-900 shadow-xs border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm italic">
            CBC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-black tracking-tight leading-none text-slate-800 uppercase">
                CBC ARCHITECT
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Kenya CBC Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block mt-0.5">
              Standardized Lesson Plans, Worksheets & Assessment Rubrics Studio
            </p>
          </div>
        </div>

        {/* Center: Search & Book Selection Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search saved books by title, grade, subject..."
            className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Selector dropdown */}
          <select
            value={currentBook?.id || ''}
            onChange={(e) => {
              const selected = savedBooks.find((b) => b.id === e.target.value);
              if (selected) onSelectBook(selected);
            }}
            className="bg-white border border-slate-200 text-xs text-slate-800 font-semibold rounded-lg px-2 py-1 focus:outline-none cursor-pointer max-w-[160px] truncate shrink-0"
          >
            {filteredBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.grade} • {book.title.slice(0, 22)}...
              </option>
            ))}
          </select>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <button
            onClick={onOpenBranding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
            title="Configure School Name & Branding"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Branding</span>
          </button>

          <button
            onClick={onPrint}
            disabled={!currentBook}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white shadow-sm transition cursor-pointer"
            title="Download PDF or Print Active Book"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

        </div>

      </div>
    </header>
  );
};
