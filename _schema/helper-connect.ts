import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  emailSchema,
  isoDateStringSchema,
  optionalIsoDateStringSchema,
} from '@/_util/validations';

// HelperConnect Status
export const HelperConnectStatusSchema = z.enum(['pending', 'approved', 'rejected']);
export type HelperConnectStatus = z.infer<typeof HelperConnectStatusSchema>;

// HelperConnect Schemas - matching backend structure
export const HelperConnectSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  helperId: idSchema,
  status: HelperConnectStatusSchema,
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  deletedBy: z.string().nullable(),
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
});

export const CreateHelperConnectRequestSchema = z.object({
  helperId: idSchema, // Backend expects helperId, not helperEmail
});

export const HelperConnectWithDetailsSchema = HelperConnectSchema.extend({
  user: z.object({
    id: idSchema,
    name: z.string(),
    mail: emailSchema,
  }).optional(),
  helper: z.object({
    id: idSchema,
    name: z.string(),
    email: emailSchema,
  }).optional(),
});

// Export inferred types
export type HelperConnect = z.infer<typeof HelperConnectSchema>;
export type CreateHelperConnectRequest = z.infer<typeof CreateHelperConnectRequestSchema>;
export type HelperConnectWithDetails = z.infer<typeof HelperConnectWithDetailsSchema>;
