import { z } from 'zod';

// User Status Card Schemas
export const UserStatusCardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bloodType: z.string().nullable(),
  allergy: z.string().nullable(),
  medicine: z.string().nullable(),
});

export const CreateUserStatusCardSchema = z.object({
  userId: z.string(),
  bloodType: z.string().nullable().optional(),
  allergy: z.string().nullable().optional(),
  medicine: z.string().nullable().optional(),
});

export const UpdateUserStatusCardSchema = z.object({
  bloodType: z.string().nullable().optional(),
  allergy: z.string().nullable().optional(),
  medicine: z.string().nullable().optional(),
});

// User Status Card Disease Schemas
export const UserStatusCardDiseaseSchema = z.object({
  id: z.string(),
  userStatusCardId: z.string(),
  name: z.string(),
});

export const CreateUserStatusCardDiseaseSchema = z.object({
  userStatusCardId: z.string(),
  name: z.string(),
});

export const UpdateUserStatusCardDiseaseSchema = z.object({
  name: z.string(),
});

// Export inferred types
export type UserStatusCard = z.infer<typeof UserStatusCardSchema>;
export type CreateUserStatusCard = z.infer<typeof CreateUserStatusCardSchema>;
export type UpdateUserStatusCard = z.infer<typeof UpdateUserStatusCardSchema>;

export type UserStatusCardDisease = z.infer<typeof UserStatusCardDiseaseSchema>;
export type CreateUserStatusCardDisease = z.infer<typeof CreateUserStatusCardDiseaseSchema>;
export type UpdateUserStatusCardDisease = z.infer<typeof UpdateUserStatusCardDiseaseSchema>;
