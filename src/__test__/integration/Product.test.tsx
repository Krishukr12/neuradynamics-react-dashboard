import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Product } from '@/pages/Product';
import { useSearchFilterSort } from '@hooks/useSearchFilterSort';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Product as TProduct } from '@/types';

vi.mock('@hooks/useSearchFilterSort', () => ({
  useSearchFilterSort: vi.fn(),
}));

vi.mock('@components/ProductCard', () => ({
  ProductCard: ({ product }: { product: TProduct }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

vi.mock('@components/LoadingSpinner', () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

vi.mock('@components/Error', () => ({
  Error: () => <div>Error occurred</div>,
}));

const mockProducts: TProduct[] = [
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
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
];

const mockCategories = ['electronics', 'clothing', 'home'];

const setup = (initialState = {}) => {
  const store = configureStore({
    reducer: {
      products: () => ({
        items: mockProducts,
        status: 'succeeded',
        error: null,
      }),
      filters: () => initialState,
    },
  });

  return render(
    <Provider store={store}>
      <Product />
    </Provider>
  );
};

describe('Product Component Integration Tests', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: mockCategories,
      filteredProducts: mockProducts,
      handleSearch: vi.fn(),
      handleCategoryChange: vi.fn(),
      handleSortChange: vi.fn(),
    });
  });

  it('should display loading state initially', () => {
    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: [],
      filteredProducts: [],
      handleSearch: vi.fn(),
      handleCategoryChange: vi.fn(),
      handleSortChange: vi.fn(),
    });

    render(
      <Provider
        store={configureStore({
          reducer: {
            products: () => ({
              items: [],
              status: 'loading',
              error: null,
            }),
            filters: () => ({}),
          },
        })}
      >
        <Product />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display products after loading', () => {
    setup();
    expect(screen.getAllByTestId('product-card')).toHaveLength(5);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
  });

  it('should handle search functionality', async () => {
    const handleSearch = vi.fn();
    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: mockCategories,
      filteredProducts: [mockProducts[0], mockProducts[2]], // Electronics only
      handleSearch,
      handleCategoryChange: vi.fn(),
      handleSortChange: vi.fn(),
    });

    setup();

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'phone' } });

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('phone');
      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
      expect(screen.getByText('Smartphone')).toBeInTheDocument();
      expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
    });
  });

  it('should filter by category', async () => {
    const handleCategoryChange = vi.fn();
    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: mockCategories,
      filteredProducts: [mockProducts[1], mockProducts[4]], // Clothing only
      handleSearch: vi.fn(),
      handleCategoryChange,
      handleSortChange: vi.fn(),
    });

    setup();

    const categorySelect = screen.getByRole('combobox', { name: 'categories' });
    fireEvent.change(categorySelect, { target: { value: 'clothing' } });

    await waitFor(() => {
      expect(handleCategoryChange).toHaveBeenCalledWith('clothing');
      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
      expect(screen.getByText('T-shirt')).toBeInTheDocument();
      expect(screen.getByText('Designer Jeans')).toBeInTheDocument();
      expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    });
  });

  it('should sort products by price', async () => {
    const handleSortChange = vi.fn();
    const sortedProducts = [...mockProducts].sort((a, b) => b.price - a.price);

    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: mockCategories,
      filteredProducts: sortedProducts,
      handleSearch: vi.fn(),
      handleCategoryChange: vi.fn(),
      handleSortChange,
    });

    setup();

    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    await waitFor(() => {
      expect(handleSortChange).toHaveBeenCalledWith('price-desc');
      const productCards = screen.getAllByTestId('product-card');

      // Verify descending order
      const prices = productCards.map(card => parseInt(card.textContent?.match(/\d+/)![0] || '0'));

      expect(prices).toEqual([999, 799, 120, 20, 8]);
      expect(productCards[0]).toHaveTextContent('Laptop');
      expect(productCards[1]).toHaveTextContent('Smartphone');
      expect(productCards[2]).toHaveTextContent('Designer Jeans');
    });
  });

  it('should clear all filters', async () => {
    const handleSearch = vi.fn();
    const handleCategoryChange = vi.fn();
    const handleSortChange = vi.fn();

    vi.mocked(useSearchFilterSort).mockReturnValue({
      categories: mockCategories,
      filteredProducts: mockProducts,
      handleSearch,
      handleCategoryChange,
      handleSortChange,
    });

    setup();

    // Apply some filters first
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const categorySelect = screen.getByRole('combobox', { name: 'categories' });
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });

    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    // Clear filters
    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('');
      expect(handleCategoryChange).toHaveBeenCalledWith('');
      expect(handleSortChange).toHaveBeenCalledWith('price-asc');

      // Verify all products are shown
      expect(screen.getAllByTestId('product-card')).toHaveLength(5);
    });
  });

  it('should display error state', () => {
    render(
      <Provider
        store={configureStore({
          reducer: {
            products: () => ({
              items: [],
              status: 'failed',
              error: 'Test error',
            }),
            filters: () => ({}),
          },
        })}
      >
        <Product />
      </Provider>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
