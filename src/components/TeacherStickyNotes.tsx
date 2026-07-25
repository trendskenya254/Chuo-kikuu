import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Pin, Check, Tag, UserCheck, X, Eye, EyeOff, Edit3 } from 'lucide-react';
import { CBCFullBook } from '../types';

export interface StickyNote {
  id: string;
  author: string;
  targetSection: string;
  content: string;
  color: 'yellow' | 'emerald' | 'blue' | 'rose';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'margin';
  createdAt: string;
}

interface TeacherStickyNotesProps {
  book: CBCFullBook;
  showOnPrint?: boolean;
  onNotesChange?: (notes: StickyNote[]) => void;
}

export const TeacherStickyNotes: React.FC<TeacherStickyNotesProps> = ({ book, onNotesChange }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [authorName, setAuthorName] = useState(book.branding?.teacherName || 'Mwalimu (Teacher)');
  const [targetSection, setTargetSection] = useState('Page 3 - Student Textbook');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'emerald' | 'blue' | 'rose'>('yellow');
  const [selectedPosition, setSelectedPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'margin'>('top-right');

  const storageKey = `cbc_sticky_notes_${book.id}`;

  // Load saved notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (onNotesChange) onNotesChange(parsed);
      } else {
        // Initial sample note
        const initialNotes: StickyNote[] = [
          {
            id: 'note-1',
            author: book.branding?.teacherName || 'Mwalimu',
            targetSection: 'Page 3 - Student Textbook',
            content: 'Emphasize local Kenyan environmental conservation examples during Tuesday practical exercise.',
            color: 'yellow',
            position: 'top-right',
            createdAt: new Date().toLocaleDateString(),
          },
          {
            id: 'note-2',
            author: 'Curriculum Head',
            targetSection: 'Page 4 - Worksheets & Quiz',
            content: 'Check group assessment rubrics against CBC Competency 3.2 guidelines before printing.',
            color: 'emerald',
            position: 'margin',
            createdAt: new Date().toLocaleDateString(),
          }
        ];
        setNotes(initialNotes);
        localStorage.setItem(storageKey, JSON.stringify(initialNotes));
        if (onNotesChange) onNotesChange(initialNotes);
      }
    } catch (e) {
      console.error('Failed to load sticky notes:', e);
    }
  }, [book.id]);

  const saveNotes = (updated: StickyNote[]) => {
    setNotes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    if (onNotesChange) onNotesChange(updated);
  };

  const handleAddOrUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    if (editingId) {
      const updated = notes.map((n) =>
        n.id === editingId
          ? {
              ...n,
              author: authorName.trim() || 'Teacher',
              targetSection,
              content: newNoteText.trim(),
              color: selectedColor,
              position: selectedPosition,
            }
          : n
      );
      saveNotes(updated);
      setEditingId(null);
    } else {
      const note: StickyNote = {
        id: `note-${Date.now()}`,
        author: authorName.trim() || 'Teacher',
        targetSection,
        content: newNoteText.trim(),
        color: selectedColor,
        position: selectedPosition,
        createdAt: new Date().toLocaleDateString(),
      };

      const updated = [note, ...notes];
      saveNotes(updated);
    }

    setNewNoteText('');
  };

  const handleEditNote = (note: StickyNote) => {
    setEditingId(note.id);
    setNewNoteText(note.content);
    setAuthorName(note.author);
    setTargetSection(note.targetSection);
    setSelectedColor(note.color);
    setSelectedPosition(note.position || 'top-right');
    setIsOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
    if (editingId === id) {
      setEditingId(null);
      setNewNoteText('');
    }
  };

  const COLOR_CLASSES = {
    yellow: 'bg-amber-100 border-amber-300 text-amber-950 shadow-amber-200/50',
    emerald: 'bg-emerald-100 border-emerald-300 text-emerald-950 shadow-emerald-200/50',
    blue: 'bg-blue-100 border-blue-300 text-blue-950 shadow-blue-200/50',
    rose: 'bg-rose-100 border-rose-300 text-rose-950 shadow-rose-200/50',
  };

  return (
    <div className="space-y-4 print:my-4">
      
      {/* Sticky Notes Toolbar Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs print:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <Pin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-slate-900">
              Teacher Sticky Notes & Margin Comments ({notes.length})
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Digital sticky notes saved in browser storage for classroom annotations
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>{isOpen ? 'Hide Comments' : 'Manage Sticky Notes'}</span>
        </button>
      </div>

      {/* Expanded Notes Form & List */}
      {isOpen && (
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-5 print:hidden">
          
          {/* Add / Edit Sticky Note Form */}
          <form onSubmit={handleAddOrUpdateNote} className="space-y-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Pin className="w-4 h-4" />
                {editingId ? 'Edit Sticky Note' : 'Create & Position New Sticky Note'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Persisted in Local Storage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Author / Teacher</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                  placeholder="Author name..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Page / Section</label>
                <select
                  value={targetSection}
                  onChange={(e) => setTargetSection(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                >
                  <option value="General / All Pages">General / All Pages</option>
                  <option value="Page 1 - Cover Page">Page 1 - Cover Page</option>
                  <option value="Page 2 - Teacher Guide">Page 2 - Teacher Guide</option>
                  <option value="Page 3 - Student Textbook">Page 3 - Student Textbook</option>
                  <option value="Page 4 - Worksheets & Quiz">Page 4 - Worksheets & Quiz</option>
                  <option value="Page 5 - Flashcards">Page 5 - Flashcards</option>
                  <option value="Page 6 - Remarks & Tracker">Page 6 - Remarks & Tracker</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Page Overlay Position</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value as any)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                >
                  <option value="top-right">Top Right Corner</option>
                  <option value="top-left">Top Left Corner</option>
                  <option value="bottom-right">Bottom Right Corner</option>
                  <option value="bottom-left">Bottom Left Corner</option>
                  <option value="margin">Side Margin Banner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sticky Note Content</label>
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Type your teaching note, homework prompt, or page annotation..."
                rows={2}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 font-medium"
              />
            </div>

            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              {/* Color selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Note Color:</span>
                {(['yellow', 'emerald', 'blue', 'rose'] as const).map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-5 h-5 rounded-full border-2 transition cursor-pointer ${
                      color === 'yellow' ? 'bg-amber-300' :
                      color === 'emerald' ? 'bg-emerald-400' :
                      color === 'blue' ? 'bg-blue-400' : 'bg-rose-400'
                    } ${selectedColor === color ? 'border-white scale-110 ring-2 ring-amber-400' : 'border-transparent opacity-70'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setNewNoteText('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Update Sticky Note' : 'Save Sticky Note'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Sticky Notes Grid Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Saved Page Stickies ({notes.length})
              </h5>
              {notes.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all sticky notes for this book?')) {
                      saveNotes([]);
                    }
                  }}
                  className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {notes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3.5 rounded-2xl border shadow-md relative space-y-2 text-xs font-medium transition ${COLOR_CLASSES[note.color]}`}
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-black/10 pb-1.5">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-[11px] block text-slate-900 flex items-center gap-1">
                          <Pin className="w-3 h-3 text-amber-800" /> {note.author}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
                          <span className="bg-black/10 px-1.5 py-0.5 rounded">{note.targetSection}</span>
                          <span className="bg-black/5 px-1.5 py-0.5 rounded uppercase">{note.position || 'top-right'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditNote(note)}
                          className="text-slate-600 hover:text-slate-900 p-1 cursor-pointer"
                          title="Edit Note"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-600 hover:text-rose-700 p-1 cursor-pointer"
                          title="Delete Sticky Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-950 whitespace-pre-wrap font-sans font-semibold">
                      "{note.content}"
                    </p>

                    <div className="text-[9px] text-slate-600 font-bold text-right pt-0.5">
                      {note.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">No sticky notes added yet.</p>
            )}
          </div>

        </div>
      )}

      {/* Printable Notes Footer Display when printing */}
      {notes.length > 0 && (
        <div className="hidden print:block border-t-2 border-slate-300 pt-4 mt-6">
          <h4 className="font-extrabold text-xs uppercase text-slate-800 mb-2">Teacher Sticky Notes & Classroom Remarks</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {notes.map((n) => (
              <div key={n.id} className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-slate-800 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-amber-900">
                  <span>{n.author} ({n.targetSection})</span>
                  <span>{n.createdAt}</span>
                </div>
                <p className="italic">"{n.content}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

interface PageStickyOverlayProps {
  bookId: string;
  sectionName: string;
}

export const PageStickyOverlay: React.FC<PageStickyOverlayProps> = ({ bookId, sectionName }) => {
  const [sectionNotes, setSectionNotes] = useState<StickyNote[]>([]);
  const storageKey = `cbc_sticky_notes_${bookId}`;

  useEffect(() => {
    const loadNotes = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed: StickyNote[] = JSON.parse(saved);
          const filtered = parsed.filter(
            (n) => n.targetSection === sectionName || n.targetSection === 'General / All Pages'
          );
          setSectionNotes(filtered);
        }
      } catch (e) {
        console.error('Failed to load page overlay notes:', e);
      }
    };

    loadNotes();
    window.addEventListener('storage', loadNotes);
    return () => window.removeEventListener('storage', loadNotes);
  }, [bookId, sectionName]);

  if (sectionNotes.length === 0) return null;

  const POSITION_STYLES: Record<string, string> = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'margin': 'top-12 -right-3 rotate-1',
  };

  const COLOR_BG: Record<string, string> = {
    yellow: 'bg-amber-100 border-amber-300 text-amber-950 shadow-amber-200/60',
    emerald: 'bg-emerald-100 border-emerald-300 text-emerald-950 shadow-emerald-200/60',
    blue: 'bg-blue-100 border-blue-300 text-blue-950 shadow-blue-200/60',
    rose: 'bg-rose-100 border-rose-300 text-rose-950 shadow-rose-200/60',
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden print:hidden">
      {sectionNotes.map((note) => {
        const posClass = POSITION_STYLES[note.position || 'top-right'] || 'top-3 right-3';
        const colorClass = COLOR_BG[note.color || 'yellow'] || COLOR_BG.yellow;

        return (
          <div
            key={note.id}
            className={`pointer-events-auto absolute ${posClass} max-w-[220px] p-2.5 rounded-xl border shadow-lg transition-all hover:scale-105 ${colorClass}`}
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1 gap-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1">
                <Pin className="w-3 h-3 text-amber-800" /> {note.author}
              </span>
              <span className="text-[9px] font-bold text-slate-600">{note.createdAt}</span>
            </div>
            <p className="text-[11px] leading-tight font-semibold text-slate-900 whitespace-pre-wrap">
              "{note.content}"
            </p>
          </div>
        );
      })}
    </div>
  );
};

