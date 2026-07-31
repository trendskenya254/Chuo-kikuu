import React, { useState, useEffect } from 'react';
import { BookOpen, UserCheck, GraduationCap, FileText, Printer, Award, Layers, Share2, Check, Download, FileCode, CheckSquare, Square, Eye, EyeOff, Maximize2, Minimize2, Tv, Highlighter, Link2, SlidersHorizontal, Sparkles, MessageSquare, CheckCircle, ChevronDown, MoreHorizontal, Clock, Lock, ShieldAlert, Zap, ArrowLeft, ShieldCheck, StickyNote, Star, X, Plus } from 'lucide-react';
import { CBCFullBook, TargetAudience } from '../types';
import { CoverPageView } from './CoverPageView';
import { TeacherGuideView } from './TeacherGuideView';
import { StudentTextbookView } from './StudentTextbookView';
import { WorksheetsView } from './WorksheetsView';
import { FlashcardsView } from './FlashcardsView';
import { ExternalResourcesView } from './ExternalResourcesView';
import { ProgressAndTrackerView } from './ProgressAndTrackerView';
import { TeacherStickyNotes, PageStickyOverlay } from './TeacherStickyNotes';
import { AIProcessingProgress } from './AIProcessingProgress';
import { DownloadPackageModal } from './DownloadPackageModal';
import { downloadBookAsMarkdown, convertBookToMarkdown } from '../utils/markdownExporter';
import { ALL_BOOK_PAGES, getReadingProgress, markPageAsViewed, calculateProgressPercentage, saveReadingProgress } from '../lib/readingProgress';
import { PageNote, getBookNotes, addBookNote, deleteBookNote, clearBookNotes } from '../lib/pageNotes';

interface BookViewerProps {
  book: CBCFullBook;
  onOpenBranding: () => void;
  onPrint: () => void;
  isQueued?: boolean;
  onToggleQueue?: () => void;
  onOpenPurchase?: (book: CBCFullBook, scope?: TargetAudience) => void;
  onBackToLibrary?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string) => void;
}

export type ActiveTab = 'all' | 'cover' | 'teacher' | 'student' | 'worksheets' | 'flashcards' | 'resources' | 'tracker';

export const BookViewer: React.FC<BookViewerProps> = ({
  book,
  onOpenBranding,
  onPrint,
  isQueued = false,
  onToggleQueue,
  onOpenPurchase,
  onBackToLibrary,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [copiedMd, setCopiedMd] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [showPrintCustomizer, setShowPrintCustomizer] = useState(false);
  const [showProcessingBanner, setShowProcessingBanner] = useState(book.isProcessing ?? false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  // Accessible Font & Reader Controls
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [isSimpleEnglishMode, setIsSimpleEnglishMode] = useState<boolean>(true);
  const [isTopicsDrawerOpen, setIsTopicsDrawerOpen] = useState<boolean>(false);

  // Visual Reading Progress & Page Viewed Tracker State
  const [viewedPages, setViewedPages] = useState<string[]>(() => getReadingProgress(book.id));

  // Teacher Page Annotations & Notes Sidebar State
  const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState<boolean>(false);
  const [pageNotes, setPageNotes] = useState<PageNote[]>(() => getBookNotes(book.id));
  const [selectedNotePage, setSelectedNotePage] = useState<string>('Student Textbook');
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [newNoteTeacher, setNewNoteTeacher] = useState<string>('Mwalimu J. Mwangi');

  // Track page reading progress on mount or activeTab changes
  useEffect(() => {
    setViewedPages(getReadingProgress(book.id));
    setPageNotes(getBookNotes(book.id));
  }, [book.id]);

  useEffect(() => {
    if (activeTab === 'all') {
      const allPages = ['cover', 'teacher', 'student', 'worksheets', 'rubrics'];
      setViewedPages(allPages);
      saveReadingProgress(book.id, allPages);
    } else {
      let pageId = activeTab;
      if (['cover', 'teacher', 'student', 'worksheets', 'rubrics'].includes(pageId)) {
        const updated = markPageAsViewed(book.id, pageId);
        setViewedPages(updated);
      }
    }
  }, [activeTab, book.id]);

  const progressPercent = calculateProgressPercentage(viewedPages);

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const updated = addBookNote(book.id, selectedNotePage, newNoteText, newNoteTeacher);
    setPageNotes(updated);
    setNewNoteText('');
  };

  const handleDeleteNote = (noteId: string) => {
    const updated = deleteBookNote(book.id, noteId);
    setPageNotes(updated);
  };

  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all teacher notes for this book?')) {
      const updated = clearBookNotes(book.id);
      setPageNotes(updated);
    }
  };

  // User Session ID for Security Screen Capture Discouragement Overlay
  const [sessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'USER: michaelnyambumbogo@gmail.com • ID: KICD-SEC-94821';
    let sid = sessionStorage.getItem('cbc_user_session_id');
    if (!sid) {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      sid = `USER: michaelnyambumbogo@gmail.com • ID: KICD-SEC-${randomSuffix}`;
      sessionStorage.setItem('cbc_user_session_id', sid);
    }
    return sid;
  });

  // 2-Minute Preview Lock & Purchase State
  const [isPaid, setIsPaid] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(`cbc_paid_book_${book.id}`);
  });
  const [previewSecondsLeft, setPreviewSecondsLeft] = useState<number>(120);
  const [isPreviewLocked, setIsPreviewLocked] = useState<boolean>(false);

  useEffect(() => {
    const checkPaidStatus = () => {
      const paid = !!localStorage.getItem(`cbc_paid_book_${book.id}`);
      setIsPaid(paid);
    };
    checkPaidStatus();
    window.addEventListener('storage', checkPaidStatus);
    return () => window.removeEventListener('storage', checkPaidStatus);
  }, [book.id]);

  // 2-Minute (120s) Countdown timer for unpaid books
  useEffect(() => {
    if (isPaid) {
      setIsPreviewLocked(false);
      return;
    }

    setPreviewSecondsLeft(120);
    setIsPreviewLocked(false);

    const timer = setInterval(() => {
      setPreviewSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPreviewLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [book.id, isPaid]);

  // Anti-Copy & Keyboard Shortcut Trap (Preventing Unauthorized Copy/Screenshotting)
  const handlePreventCopy = (e: React.SyntheticEvent) => {
    if (!isPaid) {
      e.preventDefault();
      if (onOpenPurchase) {
        onOpenPurchase(book);
      }
      return false;
    }
  };

  const handleKeyDownTrap = (e: React.KeyboardEvent) => {
    if (!isPaid) {
      if ((e.ctrlKey || e.metaKey) && ['c', 'p', 's', 'u', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        alert('This CBC Document is protected under DRM. Please purchase via M-Pesa STK Push to enable copying, downloading, and printing!');
        if (onOpenPurchase) onOpenPurchase(book);
      }
    }
  };

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
    teacherRemarks: true,
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
        tracker: true, teacherRemarks: true, stickyNotes: true,
      });
    } else if (type === 'student') {
      setSections({
        cover: true, overview: true, teacher: false, student: true,
        worksheets: true, answers: false, flashcards: true, resources: true,
        tracker: false, teacherRemarks: false, stickyNotes: false,
      });
    } else if (type === 'teacher') {
      setSections({
        cover: true, overview: true, teacher: true, student: true,
        worksheets: true, answers: true, flashcards: true, resources: true,
        tracker: true, teacherRemarks: true, stickyNotes: true,
      });
    } else if (type === 'worksheets') {
      setSections({
        cover: false, overview: false, teacher: false, student: false,
        worksheets: true, answers: false, flashcards: false, resources: false,
        tracker: false, teacherRemarks: false, stickyNotes: false,
      });
    }
  };

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Full Printable Book', icon: <Printer className="w-4 h-4" /> },
    { id: 'teacher', label: 'Teacher Guide', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'student', label: 'Student Textbook', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'worksheets', label: 'Worksheets & Quiz', icon: <Award className="w-4 h-4" /> },
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
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 font-sans">
          
          {/* Favorite Toggle Button */}
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(book.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black rounded-xl border transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title={isFavorite ? 'Remove from Starred Favorites' : 'Add to Starred Favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Starred' : 'Favorite'}</span>
            </button>
          )}

          {!isFocusMode && (
            <button
              onClick={() => setShowPackageModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition cursor-pointer"
              title="Target Book Scope & Edition Selection (Full Book KES 49)"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Package (49 KES)</span>
            </button>
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

          {/* More Tools & Actions Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold rounded-xl border transition cursor-pointer ${
                isToolsDropdownOpen
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="More book viewer tools & options"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>More Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />

              {/* Active Indicator Dot if highlighter, customizer or queue is active */}
              {(isHighlighterActive || showPrintCustomizer || isQueued) && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              )}
            </button>

            {/* Click Outside Overlay Backdrop */}
            {isToolsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsToolsDropdownOpen(false)}
                />

                {/* Dropdown Content */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 p-2 space-y-1 text-slate-800 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Interactive Presentation
                  </div>

                  {/* Text Highlighter Toggle */}
                  <button
                    onClick={() => {
                      setIsHighlighterActive(!isHighlighterActive);
                      setIsToolsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl transition cursor-pointer text-left ${
                      isHighlighterActive ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Highlighter className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-bold">Highlighter Tool</div>
                        <div className="text-[10px] text-slate-400 font-normal">Highlight text in live class</div>
                      </div>
                    </div>
                    {isHighlighterActive && (
                      <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shrink-0">
                        ON
                      </span>
                    )}
                  </button>

                  {/* Customize Print */}
                  <button
                    onClick={() => {
                      if (!showPrintCustomizer && activeTab !== 'all') {
                        setActiveTab('all');
                      }
                      setShowPrintCustomizer(!showPrintCustomizer);
                      setIsToolsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl transition cursor-pointer text-left ${
                      showPrintCustomizer ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <SlidersHorizontal className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="font-bold">Customize Print</div>
                        <div className="text-[10px] text-slate-400 font-normal">Toggle sections before printing</div>
                      </div>
                    </div>
                    {showPrintCustomizer && (
                      <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full shrink-0">
                        OPEN
                      </span>
                    )}
                  </button>

                  {/* Classroom Focus Mode */}
                  <button
                    onClick={() => {
                      setIsFocusMode(!isFocusMode);
                      setIsToolsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer text-left"
                  >
                    {isFocusMode ? <Minimize2 className="w-4 h-4 text-indigo-600 shrink-0" /> : <Maximize2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                    <div>
                      <div className="font-bold">{isFocusMode ? 'Exit Focus Mode' : 'Classroom Focus Mode'}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Full screen presentation view</div>
                    </div>
                  </button>

                  {/* Batch Queue */}
                  {!isFocusMode && onToggleQueue && (
                    <button
                      onClick={() => {
                        onToggleQueue();
                        setIsToolsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition cursor-pointer text-left ${
                        isQueued ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isQueued ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                        <div>
                          <div className="font-bold">{isQueued ? 'In Batch Queue' : 'Add to Queue'}</div>
                          <div className="text-[10px] text-slate-400 font-normal">Queue for multi-book printing</div>
                        </div>
                      </div>
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1" />
                  <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Export & Share
                  </div>

                  {/* Copy Markdown */}
                  <button
                    onClick={() => {
                      handleCopyMarkdown();
                      setIsToolsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer text-left"
                  >
                    {copiedMd ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Share2 className="w-4 h-4 text-purple-600 shrink-0" />}
                    <div>
                      <div className="font-bold">{copiedMd ? 'Copied MD to Clipboard' : 'Copy as Markdown'}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Copy raw text content</div>
                    </div>
                  </button>

                  {/* Export .MD File */}
                  <button
                    onClick={() => {
                      handleDownloadMarkdown();
                      setIsToolsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer text-left"
                  >
                    <FileCode className="w-4 h-4 text-slate-600 shrink-0" />
                    <div>
                      <div className="font-bold">Export .MD File</div>
                      <div className="text-[10px] text-slate-400 font-normal">Download offline markdown file</div>
                    </div>
                  </button>

                </div>
              </>
            )}
          </div>

        </div>

      </div>

      {/* READER ACCESSIBILITY & ENHANCED TOPIC CONTROLS STRIP */}
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
        
        {/* Left: Font Selection & Font Size Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Font Style */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Font:</span>
            <button
              onClick={() => setFontStyle('sans')}
              className={`px-2.5 py-1 rounded-lg text-xs font-sans font-bold transition cursor-pointer ${
                fontStyle === 'sans' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sans
            </button>
            <button
              onClick={() => setFontStyle('serif')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition cursor-pointer ${
                fontStyle === 'serif' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Serif
            </button>
            <button
              onClick={() => setFontStyle('mono')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                fontStyle === 'mono' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Mono
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Size:</span>
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'sm' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition cursor-pointer ${
                fontSize === 'md' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Norm
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded text-sm font-bold transition cursor-pointer ${
                fontSize === 'lg' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>
        </div>

        {/* Right: Student Simple English Explanatory Mode & Topic Jumper Drawer Button */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Simple English Explanatory Mode Toggle */}
          <button
            onClick={() => setIsSimpleEnglishMode(!isSimpleEnglishMode)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center gap-1.5 border ${
              isSimpleEnglishMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle simplified learner explanations and definitions"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>💡 Student Simple English: {isSimpleEnglishMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Topics Table of Contents Quick Jumper Button */}
          <button
            onClick={() => setIsTopicsDrawerOpen(!isTopicsDrawerOpen)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 border ${
              isTopicsDrawerOpen
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Topics & Contents</span>
          </button>
        </div>

      </div>

      {/* TOPIC QUICK JUMPER DRAWER MODAL */}
      {isTopicsDrawerOpen && (
        <div className="bg-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150 print:hidden">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Book Topics & Table of Contents Quick Jumper</span>
            </h3>
            <button
              onClick={() => setIsTopicsDrawerOpen(false)}
              className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {book.chapters.map((ch, idx) => (
              <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-2">
                <div className="font-extrabold text-amber-300">
                  Chapter {ch.chapterNumber}: {ch.title}
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>• Sub-strand: <strong>{ch.subStrand}</strong></div>
                  <div>• {ch.keyInquiryQuestions?.length || 0} Key Inquiry Questions</div>
                  <div>• {ch.textbookContent?.length || 0} Reading Sections</div>
                  <div>• {ch.worksheetQuestions?.length || 0} Worksheet CAT Questions</div>
                </div>
                <div className="flex gap-1 pt-1">
                  <button
                    onClick={() => { setActiveTab('student'); setIsTopicsDrawerOpen(false); }}
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg transition flex-1 cursor-pointer"
                  >
                    Read Textbook
                  </button>
                  <button
                    onClick={() => { setActiveTab('worksheets'); setIsTopicsDrawerOpen(false); }}
                    className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold rounded-lg transition flex-1 cursor-pointer"
                  >
                    CAT Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs font-bold">
            {[
              { key: 'cover' as const, label: '1. Cover Page' },
              { key: 'overview' as const, label: '2. Table of Contents' },
              { key: 'teacher' as const, label: '3. Teacher Guide' },
              { key: 'student' as const, label: '4. Student Textbook' },
              { key: 'worksheets' as const, label: '5. Worksheets & Quiz' },
              { key: 'answers' as const, label: '6. Answer Keys' },
              { key: 'flashcards' as const, label: '7. Flashcards' },
              { key: 'resources' as const, label: '8. Resources & Drawings' },
              { key: 'tracker' as const, label: '9. Progress Tracker' },
              { key: 'teacherRemarks' as const, label: '10. Teacher Remarks' },
              { key: 'stickyNotes' as const, label: '11. Sticky Teacher Notes' },
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

      {/* 2-Minute Free Sample Preview Countdown Banner */}
      {!isPaid && !isPreviewLocked && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-3 rounded-2xl shadow-md border border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950/20 flex items-center justify-center text-slate-950 animate-pulse">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-slate-950 uppercase tracking-wide">Free 2-Minute Review Mode:</span>{' '}
              <span className="font-mono text-sm bg-slate-950 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-400 font-black">
                {Math.floor(previewSecondsLeft / 60)}:{(previewSecondsLeft % 60).toString().padStart(2, '0')}
              </span>{' '}
              <span className="text-slate-950 hidden sm:inline">remaining before preview locks.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenPurchase && (
              <button
                onClick={() => onOpenPurchase(book)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 text-xs font-black shadow transition flex items-center gap-1.5 cursor-pointer border border-amber-400/40"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Buy Now via M-Pesa (KES 49)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area based on Active Tab OR Locked Screen */}
      {isPreviewLocked && !isPaid ? (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 print:hidden my-8">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
          
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              2-Minute Free Sample Review Expired
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Preview Time Limit Reached for "{book.title}"
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              You have completed your 2-minute free sample review of this official KICD Competency-Based Curriculum document. To unlock full reading access, complete schemes of work, timetabled lesson plans, student worksheets, and print/PDF export privileges, complete instant M-Pesa purchase.
            </p>
          </div>

          {/* Pricing & Target Edition Selection preview card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-lg mx-auto flex items-center justify-between text-left">
            <div>
              <span className="text-[11px] text-slate-500 font-extrabold block uppercase tracking-wide">Document Price</span>
              <span className="text-xl font-black text-emerald-800">KES 49.00</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black border border-emerald-300 inline-block">
                M-Pesa STK Push
              </span>
              <span className="text-xs text-slate-500 block font-bold mt-0.5">Instant STK Prompt & Unlock</span>
            </div>
          </div>

          {/* Primary Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            {onOpenPurchase && (
              <button
                onClick={() => onOpenPurchase(book)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-xl transition flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                <span>⚡ Buy Now via M-Pesa STK Push</span>
              </button>
            )}
            {onBackToLibrary && (
              <button
                onClick={onBackToLibrary}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back to Library</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div 
          onContextMenu={handlePreventCopy}
          onCopy={handlePreventCopy}
          onCut={handlePreventCopy}
          onKeyDown={handleKeyDownTrap}
          tabIndex={0}
          className={`print-container transition-all relative ${
            !isPaid ? 'select-none' : ''
          } ${
            isFocusMode ? 'max-w-4xl mx-auto bg-white text-slate-900 p-8 md:p-14 rounded-3xl shadow-2xl border border-slate-200 font-serif leading-relaxed' : ''
          } ${isHighlighterActive ? 'selection:bg-amber-300 selection:text-slate-950' : ''}`}
        >
          {/* Semi-Transparent Repeating User & Session Security Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden select-none opacity-10 flex flex-col justify-around py-12 rotate-[-20deg]">
            {Array.from({ length: 14 }).map((_, idx) => (
              <div key={idx} className="whitespace-nowrap font-mono text-xs sm:text-sm font-black tracking-widest text-slate-900 uppercase flex justify-between gap-12">
                <span>{sessionId} • KICD CBC PROTECTED DOCUMENT</span>
                <span>{sessionId} • KICD CBC PROTECTED DOCUMENT</span>
                <span>{sessionId} • KICD CBC PROTECTED DOCUMENT</span>
              </div>
            ))}
          </div>

          {/* DRM Watermark Overlay for Unpaid Documents */}
          {!isPaid && (
            <div className="absolute inset-0 pointer-events-none z-30 opacity-15 flex items-center justify-center overflow-hidden rotate-[-25deg] select-none">
              <div className="text-slate-900 text-2xl font-black uppercase tracking-widest text-center space-y-24">
                <div>ELIB DIGITAL BOOKSTORE • KICD CBC PREVIEW • STRICTLY PROTECTED</div>
                <div>2-MINUTE FREE PREVIEW MODE • BUY VIA M-PESA TO UNLOCK</div>
                <div>ELIB DIGITAL BOOKSTORE • KICD CBC PREVIEW • STRICTLY PROTECTED</div>
              </div>
            </div>
          )}
        
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
                <StudentTextbookView
                  book={book}
                  isSimpleEnglishMode={isSimpleEnglishMode}
                  fontStyle={fontStyle}
                  fontSize={fontSize}
                />
              </div>
            )}

            {/* 5. Worksheets & Rubrics */}
            {sections.worksheets && (
              <div className="relative page-break-after-always">
                <PageStickyOverlay bookId={book.id} sectionName="Page 4 - Worksheets & Quiz" />
                <WorksheetsView book={book} showAnswerKeys={sections.answers} />
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
                <ProgressAndTrackerView book={book} showTeacherRemarks={sections.teacherRemarks} />
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
            <StudentTextbookView
              book={book}
              isSimpleEnglishMode={isSimpleEnglishMode}
              fontStyle={fontStyle}
              fontSize={fontSize}
            />
          </div>
        )}
        {activeTab === 'worksheets' && (
          <div className="relative">
            <PageStickyOverlay bookId={book.id} sectionName="Page 4 - Worksheets & Quiz" />
            <WorksheetsView book={book} showAnswerKeys={sections.answers} />
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
            <ProgressAndTrackerView book={book} showTeacherRemarks={sections.teacherRemarks} />
            <TeacherStickyNotes book={book} />
          </div>
        )}

      </div>
      )}

      {/* Target Book Scope & Edition Download Package Modal */}
      <DownloadPackageModal
        book={book}
        isOpen={showPackageModal}
        onClose={() => setShowPackageModal(false)}
        onPrintScope={(scope) => {
          applyPreset(scope === 'teacher' ? 'teacher' : scope === 'student' ? 'student' : scope === 'assessment' ? 'worksheets' : 'all');
          setTimeout(() => window.print(), 300);
        }}
      />

    </div>
  );
};
