import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  nullableStringSchema,
  optionalNullableStringSchema,
} from '@/_util/validations';

// User Help Card Schemas
export const UserHelpCardSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  hospitalName: nullableStringSchema,
  hospitalPhone: nullableStringSchema,
});

export const CreateUserHelpCardSchema = z.object({
  userId: userIdSchema,
  hospitalName: optionalNullableStringSchema,
  hospitalPhone: optionalNullableStringSchema,
});

export const UpdateUserHelpCardSchema = z.object({
  hospitalName: optionalNullableStringSchema,
  hospitalPhone: optionalNullableStringSchema,
});

// Export inferred types
export type UserHelpCard = z.infer<typeof UserHelpCardSchema>;
export type CreateUserHelpCard = z.infer<typeof CreateUserHelpCardSchema>;
export type UpdateUserHelpCard = z.infer<typeof UpdateUserHelpCardSchema>;
