import { z } from 'zod';

// User Help Card Schemas
export const UserHelpCardSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export const CreateUserHelpCardSchema = z.object({
  userId: z.string(),
});

// Export inferred types
export type UserHelpCard = z.infer<typeof UserHelpCardSchema>;
export type CreateUserHelpCard = z.infer<typeof CreateUserHelpCardSchema>;
