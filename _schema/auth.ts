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
// Backend returns user data in "user" field for both roles
export const LoginResponseSchema = z.object({
  token: z.string(),
  role: AuthRoleSchema,
  user: z.object({
    id: z.string(),
    name: z.string(),
    mail: emailSchema,
    age: z.number().nullable().optional(),
    address: z.string().nullable().optional(),
    comment: z.string().nullable().optional(),
  }),
});

// Register Request Schema - User
export const RegisterUserRequestSchema = z.object({
  role: z.literal('user'),
  name: z.string().min(1, '名前を入力してください'),
  mail: emailSchema,
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  age: z.number().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
});

// Register Request Schema - Helper
export const RegisterHelperRequestSchema = z.object({
  role: z.literal('helper'),
  name: z.string().min(1, '名前を入力してください'),
  mail: emailSchema, // Backend expects 'mail' for Helper too
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  relationship: z.string().optional(),
});

// Union type for both
export const RegisterRequestSchema = z.union([
  RegisterUserRequestSchema,
  RegisterHelperRequestSchema,
]);

// Export inferred types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;
export type RegisterHelperRequest = z.infer<typeof RegisterHelperRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
