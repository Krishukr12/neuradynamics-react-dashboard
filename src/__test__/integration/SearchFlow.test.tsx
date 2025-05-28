import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilters } from '@components/ProductFilters';

// Mock useDebounce to control timing
vi.mock('@hooks/useDebounce', () => ({
  useDebounce: vi.fn(value => [value]), // Default mock bypasses debounce
}));

describe.skip('ProductFilters - Search Functionality', () => {
  const mockProps = {
    categories: ['electronics', 'books'],
    onSearch: vi.fn(),
    onCategoryChange: vi.fn(),
    onSortChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders search input correctly', () => {
    render(<ProductFilters {...mockProps} />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('updates search term immediately on input', () => {
    render(<ProductFilters {...mockProps} />);
    const input = screen.getByPlaceholderText('Search products...');

    fireEvent.change(input, { target: { value: 'laptop' } });

    expect(input).toHaveValue('laptop');
  });

  it('handles initial empty search term', () => {
    render(<ProductFilters {...mockProps} />);
    expect(mockProps.onSearch).toHaveBeenCalledWith('');
  });

  it('calls onSearch with debounced value', () => {
    render(<ProductFilters {...mockProps} />);
    mockProps.onSearch.mockClear(); // Clear initial call

    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'keyboard' } });

    expect(mockProps.onSearch).toHaveBeenCalledWith('keyboard');
  });

  describe('with actual debounce behavior', () => {
    beforeEach(() => {
      // Restore actual debounce implementation
      vi.doUnmock('@hooks/useDebounce');
    });

    it('calls onSearch after debounce delay', () => {
      render(<ProductFilters {...mockProps} />);
      // Clear initial call
      mockProps.onSearch.mockClear();

      const input = screen.getByPlaceholderText('Search products...');
      fireEvent.change(input, { target: { value: 'monitor' } });

      // Should not be called immediately
      expect(mockProps.onSearch).not.toHaveBeenCalled();

      // Advance timers by 300ms (debounce delay)
      vi.advanceTimersByTime(300);

      expect(mockProps.onSearch).toHaveBeenCalledWith('monitor');
      expect(mockProps.onSearch).toHaveBeenCalledTimes(1);
    });

    it('only calls onSearch once for rapid successive typing', () => {
      render(<ProductFilters {...mockProps} />);
      // Clear initial call
      mockProps.onSearch.mockClear();

      const input = screen.getByPlaceholderText('Search products...');

      // Rapid successive typing - all within debounce period
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.change(input, { target: { value: 'ab' } });
      fireEvent.change(input, { target: { value: 'abc' } });

      // Advance timers by more than debounce period
      vi.advanceTimersByTime(350);

      // Should only call with final value
      expect(mockProps.onSearch).toHaveBeenCalledTimes(1);
      expect(mockProps.onSearch).toHaveBeenCalledWith('abc');
    });
  });

  it('clears search term when clear filters is clicked', () => {
    render(<ProductFilters {...mockProps} />);
    // Clear initial call
    mockProps.onSearch.mockClear();

    const input = screen.getByPlaceholderText('Search products...');
    const clearButton = screen.getByText('Clear Filters');

    fireEvent.change(input, { target: { value: 'camera' } });
    // Advance timers to complete debounce
    vi.advanceTimersByTime(300);
    mockProps.onSearch.mockClear();

    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(mockProps.onSearch).toHaveBeenCalledWith('');
  });

  it('does not call onSearch when search term doesnt change', () => {
    render(<ProductFilters {...mockProps} />);
    // Clear initial call
    mockProps.onSearch.mockClear();

    const input = screen.getByPlaceholderText('Search products...');

    fireEvent.change(input, { target: { value: 'headphones' } });
    // Advance timers to complete debounce
    vi.advanceTimersByTime(300);
    mockProps.onSearch.mockClear();

    fireEvent.change(input, { target: { value: 'headphones' } });
    // Advance timers to ensure any potential debounce completes
    vi.advanceTimersByTime(300);

    expect(mockProps.onSearch).not.toHaveBeenCalled();
  });
});
