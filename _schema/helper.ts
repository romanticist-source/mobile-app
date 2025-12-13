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
