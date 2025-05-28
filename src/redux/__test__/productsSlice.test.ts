import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import reducer, { fetchProducts } from '@redux/slices/productSlice';
import type { ProductsState } from '../../types';
import type { Product } from '../../types';
import { configureStore } from '@reduxjs/toolkit';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts),
    })
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('productSlice', () => {
  const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
  };

  it('should return the initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    const state = reducer(initialState, fetchProducts.pending('', undefined));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle fetchProducts.fulfilled', () => {
    const state = reducer(initialState, fetchProducts.fulfilled(mockProducts, '', undefined));
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: 'Failed to fetch' },
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });

  it('should fetch products and update state in store', async () => {
    const store = configureStore({
      reducer: {
        products: reducer,
      },
    });

    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
  });
});
