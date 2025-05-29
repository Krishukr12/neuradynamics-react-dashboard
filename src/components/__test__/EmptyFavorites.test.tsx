import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EmptyFavorites } from '@components/EmptyFavorites';

describe('EmptyFavorites', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={['/']} basename="/">
        <EmptyFavorites />
      </MemoryRouter>
    );

  it('renders heading and description', () => {
    renderWithRouter();

    expect(screen.getByRole('heading', { name: /your favorites are empty/i })).toBeInTheDocument();

    expect(screen.getByText(/you haven't added any items to your favorites/i)).toBeInTheDocument();
  });

  it('renders the start shopping button with correct link', () => {
    renderWithRouter();

    const button = screen.getByRole('link', { name: /start shopping/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });

  it('renders SVG icons', () => {
    renderWithRouter();
  });
});
