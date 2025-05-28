import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '@components/Error';

describe.skip('Error Component', () => {
  it('renders the error heading and message', () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();

    expect(screen.getByText(/we're having trouble loading this content/i)).toBeInTheDocument();
  });

  it('renders Try Again button and triggers reload', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);
    expect(reloadSpy).toHaveBeenCalled();

    reloadSpy.mockRestore();
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

    const svgs = screen.getAllByRole('img', { hidden: true });
    expect(svgs.length).toBeGreaterThan(0);
  });
});
