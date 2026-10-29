import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(24),
  message: z.string().trim().min(10).max(2000),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const categorySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(500).optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
