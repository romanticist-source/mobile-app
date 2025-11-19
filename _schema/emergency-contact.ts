import { z } from 'zod';

// Emergency Contact Schemas
export const EmergencyContactSchema = z.object({
  userId: z.string(),
  helperId: z.string(),
  name: z.string(),
  relationship: z.string(),
  phoneNumber: z.string(),
  isMain: z.boolean(),
});

export const CreateEmergencyContactSchema = z.object({
  userId: z.string(),
  helperId: z.string(),
  name: z.string(),
  relationship: z.string(),
  phoneNumber: z.string(),
  isMain: z.boolean(),
});

export const UpdateEmergencyContactSchema = z.object({
  name: z.string().optional(),
  relationship: z.string().optional(),
  phoneNumber: z.string().optional(),
  isMain: z.boolean().optional(),
});

// Export inferred types
export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;
export type CreateEmergencyContact = z.infer<typeof CreateEmergencyContactSchema>;
export type UpdateEmergencyContact = z.infer<typeof UpdateEmergencyContactSchema>;
