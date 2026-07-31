import { CBCFullBook } from '../types';

const DB_NAME = 'EducationBrain_LibraryDB';
const DB_VERSION = 2;
const STORE_NAME = 'books';
const DRAFT_STORE_NAME = 'generator_drafts';

export interface GeneratorDraftState {
  id: string; // Default: 'current_draft'
  generationMode: 'single' | 'batch';
  activeTierId: string;
  grade: string;
  subject: string;
  batchSubjectSelection: string[];
  curriculumSystem: string;
  bookCategory: string;
  audience: string;
  difficultyLevel: string;
  topic: string;
  strand?: string;
  subStrand?: string;
  savedAt: string;
  updatedAtTimestamp: number;
}

/**
 * Open or initialize the IndexedDB connection.
 */
export function openBookDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by_grade', 'grade', { unique: false });
        store.createIndex('by_subject', 'subject', { unique: false });
        store.createIndex('by_createdAt', 'createdAt', { unique: false });
      }
      if (!db.objectStoreNames.contains(DRAFT_STORE_NAME)) {
        db.createObjectStore(DRAFT_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB.'));
    };
  });
}

/**
 * Retrieve all persisted books from IndexedDB.
 */
export async function getAllStoredBooks(): Promise<CBCFullBook[]> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to retrieve books from IndexedDB.'));
      };
    });
  } catch (err) {
    console.warn('IndexedDB read warning:', err);
    return [];
  }
}

/**
 * Save or update a single book in IndexedDB.
 */
export async function saveBookToOfflineStorage(book: CBCFullBook): Promise<void> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(book);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to save book to IndexedDB:', err);
  }
}

/**
 * Save multiple books in a single transaction.
 */
export async function saveBooksToOfflineStorage(books: CBCFullBook[]): Promise<void> {
  if (!books || books.length === 0) return;
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      books.forEach((book) => {
        store.put(book);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (err) {
    console.error('Failed to batch save books to IndexedDB:', err);
  }
}

/**
 * Delete a book from IndexedDB by ID.
 */
export async function deleteBookFromOfflineStorage(id: string): Promise<void> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to delete book from IndexedDB:', err);
  }
}

/**
 * Clear all books from IndexedDB.
 */
export async function clearOfflineStorage(): Promise<void> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to clear IndexedDB:', err);
  }
}

/**
 * Save form draft state to IndexedDB.
 */
export async function saveGeneratorDraftToIDB(draft: GeneratorDraftState): Promise<void> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DRAFT_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.put(draft);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to save draft to IndexedDB:', err);
  }
}

/**
 * Retrieve form draft state from IndexedDB.
 */
export async function getGeneratorDraftFromIDB(id: string = 'current_draft'): Promise<GeneratorDraftState | null> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DRAFT_STORE_NAME, 'readonly');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to get draft from IndexedDB:', err);
    return null;
  }
}

/**
 * Clear form draft state from IndexedDB.
 */
export async function clearGeneratorDraftFromIDB(id: string = 'current_draft'): Promise<void> {
  try {
    const db = await openBookDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DRAFT_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to clear draft from IndexedDB:', err);
  }
}

