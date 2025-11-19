import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  nameSchema,
  nullableStringSchema,
  optionalNullableStringSchema,
} from '@/_util/validations';

// User Status Card Schemas
export const UserStatusCardSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  bloodType: nullableStringSchema,
  allergy: nullableStringSchema,
  medicine: nullableStringSchema,
});

export const CreateUserStatusCardSchema = z.object({
  userId: userIdSchema,
  bloodType: optionalNullableStringSchema,
  allergy: optionalNullableStringSchema,
  medicine: optionalNullableStringSchema,
});

export const UpdateUserStatusCardSchema = z.object({
  bloodType: optionalNullableStringSchema,
  allergy: optionalNullableStringSchema,
  medicine: optionalNullableStringSchema,
});

// User Status Card Disease Schemas
export const UserStatusCardDiseaseSchema = z.object({
  id: idSchema,
  userStatusCardId: idSchema,
  name: nameSchema,
});

export const CreateUserStatusCardDiseaseSchema = z.object({
  userStatusCardId: idSchema,
  name: nameSchema,
});

export const UpdateUserStatusCardDiseaseSchema = z.object({
  name: nameSchema,
});

// Export inferred types
export type UserStatusCard = z.infer<typeof UserStatusCardSchema>;
export type CreateUserStatusCard = z.infer<typeof CreateUserStatusCardSchema>;
export type UpdateUserStatusCard = z.infer<typeof UpdateUserStatusCardSchema>;

export type UserStatusCardDisease = z.infer<typeof UserStatusCardDiseaseSchema>;
export type CreateUserStatusCardDisease = z.infer<typeof CreateUserStatusCardDiseaseSchema>;
export type UpdateUserStatusCardDisease = z.infer<typeof UpdateUserStatusCardDiseaseSchema>;
