export const ALL_BOOK_PAGES: { id: string; label: string; icon: string }[] = [
  { id: 'cover', label: 'Cover Page', icon: '📖' },
  { id: 'teacher', label: 'Teacher Guide', icon: '👨‍🏫' },
  { id: 'student', label: 'Student Textbook', icon: '🎓' },
  { id: 'worksheets', label: 'Worksheets & CATs', icon: '📝' },
  { id: 'rubrics', label: 'Assessment Rubrics', icon: '📊' },
];

export function getReadingProgress(bookId: string): string[] {
  if (typeof window === 'undefined') return ['cover'];
  try {
    const raw = localStorage.getItem(`cbc_reading_progress_${bookId}`);
    if (!raw) return ['cover'];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['cover'];
  } catch (err) {
    console.error(`Failed to read progress for book ${bookId}:`, err);
    return ['cover'];
  }
}

export function saveReadingProgress(bookId: string, pages: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`cbc_reading_progress_${bookId}`, JSON.stringify(pages));
  } catch (err) {
    console.error(`Failed to save progress for book ${bookId}:`, err);
  }
}

export function markPageAsViewed(bookId: string, pageId: string): string[] {
  const current = getReadingProgress(bookId);
  if (!current.includes(pageId)) {
    const updated = [...current, pageId];
    saveReadingProgress(bookId, updated);
    return updated;
  }
  return current;
}

export function calculateProgressPercentage(viewedPages: string[]): number {
  const total = ALL_BOOK_PAGES.length;
  const validViewed = ALL_BOOK_PAGES.filter((p) => viewedPages.includes(p.id)).length;
  return Math.min(100, Math.round((validViewed / total) * 100));
}
