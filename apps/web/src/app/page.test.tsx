import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('home page', () => {
  it('renders the Vietnamese editorial homepage and primary navigation', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /mở lối cho ánh sáng chạm vào không gian/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Điều hướng chính' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /khám phá giải pháp/i })).toHaveAttribute(
      'href',
      '/san-pham',
    );
  });
});
