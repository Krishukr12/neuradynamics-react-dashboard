import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '@redux/slices/favouritesSlice';

vi.mock('@utils/localStorage', () => ({
  loadFromLocalStorage: vi.fn(() => null),
  saveToLocalStorage: vi.fn(),
  LOCAL_STORAGE_KEYS: {
    FAVORITES: 'favorites',
  },
}));

describe('favoritesSlice', () => {
  const mockId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    const initialState = reducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual(initialState);
  });

  it('should add a new favorite item', () => {
    const state = reducer({ items: [] }, addFavorite(mockId));
    expect(state.items).toContain(mockId);
  });

  it('should not add duplicate favorite item', () => {
    const state = reducer({ items: [mockId] }, addFavorite(mockId));
    expect(state.items).toEqual([mockId]);
  });

  it('should remove a favorite item', () => {
    const state = reducer({ items: [mockId] }, removeFavorite(mockId));
    expect(state.items).not.toContain(mockId);
  });

  it('should clear all favorite items', () => {
    const state = reducer({ items: [mockId, 2, 3] }, clearFavorites());
    expect(state.items).toEqual([]);
  });
});
