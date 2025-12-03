import { render } from '@testing-library/react';
import StarRating from '@/components/StarRating';

describe('StarRating', () => {
  it('renders without crashing', () => {
    const { container } = render(<StarRating rating={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders 5 stars by default', () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('renders custom number of stars when maxStars is provided', () => {
    const { container } = render(<StarRating rating={3} maxStars={10} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(10);
  });

  it('shows correct filled stars based on rating', () => {
    const { container } = render(<StarRating rating={3} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBe(3);
  });

  it('shows correct unfilled stars based on rating', () => {
    const { container } = render(<StarRating rating={3} />);
    const unfilledStars = container.querySelectorAll('.text-gray-300');
    expect(unfilledStars.length).toBe(2);
  });

  it('handles zero rating - all stars unfilled', () => {
    const { container } = render(<StarRating rating={0} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBe(0);
  });

  it('handles maximum rating - all stars filled', () => {
    const { container } = render(<StarRating rating={5} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBe(5);
  });

  it('rounds rating to nearest integer for display', () => {
    const { container } = render(<StarRating rating={3.7} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBe(4); // 3.7 rounds to 4
  });

  it('handles rating greater than maxStars', () => {
    const { container } = render(<StarRating rating={10} maxStars={5} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBe(5);
  });
});
