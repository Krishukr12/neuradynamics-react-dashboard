import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductNotFound } from '@components/ProductNotFound';
import { describe, expect, it } from 'vitest';

describe('ProductNotFound component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <ProductNotFound />
      </MemoryRouter>
    );

  it('renders the main heading and message', () => {
    renderWithRouter();

    expect(screen.getByText('Product Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find the product you're looking for/i)
    ).toBeInTheDocument();
  });

  it('renders the browse products link with correct href', () => {
    renderWithRouter();

    const browseLink = screen.getByRole('link', { name: /browse products/i });
    expect(browseLink).toBeInTheDocument();
    expect(browseLink).toHaveAttribute('href', '/');
  });

  it('applies expected layout classes', () => {
    renderWithRouter();

    const container = screen.getByText('Product Not Found').parentElement?.parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
