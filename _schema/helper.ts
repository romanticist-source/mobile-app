import { z } from 'zod';

// Helper Schemas
export const HelperSchema = z.object({
  id: z.string(),
  name: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  relationship: z.string(),
});

export const CreateHelperSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  relationship: z.string(),
});

export const UpdateHelperSchema = z.object({
  name: z.string().optional(),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
});

// Export inferred types
export type Helper = z.infer<typeof HelperSchema>;
export type CreateHelper = z.infer<typeof CreateHelperSchema>;
export type UpdateHelper = z.infer<typeof UpdateHelperSchema>;
