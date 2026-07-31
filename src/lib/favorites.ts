// Helper utilities for managing starred / favorited CBC books in localStorage

const FAVORITES_KEY = 'cbc_favorite_book_ids';

export function getFavoriteBookIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse favorite book IDs from localStorage:', err);
    return [];
  }
}

export function saveFavoriteBookIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to save favorite book IDs to localStorage:', err);
  }
}

export function toggleFavoriteId(id: string): string[] {
  const current = getFavoriteBookIds();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter((item) => item !== id);
  } else {
    updated = [...current, id];
  }
  saveFavoriteBookIds(updated);
  return updated;
}
