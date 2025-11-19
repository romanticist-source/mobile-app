import { z } from 'zod';

// User Schemas
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  mail: z.string(),
  address: z.string().nullable(),
  comment: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  age: z.number(),
  mail: z.string(),
  password: z.string(),
  address: z.string().optional(),
  comment: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  mail: z.string().optional(),
  password: z.string().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
});

// Export inferred types
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
