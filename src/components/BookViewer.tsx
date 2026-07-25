import React, { useState } from 'react';
import { BookOpen, UserCheck, GraduationCap, FileText, Printer, Award, Layers, Share2, Check, Download, FileCode, CheckSquare, Square, Eye, EyeOff, Maximize2, Minimize2, Tv, Highlighter, Link2, SlidersHorizontal, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';
import { CBCFullBook } from '../types';
import { CoverPageView } from './CoverPageView';
import { TeacherGuideView } from './TeacherGuideView';
import { StudentTextbookView } from './StudentTextbookView';
import { WorksheetsView } from './WorksheetsView';
import { FlashcardsView } from './FlashcardsView';
import { ExternalResourcesView } from './ExternalResourcesView';
import { ProgressAndTrackerView } from './ProgressAndTrackerView';
import { TeacherStickyNotes, PageStickyOverlay } from './TeacherStickyNotes';
import { AIProcessingProgress } from './AIProcessingProgress';
import { downloadBookAsMarkdown, convertBookToMarkdown } from '../utils/markdownExporter';

interface BookViewerProps {
  book: CBCFullBook;
  onOpenBranding: () => void;
  onPrint: () => void;
  isQueued?: boolean;
  onToggleQueue?: () => void;
}

export type ActiveTab = 'all' | 'cover' | 'teacher' | 'student' | 'worksheets' | 'flashcards' | 'resources' | 'tracker';

export const BookViewer: React.FC<BookViewerProps> = ({
  book,
  onOpenBranding,
  onPrint,
  isQueued = false,
  onToggleQueue,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [copiedMd, setCopiedMd] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [showPrintCustomizer, setShowPrintCustomizer] = useState(false);
  const [showProcessingBanner, setShowProcessingBanner] = useState(book.isProcessing ?? false);

  // Section visibility state for real-time print preview customization
  const [sections, setSections] = useState({
    cover: true,
    overview: true,
    teacher: true,
    student: true,
    worksheets: true,
    answers: true,
    flashcards: true,
    resources: true,
    tracker: true,
    stickyNotes: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyPreset = (type: 'all' | 'student' | 'teacher' | 'worksheets') => {
    if (type === 'all') {
      setSections({
        cover: true, overview: true, teacher: true, student: true,
        worksheets: true, answers: true, flashcards: true, resources: true,
        tracker: true, stickyNotes: true,
      });
    } else if (type === 'student') {
      setSections({
        cover: true, overview: true, teacher: false, student: true,
        worksheets: true, answers: false, flashcards: true, resources: true,
        tracker: false, stickyNotes: false,
      });
    } else if (type === 'teacher') {
      setSections({
        cover: true, overview: true, teacher: true, student: true,
        worksheets: true, answers: true, flashcards: true, resources: true,
        tracker: true, stickyNotes: true,
      });
    } else if (type === 'worksheets') {
      setSections({
        cover: false, overview: false, teacher: false, student: false,
        worksheets: true, answers: false, flashcards: false, resources: false,
        tracker: false, stickyNotes: false,
      });
    }
  };

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Full Printable Book', icon: <Printer className="w-4 h-4" /> },
    { id: 'cover', label: 'Cover Page', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'teacher', label: 'Teacher Guide', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'student', label: 'Student Textbook', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'worksheets', label: 'Worksheets & Quiz', icon: <Award className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources & Drawings', icon: <Link2 className="w-4 h-4" /> },
    { id: 'tracker', label: 'Progress & Remarks', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleCopyMarkdown = () => {
    const md = convertBookToMarkdown(book);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    downloadBookAsMarkdown(book);
  };

  return (
    <div className={`space-y-6 transition-all duration-300 ${isFocusMode ? 'fixed inset-0 z-50 bg-slate-900 text-slate-100 p-6 md:p-10 overflow-y-auto font-serif' : ''}`}>
      
      {/* Top Controls & Navigation Bar */}
      <div className={`rounded-2xl border transition-all print:hidden flex flex-col md:flex-row items-center justify-between gap-4 ${
        isFocusMode
          ? 'bg-slate-800/90 backdrop-blur-md border-slate-700 p-3 shadow-xl sticky top-0 z-50 font-sans'
          : 'bg-white border-slate-200 shadow-sm p-4'
      }`}>
        
        {/* Navigation Tabs */}
        <div className={`flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 rounded-xl border scrollbar-none ${
          isFocusMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isFocusMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 flex-wrap font-sans">
          
          {/* Text Highlighter Toggle Button */}
          <button
            onClick={() => setIsHighlighterActive(!isHighlighterActive)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl border transition cursor-pointer shadow-sm ${
              isHighlighterActive
                ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-400/40'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
            }`}
            title="Highlight important text paragraphs during live classroom presentations"
          >
            <Highlighter className="w-4 h-4 text-amber-700" />
            <span>{isHighlighterActive ? 'Highlighter ON' : 'Highlighter Tool'}</span>
          </button>

          {/* Print Section Customizer Toggle */}
          {activeTab === 'all' && (
            <button
              onClick={() => setShowPrintCustomizer(!showPrintCustomizer)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                showPrintCustomizer
                  ? 'bg-blue-100 text-blue-900 border-blue-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Toggle off specific sections before printing custom handouts"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Customize Print</span>
            </button>
          )}

          {/* Focus Mode Toggle Button */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl border transition cursor-pointer shadow-sm ${
              isFocusMode
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
            }`}
            title="Toggle Classroom Focus / Presentation Mode"
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-indigo-600" />}
            <span>{isFocusMode ? 'Exit Focus Mode' : 'Classroom Focus Mode'}</span>
          </button>

          {!isFocusMode && onToggleQueue && (
            <button
              onClick={onToggleQueue}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                isQueued
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Add this coursebook to the batch print queue"
            >
              {isQueued ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4 text-slate-400" />}
              <span>{isQueued ? 'In Batch Queue' : 'Add to Queue'}</span>
            </button>
          )}

          {!isFocusMode && (
            <>
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                title="Copy entire coursebook as Markdown text"
              >
                {copiedMd ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedMd ? 'Copied Markdown' : 'Copy Markdown'}</span>
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition cursor-pointer"
                title="Download offline Markdown file (.md)"
              >
                <Download className="w-4 h-4" />
                <span>Export .MD</span>
              </button>
            </>
          )}

          <button
            onClick={onPrint}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl text-white shadow-md transition cursor-pointer ${
              isFocusMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>

        </div>

      </div>

      {/* AI Post-Generation & Indexing Progress Banner */}
      {(showProcessingBanner || book.isProcessing) && (
        <AIProcessingProgress
          bookTitle={book.title}
          isCompleted={book.qualityStatus === 'Approved'}
          onComplete={() => setShowProcessingBanner(false)}
        />
      )}

      {/* Highlighter Mode Active Banner */}
      {isHighlighterActive && (
        <div className="bg-amber-100 border-2 border-amber-300 text-amber-950 p-3 rounded-xl flex items-center justify-between text-xs font-bold shadow-xs print:hidden">
          <div className="flex items-center gap-2">
            <Highlighter className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Highlighter Tool Active: Yellow marker highlight overlay will emphasize key concepts during classroom presentation!
            </span>
          </div>
          <button
            onClick={() => setIsHighlighterActive(false)}
            className="text-[11px] bg-amber-200 hover:bg-amber-300 px-2.5 py-1 rounded-lg text-amber-900 cursor-pointer"
          >
            Turn Off
          </button>
        </div>
      )}

      {/* Real-time Print Section Customizer Drawer */}
      {showPrintCustomizer && activeTab === 'all' && (
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 print:hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Customize Print & PDF Handout Sections
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-400/30">
                {Object.values(sections).filter(Boolean).length} of {Object.keys(sections).length} Sections Active
              </span>
              <button
                onClick={() => setShowPrintCustomizer(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Toggle specific sections or answer keys on/off before downloading or printing the PDF version:
          </p>

          {/* Quick Preset Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap border-b border-slate-800 pb-3">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Quick Presets:</span>
            <button
              onClick={() => applyPreset('all')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold rounded-lg border border-slate-700 cursor-pointer"
            >
              Select All
            </button>
            <button
              onClick={() => applyPreset('student')}
              className="px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-[11px] font-bold rounded-lg border border-emerald-800/80 cursor-pointer"
            >
              Student Edition (No Answers)
            </button>
            <button
              onClick={() => applyPreset('teacher')}
              className="px-2.5 py-1 bg-blue-950/80 hover:bg-blue-900 text-blue-200 text-[11px] font-bold rounded-lg border border-blue-800/80 cursor-pointer"
            >
              Teacher Edition (Complete)
            </button>
            <button
              onClick={() => applyPreset('worksheets')}
              className="px-2.5 py-1 bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-[11px] font-bold rounded-lg border border-amber-800/80 cursor-pointer"
            >
              Worksheets Only
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-bold">
            {[
              { key: 'cover' as const, label: '1. Cover Page' },
              { key: 'overview' as const, label: '2. Table of Contents' },
              { key: 'teacher' as const, label: '3. Teacher Guide' },
              { key: 'student' as const, label: '4. Student Textbook' },
              { key: 'worksheets' as const, label: '5. Worksheets & Quiz' },
              { key: 'answers' as const, label: '6. Answer Keys' },
              { key: 'flashcards' as const, label: '7. Flashcards' },
              { key: 'resources' as const, label: '8. Resources & Drawings' },
              { key: 'tracker' as const, label: '9. Progress & Remarks' },
              { key: 'stickyNotes' as const, label: '10. Sticky Teacher Notes' },
            ].map((sec) => {
              const isChecked = sections[sec.key];
              return (
                <button
                  type="button"
                  key={sec.key}
                  onClick={() => toggleSection(sec.key)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                    isChecked
                      ? 'bg-blue-600/30 border-blue-500 text-white'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 line-through'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area based on Active Tab */}
      <div className={`print-container transition-all ${
        isFocusMode ? 'max-w-4xl mx-auto bg-white text-slate-900 p-8 md:p-14 rounded-3xl shadow-2xl border border-slate-200 font-serif leading-relaxed' : ''
      } ${isHighlighterActive ? 'selection:bg-amber-300 selection:text-slate-950' : ''}`}>
        
        {/* VIEW 1: FULL PRINTABLE BOOK (ALL SECTIONS STACKED WITH PRINT PAGE-BREAKS) */}
        {activeTab === 'all' && (
          <div className="space-y-12 print:space-y-0">
            {/* 1. Cover Page */}
            {sections.cover && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 1 - Cover Page" />
                <CoverPageView book={book} />
              </div>
            )}

            {/* 2. Overview & Table of Contents */}
            {sections.overview && (
              <div className="relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="General / All Pages" />
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block font-sans">
                      Curriculum Overview & Architecture
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">Table of Contents & Module Structure</h2>
                  </div>
                  <div className="flex items-center gap-2 font-sans">
                    <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full border ${
                      book.difficultyLevel === 'Remedial'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : book.difficultyLevel === 'Enrichment'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}>
                      {book.difficultyLevel || 'Standard'}
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      {book.grade} • {book.subject}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-extrabold text-slate-900 uppercase mb-2">Section 1: Teacher Instructional Guide</h3>
                    <ul className="space-y-1.5 text-slate-700">
                      <li>• Curriculum Alignment Matrix (Core Competencies & Values)</li>
                      <li>• Key Inquiry Questions (KIQs) & PCIs</li>
                      <li>• Timetabled 40-Minute Step-by-Step Lesson Plan</li>
                      <li>• Differentiated Learning Strategies</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-extrabold text-slate-900 uppercase mb-2">Section 2: Student Textbook & Practicals</h3>
                    <ul className="space-y-1.5 text-slate-700">
                      <li>• In-depth Explanatory Content & Diagrams</li>
                      <li>• Key Vocabulary & CBC Did You Know Callouts</li>
                      <li>• Group Practical Collaborative Investigations</li>
                      <li>• Home-Based Community Extended Learning Tasks</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-extrabold text-slate-900 uppercase mb-2">Section 3: Assessment & Rubrics</h3>
                    <ul className="space-y-1.5 text-slate-700">
                      <li>• Formative Worksheet Questions & CATs</li>
                      <li>• 5-Question Master Comprehension Quiz with Answer Key</li>
                      <li>• Official 4-Tier CBC Assessment Rubric Matrix</li>
                      <li>• Teacher Answer Keys & Marking Scheme</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-extrabold text-slate-900 uppercase mb-2">Section 4: Revision, Flashcards & Resources</h3>
                    <ul className="space-y-1.5 text-slate-700">
                      <li>• Printable Key Term Flashcards</li>
                      <li>• External References, Video Links & Teacher Notes</li>
                      <li>• Playful Student Drawing & Observation Templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Teacher Guide */}
            {sections.teacher && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 2 - Teacher Guide" />
                <TeacherGuideView book={book} />
              </div>
            )}

            {/* 4. Student Textbook */}
            {sections.student && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 3 - Student Textbook" />
                <StudentTextbookView book={book} />
              </div>
            )}

            {/* 5. Worksheets & Rubrics */}
            {sections.worksheets && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 4 - Worksheets & Quiz" />
                <WorksheetsView book={book} />
              </div>
            )}

            {/* 6. Flashcards */}
            {sections.flashcards && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 5 - Flashcards" />
                <FlashcardsView book={book} />
              </div>
            )}

            {/* 7. Resources & Drawing Activity */}
            {sections.resources && (
              <div className="relative page-break-after-always">
                <ExternalResourcesView book={book} />
              </div>
            )}

            {/* 8. Progress Tracker, Teacher Remarks & Parent Feedback */}
            {sections.tracker && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 6 - Remarks & Tracker" />
                <ProgressAndTrackerView book={book} />
              </div>
            )}

            {/* 9. Teacher Sticky Notes & Digital Stickies */}
            {sections.stickyNotes && (
              <div>
                <TeacherStickyNotes book={book} />
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: INDIVIDUAL TABS */}
        {activeTab === 'cover' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 1 - Cover Page" />
            <CoverPageView book={book} />
          </div>
        )}
        {activeTab === 'teacher' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 2 - Teacher Guide" />
            <TeacherGuideView book={book} />
          </div>
        )}
        {activeTab === 'student' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 3 - Student Textbook" />
            <StudentTextbookView book={book} />
          </div>
        )}
        {activeTab === 'worksheets' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 4 - Worksheets & Quiz" />
            <WorksheetsView book={book} />
          </div>
        )}
        {activeTab === 'flashcards' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 5 - Flashcards" />
            <FlashcardsView book={book} />
          </div>
        )}
        {activeTab === 'resources' && <ExternalResourcesView book={book} />}
        {activeTab === 'tracker' && (
          <div className="space-y-6 relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 6 - Remarks & Tracker" />
            <ProgressAndTrackerView book={book} />
            <TeacherStickyNotes book={book} />
          </div>
        )}

      </div>

    </div>
  );
};
