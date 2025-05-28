import { describe, it, expect } from 'vitest';
import reducer, {
  setSearchTerm,
  setCategory,
  setSortBy,
  clearSearchFilterSort,
} from '@redux/slices/filterSlice';

describe('filterSlice', () => {
  const initialState = {
    searchTerm: '',
    category: '',
    sortBy: 'price-asc',
  };

  it('should return the initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle setSearchTerm', () => {
    const newState = reducer(initialState, setSearchTerm('laptop'));
    expect(newState.searchTerm).toBe('laptop');
    expect(newState.category).toBe('');
    expect(newState.sortBy).toBe('price-asc');
  });

  it('should handle setCategory', () => {
    const newState = reducer(initialState, setCategory('electronics'));
    expect(newState.category).toBe('electronics');
    expect(newState.searchTerm).toBe('');
    expect(newState.sortBy).toBe('price-asc');
  });

  it('should handle setSortBy', () => {
    const newState = reducer(initialState, setSortBy('name-desc'));
    expect(newState.sortBy).toBe('name-desc');
    expect(newState.searchTerm).toBe('');
    expect(newState.category).toBe('');
  });

  it('should handle clearSearchFilterSort', () => {
    const populatedState = {
      searchTerm: 'test',
      category: 'clothing',
      sortBy: 'name-desc',
    };
    const newState = reducer(populatedState, clearSearchFilterSort());
    expect(newState).toEqual(initialState);
  });
});
