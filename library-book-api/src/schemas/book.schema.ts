import { z } from 'zod';

const text = (field: string) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined ? `${field} is required` : `${field} must be a string`,
    })
    .trim()
    .min(1, `${field} cannot be empty`);

export const createBookSchema = z.strictObject({
  title: text('title'),
  author: text('author'),
  genre: text('genre'),
  available: z.boolean({ error: 'available must be a boolean' }).default(true),
});

export const updateBookSchema = createBookSchema
  .partial()
  .extend({ available: z.boolean({ error: 'available must be a boolean' }).optional() })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update',
  });

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
