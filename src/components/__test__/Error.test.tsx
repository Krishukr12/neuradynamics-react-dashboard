import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '@components/Error';

describe('Error Component', () => {
  it('renders the error heading and message', () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();

    expect(screen.getByText(/we're having trouble loading this content/i)).toBeInTheDocument();
  });

  it('renders Return to Safety link with correct href', () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const returnLink = screen.getByRole('link', { name: /return to safety/i });
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute('href', '/');
  });

  it('renders the SVG icon', () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
  });
});
