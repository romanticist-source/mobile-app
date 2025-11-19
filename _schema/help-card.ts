import { z } from 'zod';
import { idSchema, userIdSchema } from '@/_util/validations';

// User Help Card Schemas
export const UserHelpCardSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
});

export const CreateUserHelpCardSchema = z.object({
  userId: userIdSchema,
});

// Export inferred types
export type UserHelpCard = z.infer<typeof UserHelpCardSchema>;
export type CreateUserHelpCard = z.infer<typeof CreateUserHelpCardSchema>;
