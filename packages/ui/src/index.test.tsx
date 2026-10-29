import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './index';

describe('Button', () => {
  it('renders its label and variant classes', () => {
    render(<Button variant="outline">Liên hệ</Button>);
    expect(screen.getByRole('button', { name: 'Liên hệ' })).toHaveClass('border-gold');
  });
});
