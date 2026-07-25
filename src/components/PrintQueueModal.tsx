import React from 'react';
import { Printer, CheckSquare, Square, Trash2, X, BookOpen, Layers, Download, Sparkles, FileText } from 'lucide-react';
import { CBCFullBook } from '../types';

interface PrintQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBooks: CBCFullBook[];
  queuedBookIds: string[];
  onToggleQueue: (bookId: string) => void;
  onClearQueue: () => void;
  onOpenCombinedView: () => void;
  onDeleteBook?: (bookId: string) => void;
}

export const PrintQueueModal: React.FC<PrintQueueModalProps> = ({
  isOpen,
  onClose,
  savedBooks,
  queuedBookIds,
  onToggleQueue,
  onClearQueue,
  onOpenCombinedView,
  onDeleteBook,
}) => {
  if (!isOpen) return null;

  const queuedBooks = savedBooks.filter((b) => queuedBookIds.includes(b.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Batch Print Queue Studio</h2>
              <p className="text-xs text-slate-300">
                Select multiple CBC coursebooks & print them together as a single compiled PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Coursebooks for Combined PDF ({queuedBooks.length} Selected)
            </div>
            {queuedBookIds.length > 0 && (
              <button
                onClick={onClearQueue}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Deselect All
              </button>
            )}
          </div>

          <div className="space-y-2">
            {savedBooks.map((book) => {
              const isSelected = queuedBookIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  onClick={() => onToggleQueue(book.id)}
                  className={`p-3.5 rounded-xl border-2 transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button type="button" className="text-blue-600">
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          {book.grade}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          book.difficultyLevel === 'Remedial'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : book.difficultyLevel === 'Enrichment'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {book.difficultyLevel || 'Standard'}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{book.subject}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{book.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Prepared by {book.branding.teacherName} • {book.branding.schoolName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-extrabold text-slate-400">
                      {book.chapters[0]?.textbookContent?.length || 1} Chapters
                    </span>
                    {onDeleteBook && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove "${book.title}" from offline library?`)) {
                            onDeleteBook(book.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete book from local IndexedDB storage"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onOpenCombinedView();
              onClose();
            }}
            disabled={queuedBooks.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Combined Batch ({queuedBooks.length} Books)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
