import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders the loading label correctly', () => {
    render(<LoadingSpinner label="Products" />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('renders the animated spinner circles', () => {
    render(<LoadingSpinner label="Data" />);

    const pulseSpinner = document.querySelector('.animate-pulse');
    expect(pulseSpinner).toBeInTheDocument();

    const spinningRing = document.querySelector('.animate-spin');
    expect(spinningRing).toBeInTheDocument();
  });

  it('renders 3 bouncing dots', () => {
    render(<LoadingSpinner label="Content" />);

    const bouncingDots = document.querySelectorAll('.animate-bounce');
    expect(bouncingDots.length).toBe(3);
  });
});
