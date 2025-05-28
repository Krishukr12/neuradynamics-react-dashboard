export const LOCAL_STORAGE_KEYS = {
  FAVORITES: "favoriteItems",
};

export function loadFromLocalStorage(key: string): number[] | null {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : null;
  } catch (e) {
    console.error(`Error loading key "${key}" from localStorage`, e);
    return null;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error(`Error saving key "${key}" to localStorage`, e);
  }
}
