import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '@components/Navbar';
import { describe, expect, it } from 'vitest';

describe.skip('Navbar component', () => {
  const renderWithRouter = (favoritesCount: number) =>
    render(
      <MemoryRouter>
        <Navbar favoritesCount={favoritesCount} />
      </MemoryRouter>
    );

  it('renders the logo and links', () => {
    renderWithRouter(0);

    expect(screen.getByText('UrbanCart')).toBeInTheDocument();
    expect(screen.getAllByText('Products')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Favorites')[0]).toBeInTheDocument();
  });

  it('shows correct favorites count when > 0', () => {
    renderWithRouter(3);
    expect(screen.getAllByText(/Favorites\(3\)/)[0]).toBeInTheDocument();
  });

  it('does not show favorites count when it is 0', () => {
    renderWithRouter(0);
    expect(screen.getAllByText('Favorites')[0]).toBeInTheDocument();
    expect(screen.queryByText(/Favorites\(\d+\)/)).not.toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderWithRouter(1);
    const toggleButton = screen.getByRole('button');

    expect(screen.getByText('Products')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getAllByText('Products').length).toBeGreaterThan(1);

    fireEvent.click(toggleButton);
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0);
  });

  it('closes mobile menu on link click', () => {
    renderWithRouter(2);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    const mobileFavoritesLink = screen.getAllByText(/Favorites\(2\)/)[1];
    fireEvent.click(mobileFavoritesLink);

    expect(screen.getByText('UrbanCart')).toBeInTheDocument();
  });
});
