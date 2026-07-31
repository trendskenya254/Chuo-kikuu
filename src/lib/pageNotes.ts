export interface PageNote {
  id: string;
  bookId: string;
  page: string; // e.g. 'Cover Page', 'Teacher Guide', 'Student Textbook', 'Worksheets', 'Assessment Rubrics'
  text: string;
  teacherName?: string;
  createdAt: string;
}

export function getBookNotes(bookId: string): PageNote[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`cbc_book_notes_${bookId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`Failed to read notes for book ${bookId}:`, err);
    return [];
  }
}

export function saveBookNotes(bookId: string, notes: PageNote[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`cbc_book_notes_${bookId}`, JSON.stringify(notes));
  } catch (err) {
    console.error(`Failed to save notes for book ${bookId}:`, err);
  }
}

export function addBookNote(bookId: string, page: string, text: string, teacherName?: string): PageNote[] {
  const current = getBookNotes(bookId);
  const newNote: PageNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    bookId,
    page,
    text: text.trim(),
    teacherName: teacherName || 'Mwalimu (Teacher)',
    createdAt: new Date().toLocaleString('en-KE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  const updated = [newNote, ...current];
  saveBookNotes(bookId, updated);
  return updated;
}

export function deleteBookNote(bookId: string, noteId: string): PageNote[] {
  const current = getBookNotes(bookId);
  const updated = current.filter((n) => n.id !== noteId);
  saveBookNotes(bookId, updated);
  return updated;
}

export function clearBookNotes(bookId: string): PageNote[] {
  saveBookNotes(bookId, []);
  return [];
}
