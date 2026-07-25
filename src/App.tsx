import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LandingPageView } from './components/LandingPageView';
import { LibraryHomeView } from './components/LibraryHomeView';
import { GradePageView } from './components/GradePageView';
import { SubjectPageView } from './components/SubjectPageView';
import { SmartSearchView } from './components/SmartSearchView';
import { DownloadsView } from './components/DownloadsView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { BookGeneratorForm } from './components/BookGeneratorForm';
import { BookViewer } from './components/BookViewer';
import { BrandingModal } from './components/BrandingModal';
import { PrintQueueModal } from './components/PrintQueueModal';
import { PRESET_CBC_BOOKS } from './data/presetBooks';
import { CBCFullBook, SchoolBranding, GenerationRequest } from './types';
import { AlertCircle, Plus, Printer, ArrowLeft, Database, BookOpen } from 'lucide-react';
import {
  getAllStoredBooks,
  saveBookToOfflineStorage,
  saveBooksToOfflineStorage,
  deleteBookFromOfflineStorage,
} from './lib/idb';

export default function App() {
  const [savedBooks, setSavedBooks] = useState<CBCFullBook[]>(PRESET_CBC_BOOKS);
  const [currentBook, setCurrentBook] = useState<CBCFullBook | null>(PRESET_CBC_BOOKS[0] || null);
  
  // Navigation active view state
  const [activeView, setActiveView] = useState<string>('landing');

  const [branding, setBranding] = useState<SchoolBranding>({
    schoolName: 'CHUO KIKUU ACADEMY',
    motto: 'Knowledge is Power & Conservation is Life',
    teacherName: 'Mwalimu J. Mwangi',
    className: 'Grade 4 East',
    term: 'Term 1',
    year: '2026',
    coverTheme: 'emerald'
  });

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Print Queue states
  const [queuedBookIds, setQueuedBookIds] = useState<string[]>([]);
  const [isPrintQueueOpen, setIsPrintQueueOpen] = useState(false);
  const [isCombinedPrintView, setIsCombinedPrintView] = useState(false);

  // Offline IndexedDB status state
  const [offlineStoredCount, setOfflineStoredCount] = useState<number>(0);

  // Fetch preset books and load IndexedDB library on mount
  useEffect(() => {
    async function initLibrary() {
      try {
        const offlineBooks = await getAllStoredBooks();

        let presetBooks: CBCFullBook[] = PRESET_CBC_BOOKS;
        try {
          const res = await fetch('/api/cbc/presets');
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            presetBooks = data.data;
          }
        } catch (err) {
          console.warn('Using local fallback preset books:', err);
        }

        const bookMap = new Map<string, CBCFullBook>();
        presetBooks.forEach((b) => bookMap.set(b.id, b));
        offlineBooks.forEach((b) => bookMap.set(b.id, b));

        const mergedList = Array.from(bookMap.values());
        mergedList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setSavedBooks(mergedList);
        if (mergedList.length > 0) {
          setCurrentBook(mergedList[0]);
          setQueuedBookIds([mergedList[0].id]);
        }

        await saveBooksToOfflineStorage(mergedList);
        setOfflineStoredCount(mergedList.length);
      } catch (e) {
        console.error('IndexedDB initialization error:', e);
      }
    }

    initLibrary();
  }, []);

  const handleSelectBookAndRead = (book: CBCFullBook) => {
    setCurrentBook(book);
    setActiveView('reader');
  };

  const handleGenerateBook = async (req: GenerationRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cbc/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req, branding })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate CBC book.');
      }

      const newBook: CBCFullBook = data.book;
      setSavedBooks((prev) => [newBook, ...prev]);
      setCurrentBook(newBook);
      setQueuedBookIds((prev) => [...prev, newBook.id]);
      setIsGeneratorOpen(false);
      setActiveView('reader');

      await saveBookToOfflineStorage(newBook);
      setOfflineStoredCount((prev) => prev + 1);
    } catch (err: any) {
      console.error('Generation Error:', err);
      setError(err.message || 'An unexpected error occurred while generating the CBC book.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBranding = async (updatedBranding: SchoolBranding) => {
    setBranding(updatedBranding);
    if (currentBook) {
      const updatedBook = { ...currentBook, branding: updatedBranding };
      setCurrentBook(updatedBook);
      setSavedBooks((prev) =>
        prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
      await saveBookToOfflineStorage(updatedBook);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    setSavedBooks((prev) => {
      const next = prev.filter((b) => b.id !== bookId);
      if (currentBook?.id === bookId) {
        setCurrentBook(next[0] || null);
      }
      return next;
    });
    setQueuedBookIds((prev) => prev.filter((id) => id !== bookId));
    await deleteBookFromOfflineStorage(bookId);
    setOfflineStoredCount((prev) => Math.max(0, prev - 1));
  };

  const handleToggleQueue = (bookId: string) => {
    setQueuedBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleClearQueue = () => {
    setQueuedBookIds([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const queuedBooks = savedBooks.filter((b) => queuedBookIds.includes(b.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col pb-16 lg:pb-0">
      
      {/* Top Header Bar */}
      <Header
        currentBook={currentBook}
        savedBooks={savedBooks}
        onSelectBook={handleSelectBookAndRead}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenBranding={() => setIsBrandingOpen(true)}
        onPrint={handlePrint}
        queuedBookIds={queuedBookIds}
        onOpenPrintQueue={() => setIsPrintQueueOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) setActiveView('search');
        }}
      />

      {/* Main App Container with Sidebar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex gap-8">
        
        {/* Desktop Sidebar Navigation */}
        <SidebarNav
          activeView={activeView}
          onNavigateView={setActiveView}
          onOpenGenerator={() => setIsGeneratorOpen(true)}
          onOpenBranding={() => setIsBrandingOpen(true)}
          savedBooksCount={savedBooks.length}
        />

        {/* Primary Content View Area */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* Error Alert Box */}
          {error && (
            <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-start gap-3 text-rose-950 shadow-sm print:hidden">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="block text-xs uppercase font-extrabold text-rose-900">
                  Generation Notice
                </strong>
                <p className="text-xs font-medium text-rose-800 mt-0.5">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs font-bold text-rose-700 hover:text-rose-950 px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Combined Print View Banner */}
          {isCombinedPrintView && (
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    Batch Multi-Book PDF Export Mode
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{queuedBooks.length} Books Queued</span>
                </div>
                <h2 className="text-lg font-black text-white">
                  Combined Multi-Book Print View
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  All selected coursebooks are compiled sequentially below with clean page-breaks for single-pass PDF export.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsCombinedPrintView(false)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit Combined View</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print All ({queuedBooks.length} Books)</span>
                </button>
              </div>
            </div>
          )}

          {/* Generator Modal Form */}
          {isGeneratorOpen ? (
            <div className="print:hidden">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  AI Education Book Studio
                </h2>
                <button
                  onClick={() => setIsGeneratorOpen(false)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1 bg-slate-200/80 rounded-lg"
                >
                  Close Studio
                </button>
              </div>
              <BookGeneratorForm
                branding={branding}
                onGenerate={handleGenerateBook}
                isLoading={isLoading}
                onClose={() => setIsGeneratorOpen(false)}
              />
            </div>
          ) : isCombinedPrintView ? (
            /* Combined print view render */
            <div className="space-y-16">
              {queuedBooks.map((bookItem, bIdx) => (
                <div key={bookItem.id} className="page-break-after-always border-b-4 border-dashed border-slate-300 pb-12 print:border-none print:pb-0">
                  <div className="bg-slate-900 text-white px-6 py-2 rounded-xl mb-4 print:hidden text-xs font-bold flex justify-between">
                    <span>Batch Document #{bIdx + 1} of {queuedBooks.length}</span>
                    <span>{bookItem.grade} • {bookItem.subject}</span>
                  </div>
                  <BookViewer
                    book={bookItem}
                    onOpenBranding={() => setIsBrandingOpen(true)}
                    onPrint={handlePrint}
                    isQueued={queuedBookIds.includes(bookItem.id)}
                    onToggleQueue={() => handleToggleQueue(bookItem.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Route to Active View */
            <div>
              {activeView === 'landing' && (
                <LandingPageView
                  books={savedBooks}
                  onSelectBook={handleSelectBookAndRead}
                  onNavigateView={setActiveView}
                  onOpenGenerator={() => setIsGeneratorOpen(true)}
                />
              )}

              {activeView === 'library' && (
                <LibraryHomeView
                  books={savedBooks}
                  onSelectBook={handleSelectBookAndRead}
                  onOpenGenerator={() => setIsGeneratorOpen(true)}
                  onNavigateView={setActiveView}
                />
              )}

              {activeView === 'grades' && (
                <GradePageView
                  books={savedBooks}
                  onSelectBook={handleSelectBookAndRead}
                />
              )}

              {activeView === 'subject' && (
                <SubjectPageView
                  books={savedBooks}
                  onSelectBook={handleSelectBookAndRead}
                  onNavigateView={setActiveView}
                />
              )}

              {activeView === 'search' && (
                <SmartSearchView
                  books={savedBooks}
                  onSelectBook={handleSelectBookAndRead}
                  initialQuery={searchQuery}
                />
              )}

              {activeView === 'downloads' && (
                <DownloadsView
                  books={savedBooks}
                  offlineCount={offlineStoredCount}
                  onSelectBook={handleSelectBookAndRead}
                  onDeleteBook={handleDeleteBook}
                />
              )}

              {activeView === 'teacher' && (
                <TeacherDashboardView
                  books={savedBooks}
                  onOpenGenerator={() => setIsGeneratorOpen(true)}
                  onSelectBook={handleSelectBookAndRead}
                />
              )}

              {activeView === 'admin' && (
                <AdminDashboardView
                  books={savedBooks}
                  offlineCount={offlineStoredCount}
                />
              )}

              {activeView === 'reader' && (
                <div>
                  {currentBook ? (
                    <BookViewer
                      book={currentBook}
                      onOpenBranding={() => setIsBrandingOpen(true)}
                      onPrint={handlePrint}
                      isQueued={queuedBookIds.includes(currentBook.id)}
                      onToggleQueue={() => handleToggleQueue(currentBook.id)}
                    />
                  ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                      <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-700">No Coursebook Selected</h3>
                      <button
                        onClick={() => setIsGeneratorOpen(true)}
                        className="mt-3 px-4 py-2 text-xs font-bold bg-emerald-700 text-white rounded-xl shadow-sm cursor-pointer"
                      >
                        Open AI Book Studio
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        activeView={activeView}
        onNavigateView={setActiveView}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {/* Modals */}
      <BrandingModal
        isOpen={isBrandingOpen}
        onClose={() => setIsBrandingOpen(false)}
        branding={branding}
        onSave={handleSaveBranding}
      />

      <PrintQueueModal
        isOpen={isPrintQueueOpen}
        onClose={() => setIsPrintQueueOpen(false)}
        savedBooks={savedBooks}
        queuedBookIds={queuedBookIds}
        onToggleQueue={handleToggleQueue}
        onClearQueue={handleClearQueue}
        onOpenCombinedView={() => setIsCombinedPrintView(true)}
        onDeleteBook={handleDeleteBook}
      />

      {/* Footer Bar */}
      <footer className="h-9 bg-slate-900 text-white text-[11px] px-6 flex items-center justify-between shrink-0 print:hidden border-t border-slate-800">
        <div className="flex gap-6 font-mono text-slate-300">
          <span>ENGINE: GEMINI 2.5 CBC</span>
          <span>DOC FORMAT: KICD COMPLIANT</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Database className="w-3 h-3 text-emerald-400" /> INDEXEDDB: PERSISTED ({offlineStoredCount} BOOKS)
          </span>
        </div>
        <div className="flex gap-4 text-slate-400 font-mono hidden sm:flex">
          <span>BATCH QUEUE: {queuedBookIds.length} ITEMS</span>
          <span>KENYA CURRICULUM ARCHITECT 2026</span>
        </div>
      </footer>

    </div>
  );
}

