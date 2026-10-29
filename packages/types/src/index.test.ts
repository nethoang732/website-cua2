import { describe, expect, it } from 'vitest';
import { categorySchema, leadSchema } from './index';

describe('shared input schemas', () => {
  it('validates a lead and rejects malformed email addresses', () => {
    expect(
      leadSchema.safeParse({
        name: 'An Nguyen',
        email: 'a@example.com',
        phone: '0123456789',
        message: 'Xin tư vấn giải pháp.',
      }).success,
    ).toBe(true);
    expect(
      leadSchema.safeParse({
        name: 'An Nguyen',
        email: 'invalid',
        phone: '0123456789',
        message: 'Xin tư vấn giải pháp.',
      }).success,
    ).toBe(false);
  });

  it('accepts only lowercase, unaccented category slugs', () => {
    expect(categorySchema.safeParse({ slug: 'cua-nhom', name: 'Cửa nhôm' }).success).toBe(true);
    expect(categorySchema.safeParse({ slug: 'Cửa Nhôm', name: 'Cửa nhôm' }).success).toBe(false);
  });
});
