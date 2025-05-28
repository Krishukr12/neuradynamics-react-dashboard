import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@components/Navbar';
import { describe, expect, test } from 'vitest';

describe('Navbar Component', () => {
  const setup = (favoritesCount = 0) => {
    render(
      <BrowserRouter>
        <Navbar favoritesCount={favoritesCount} />
      </BrowserRouter>
    );
  };

  test('renders Navbar and displays brand name', () => {
    setup();
    expect(screen.getByText(/UrbanCart/i)).toBeInTheDocument();
  });

  test('displays Products and Favorites links on desktop view', () => {
    setup(3);
    expect(screen.getAllByText(/Products/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Favorites/i)[0]).toHaveTextContent('Favorites(3)');
  });

  test('toggle menu button is accessible with an aria-label', () => {
    setup();
    const toggleButton = screen.getByLabelText('Open menu');
    expect(toggleButton).toBeInTheDocument();
  });

  test('menu expands and collapses on mobile toggle', () => {
    setup(2);
    const toggleButton = screen.getByLabelText('Open menu');

    fireEvent.click(toggleButton);
    expect(screen.getAllByText(/Favorites/i)[1]).toBeVisible();

    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
  });
});
