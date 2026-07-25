import React from 'react';
import { HardDriveDownload, Database, Trash2, BookOpen, Printer, Star, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { CBCFullBook } from '../types';

interface DownloadsViewProps {
  books: CBCFullBook[];
  offlineCount: number;
  onSelectBook: (book: CBCFullBook) => void;
  onDeleteBook: (id: string) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  books,
  offlineCount,
  onSelectBook,
  onDeleteBook,
}) => {
  // Approximate size calculation
  const totalApproxMB = (books.length * 1.8).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Offline Storage Status Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            IndexedDB Offline Persistence Engine
          </span>
          <span className="text-xs text-slate-400 font-semibold">{offlineCount} Books Stored</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          My Offline Library & Downloads Repository
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          All books listed below are cached locally in your browser's IndexedDB database. You can read, print, and export them anytime even when offline without an active internet connection.
        </p>

        {/* Storage Meter */}
        <div className="mt-4 bg-white/10 p-4 rounded-xl border border-white/10 max-w-xl space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-200 font-bold">
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Offline Database Storage Used</span>
            </span>
            <span className="text-emerald-300 font-black">{totalApproxMB} MB / 50 MB Cache</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (books.length * 1.8 / 50) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Offline Stored Books List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-extrabold text-slate-900">Saved Offline Books ({books.length})</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">Available Offline Anytime</span>
        </div>

        {books.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {books.map((book) => (
              <div key={book.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-xl transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {book.grade} • {book.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Added: {new Date(book.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{book.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Strand: {book.strand} • School: {book.branding?.schoolName}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectBook(book)}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectBook(book);
                      window.print();
                    }}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition"
                    title="Print / Export PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${book.title}" from offline IndexedDB storage?`)) {
                        onDeleteBook(book.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Delete from local database"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <HardDriveDownload className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800">No Offline Books Saved Yet</h4>
            <p className="text-xs">Any book generated or opened in the library is automatically saved offline here.</p>
          </div>
        )}
      </div>

    </div>
  );
};
