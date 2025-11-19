import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  nameSchema,
  relationshipSchema,
  phoneNumberSchema,
  emailSchema,
  addressSchema,
  booleanSchema,
  optionalNameSchema,
  optionalRelationshipSchema,
  optionalPhoneNumberSchema,
  optionalEmailSchema,
  optionalAddressSchema,
  optionalBooleanSchema,
  isoDateStringSchema,
  optionalIsoDateStringSchema,
} from '@/_util/validations';

// Emergency Contact Schemas
export const EmergencyContactSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  helperId: idSchema,
  name: nameSchema,
  relationship: relationshipSchema,
  phoneNumber: phoneNumberSchema,
  email: optionalEmailSchema,
  address: optionalAddressSchema,
  isMain: booleanSchema,
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
});

export const CreateEmergencyContactSchema = z.object({
  userId: userIdSchema,
  helperId: idSchema,
  name: nameSchema,
  relationship: relationshipSchema,
  phoneNumber: phoneNumberSchema,
  email: optionalEmailSchema,
  address: optionalAddressSchema,
  isMain: booleanSchema,
});

export const UpdateEmergencyContactSchema = z.object({
  name: optionalNameSchema,
  relationship: optionalRelationshipSchema,
  phoneNumber: optionalPhoneNumberSchema,
  email: optionalEmailSchema,
  address: optionalAddressSchema,
  isMain: optionalBooleanSchema,
});

// Export inferred types
export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;
export type CreateEmergencyContact = z.infer<typeof CreateEmergencyContactSchema>;
export type UpdateEmergencyContact = z.infer<typeof UpdateEmergencyContactSchema>;
