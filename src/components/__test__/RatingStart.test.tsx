import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingStars } from '@components/RatingStars';

describe('RatingStars', () => {
  it('renders correct number of full stars for a whole number rating', () => {
    render(<RatingStars rate={3} ratingCount={120} />);

    const starSvgs = screen.getAllByTestId('star');
    expect(starSvgs).toHaveLength(5);

    expect(screen.queryAllByTestId('half-star')).toHaveLength(0);

    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('renders a half star for a fractional rating', () => {
    render(<RatingStars rate={4.5} ratingCount={10} />);

    const starSvgs = screen.getAllByTestId('star');
    expect(starSvgs).toHaveLength(4);

    const halfStar = screen.getAllByTestId('half-star');
    expect(halfStar).toHaveLength(1);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('does not render a half star if decimal is less than 0.5', () => {
    render(<RatingStars rate={2.3} ratingCount={5} />);
    expect(screen.queryAllByTestId('half-star')).toHaveLength(0);
  });
});
