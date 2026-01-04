import { z } from 'zod';
import {
  idSchema,
  nameSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
  booleanSchema,
  isoDateStringSchema,
  optionalNameSchema,
  optionalAgeSchema,
  optionalEmailSchema,
  optionalPasswordSchema,
  optionalAddressSchema,
  optionalCommentSchema,
  nullableStringSchema,
  nullableCommentSchema,
} from '@/_util/validations';

// User Schemas
export const UserSchema = z.object({
  id: idSchema,
  name: nameSchema,
  age: ageSchema,
  mail: emailSchema,
  address: nullableStringSchema,
  comment: nullableCommentSchema,
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
  isDeleted: booleanSchema,
});

export const CreateUserSchema = z.object({
  name: nameSchema,
  age: ageSchema,
  mail: emailSchema,
  password: passwordSchema,
  address: optionalAddressSchema,
  comment: optionalCommentSchema,
});

export const CreateUserGoogleSchema = z.object({
  name: nameSchema,
  age: optionalAgeSchema,
  mail: emailSchema,
  password: optionalPasswordSchema,
  address: optionalAddressSchema,
  comment: optionalCommentSchema,
});

export const UpdateUserSchema = z.object({
  name: optionalNameSchema,
  age: optionalAgeSchema,
  mail: optionalEmailSchema,
  password: optionalPasswordSchema,
  address: optionalAddressSchema,
  comment: optionalCommentSchema,
});

// Export inferred types
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type CreateUserGoogle = z.infer<typeof CreateUserGoogleSchema>;
