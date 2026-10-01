import { RepairMediaItem } from '../data/repairs';

const DB_NAME = 'naiahautos_media_database';
const DB_VERSION = 1;
const STORE_NAME = 'repairs_media_store';
const KEY_NAME = 'gallery_repairs_items';
// Bump this whenever the built-in gallery photos/videos change, so browsers that
// saved an older copy pick up the new default media.
const DATA_VERSION = 'naiahautos_gallery_version_v9';

function isCurrentVersion(): boolean {
  try { return localStorage.getItem(DATA_VERSION) === 'applied'; } catch { return true; }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    } catch (e) {
      console.warn('Persistent storage request failed:', e);
    }
  }
  return false;
}

export async function checkIsPersisted(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persisted) {
    try {
      return await navigator.storage.persisted();
    } catch (e) {
      return false;
    }
  }
  return false;
}

export async function getStoredRepairs(): Promise<RepairMediaItem[] | null> {
  if (!isCurrentVersion()) return null;
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          resolve(getLocalStorageFallback());
        }
      };
      req.onerror = () => {
        resolve(getLocalStorageFallback());
      };
    });
  } catch (e) {
    return getLocalStorageFallback();
  }
}

export async function saveStoredRepairs(items: RepairMediaItem[]): Promise<void> {
  try { localStorage.setItem(DATA_VERSION, 'applied'); } catch (e) { /* ignore */ }
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(items, KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not store to IndexedDB, attempting localStorage:', err);
  }

  // Also try localStorage for small items, catch and ignore quota errors gracefully
  try {
    localStorage.setItem('naiahautos_all_repairs', JSON.stringify(items));
  } catch (e) {
    // Quota reached on localStorage, IndexedDB already holds the full payload safely
  }
}

export async function clearStoredRepairs(): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Error clearing IndexedDB:', err);
  }

  try {
    localStorage.removeItem('naiahautos_all_repairs');
  } catch (e) {
    // ignore
  }
}

export async function saveCustomSetting(key: string, value: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, `setting_${key}`);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not store setting to IndexedDB:', err);
  }
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // ignore
  }
  await requestPersistentStorage();
}

export async function getCustomSetting(key: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    const result = await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(`setting_${key}`);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
    if (result) return result;
  } catch (e) {
    // ignore
  }
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function getLocalStorageFallback(): RepairMediaItem[] | null {
  try {
    const raw = localStorage.getItem('naiahautos_all_repairs');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

// Removes photos that were picked with the old on-page photo picker, so the
// pictures set in the code are the ones every visitor (and the owner) sees.
export async function clearLegacyPhotoSettings(): Promise<void> {
  const keys = ['naiahautos_founder_photo_v2', 'naiahautos_workshop_photo_v2'];
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      keys.forEach((k) => store.delete(`setting_${k}`));
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {
    // ignore
  }
  try {
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    // ignore
  }
}
