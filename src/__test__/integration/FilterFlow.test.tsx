import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Product } from '@/pages/Product';
import type { Product as PType } from '@/types';

vi.mock('@components/LoadingSpinner', () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

vi.mock('@components/Error', () => ({
  Error: () => <div>Error occurred</div>,
}));

vi.mock('@components/ProductCard', () => ({
  ProductCard: ({ product }: { product: PType }) => (
    <div data-testid="product-card">
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
    </div>
  ),
}));

// Mock debounce hook to return immediate value
vi.mock('@hooks/useDebounce', () => ({
  useDebounce: vi.fn().mockImplementation(value => [value]),
}));

describe.skip('Product Filters Integration', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Wireless Headphones',
      category: 'Electronics',
      price: 99.99,
      description: '',
      image: '',
    },
    {
      id: 2,
      title: 'Cotton T-Shirt',
      category: 'Clothing',
      price: 19.99,
      description: '',
      image: '',
    },
    {
      id: 3,
      title: 'Programming Book',
      category: 'Books',
      price: 29.99,
      description: '',
      image: '',
    },
    {
      id: 4,
      title: 'Smartphone',
      category: 'Electronics',
      price: 599.99,
      description: '',
      image: '',
    },
  ];

  //   const mockCategories = ['Electronics', 'Clothing', 'Books'];

  beforeEach(() => {
    // Create mock store with initial state
    const store = configureStore({
      reducer: {
        products: (
          state = {
            items: mockProducts,
            status: 'succeeded',
            error: null,
          }
        ) => state,
        filters: (
          state = {
            searchTerm: '',
            category: '',
            sortBy: 'price-asc',
          }
        ) => state,
      },
    });

    render(
      <Provider store={store}>
        <Product />
      </Provider>
    );
  });

  it('should display all products initially', () => {
    expect(screen.getAllByTestId('product-card')).toHaveLength(4);
  });

  it('should filter products by search term', async () => {
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'phone' } });

    const products = screen.getAllByTestId('product-card');
    expect(products).toHaveLength(2);
    expect(within(products[0]).getByText('Wireless Headphones')).toBeInTheDocument();
    expect(within(products[1]).getByText('Smartphone')).toBeInTheDocument();
  });

  it('should filter products by category', () => {
    const categorySelect = screen.getByRole('combobox', { name: /categories/i });
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

    const products = screen.getAllByTestId('product-card');
    expect(products).toHaveLength(2);
    expect(within(products[0]).getByText('Electronics')).toBeInTheDocument();
    expect(within(products[1]).getByText('Electronics')).toBeInTheDocument();
  });

  it('should sort products by price ascending', () => {
    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    const prices = screen.getAllByText(/\$\d+\.\d{2}/);
    expect(prices[0]).toHaveTextContent('$19.99');
    expect(prices[1]).toHaveTextContent('$29.99');
    expect(prices[2]).toHaveTextContent('$99.99');
    expect(prices[3]).toHaveTextContent('$599.99');
  });

  it('should sort products by price descending', () => {
    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    const prices = screen.getAllByText(/\$\d+\.\d{2}/);
    expect(prices[0]).toHaveTextContent('$599.99');
    expect(prices[1]).toHaveTextContent('$99.99');
    expect(prices[2]).toHaveTextContent('$29.99');
    expect(prices[3]).toHaveTextContent('$19.99');
  });

  it('should combine multiple filters correctly', () => {
    // Set search term
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'e' } });

    // Set category
    const categorySelect = screen.getByRole('combobox', { name: /categories/i });
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

    // Set sort
    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    const products = screen.getAllByTestId('product-card');
    expect(products).toHaveLength(2);

    const prices = screen.getAllByText(/\$\d+\.\d{2}/);
    expect(prices[0]).toHaveTextContent('$599.99');
    expect(prices[1]).toHaveTextContent('$99.99');
  });

  it('should clear all filters when clear button is clicked', () => {
    // Set some filters
    fireEvent.change(screen.getByPlaceholderText('Search products...'), {
      target: { value: 'Book' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: /categories/i }), {
      target: { value: 'Books' },
    });

    // Clear filters
    fireEvent.click(screen.getByText('Clear Filters'));

    // Verify reset state
    expect(screen.getByPlaceholderText('Search products...')).toHaveValue('');
    expect(screen.getByRole('combobox', { name: /categories/i })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: /sort/i })).toHaveValue('price-asc');
    expect(screen.getAllByTestId('product-card')).toHaveLength(4);
  });
});
