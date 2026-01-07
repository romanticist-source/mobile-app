import { z } from 'zod';
import { emailSchema } from '@/_util/validations';
import { UserSchema } from './user';
import { HelperSchema } from './helper';

// Auth Role
export const AuthRoleSchema = z.enum(['user', 'helper']);
export type AuthRole = z.infer<typeof AuthRoleSchema>;

// Login Request Schema
export const LoginRequestSchema = z.object({
  mail: emailSchema,
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
});

// Login Response Schema
export const LoginResponseSchema = z.object({
  token: z.string(),
  role: AuthRoleSchema,
  user: UserSchema.optional(),
  helper: HelperSchema.optional(),
});

// Register Request Schema (for both User and Helper)
export const RegisterRequestSchema = z.object({
  role: AuthRoleSchema,
  name: z.string().min(1, '名前を入力してください'),
  email: emailSchema,
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  // User specific fields
  age: z.number().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
  // Helper specific fields
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  relationship: z.string().optional(),
});

// Export inferred types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
