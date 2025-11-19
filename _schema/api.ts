import { z } from 'zod';

// API Response Schemas
export const ApiErrorSchema = z.object({
  error: z.string(),
});

export const ApiSuccessSchema = z.object({
  success: z.boolean(),
});

// Export inferred types
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type ApiSuccess = z.infer<typeof ApiSuccessSchema>;
