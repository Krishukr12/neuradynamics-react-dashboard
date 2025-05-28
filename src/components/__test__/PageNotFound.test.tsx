import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageNotFound } from '@components/PageNotFound';
import { describe, expect, it } from 'vitest';

describe('PageNotFound component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

  it('renders 404 graphic and message', () => {
    renderWithRouter();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/The page you're looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('renders Return Home link', () => {
    renderWithRouter();

    const returnHomeLink = screen.getByRole('link', { name: /return home/i });
    expect(returnHomeLink).toBeInTheDocument();
    expect(returnHomeLink).toHaveAttribute('href', '/');
  });

  it('renders bouncing icon and SVG correctly', () => {
    renderWithRouter();

    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  it('applies Tailwind styles for layout and spacing', () => {
    renderWithRouter();

    const container = screen.getByText('Page Not Found').parentElement?.parentElement;
    expect(container?.className).toContain('flex');
    expect(container?.className).toContain('items-center');
    expect(container?.className).toContain('justify-center');
  });
});
