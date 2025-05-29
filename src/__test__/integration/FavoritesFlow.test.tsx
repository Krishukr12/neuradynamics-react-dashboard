import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from '@components/ProductCard';

interface FavoritesState {
  items: number[];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] } as FavoritesState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
  },
});

const createTestStore = (preloadedState: FavoritesState = { items: [] }) => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice.reducer,
    },
    preloadedState: {
      favorites: preloadedState,
    },
  });
};

describe('ProductCard Integration Test - Favorites', () => {
  const product = {
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
  };

  afterEach(cleanup);

  const renderWithStore = (favorites: number[] = []) => {
    const store = createTestStore({ items: favorites });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    );
    return store;
  };

  it('renders product info correctly', () => {
    renderWithStore();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('add product when clicked on add to favorites', () => {
    const store = renderWithStore();
    const button = screen.getByRole('button', { name: /Add to Favorites/i });
    fireEvent.click(button);

    expect(screen.getByRole('button', { name: /Remove Favorites/i })).toBeInTheDocument();
    expect(store.getState().favorites.items).toContain(product.id);
  });

  it('remove product when clicked on remove favorites', () => {
    const store = renderWithStore([product.id]);
    const button = screen.getByRole('button', { name: /Remove Favorites/i });
    fireEvent.click(button);

    expect(screen.getByRole('button', { name: /Add to Favorites/i })).toBeInTheDocument();
    expect(store.getState().favorites.items).not.toContain(product.id);
  });
});
