import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouteError } from '@components/RouteError';
import { useRouteError } from 'react-router-dom';
import type { Mock } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: (error: unknown): error is { statusText: string } =>
      typeof error === 'object' &&
      error !== null &&
      'statusText' in error &&
      typeof error.statusText === 'string',
  };
});

describe('RouteError', () => {
  const mockedUseRouteError = useRouteError as unknown as Mock;

  it('renders string error message', () => {
    mockedUseRouteError.mockReturnValue('Simple error string');

    render(<RouteError />);

    expect(screen.getByText('Simple error string')).toBeInTheDocument();
  });

  it('renders Error object message', () => {
    mockedUseRouteError.mockReturnValue(new Error('Error message'));

    render(<RouteError />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders statusText for route error response', () => {
    mockedUseRouteError.mockReturnValue({ statusText: 'Not Found' });

    render(<RouteError />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders fallback message for unknown error', () => {
    mockedUseRouteError.mockReturnValue({ some: 'unknown' });

    render(<RouteError />);

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });
});
