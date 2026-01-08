import { z } from 'zod';
import {
  idSchema,
  nameSchema,
  nicknameSchema,
  phoneNumberSchema,
  emailSchema,
  relationshipSchema,
  optionalNameSchema,
  optionalNicknameSchema,
  optionalPhoneNumberSchema,
  optionalEmailSchema,
  optionalRelationshipSchema,
  optionalAgeSchema,
  optionalAddressSchema,
  isoDateStringSchema,
} from '@/_util/validations';

// Helper Schemas
export const HelperSchema = z.object({
  id: idSchema,
  name: nameSchema,
  nickname: nicknameSchema,
  phoneNumber: phoneNumberSchema,
  email: emailSchema,
  relationship: relationshipSchema,
  age: optionalAgeSchema,
  address: optionalAddressSchema,
  password: z.string().nullable().optional(), // Nullable for existing helpers without password
  createdAt: isoDateStringSchema.optional(),
  updatedAt: isoDateStringSchema.optional(),
  isDeleted: z.boolean().optional(),
});

export const CreateHelperSchema = z.object({
  name: nameSchema,
  nickname: nicknameSchema,
  phoneNumber: phoneNumberSchema,
  email: emailSchema,
  relationship: relationshipSchema,
});

export const UpdateHelperSchema = z.object({
  name: optionalNameSchema,
  nickname: optionalNicknameSchema,
  phoneNumber: optionalPhoneNumberSchema,
  email: optionalEmailSchema,
  relationship: optionalRelationshipSchema,
  age: optionalAgeSchema,
  address: optionalAddressSchema,
});

// Export inferred types
export type Helper = z.infer<typeof HelperSchema>;
export type CreateHelper = z.infer<typeof CreateHelperSchema>;
export type UpdateHelper = z.infer<typeof UpdateHelperSchema>;
