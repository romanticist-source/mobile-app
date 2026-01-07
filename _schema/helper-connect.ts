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

// HelperConnect Schemas
export const HelperConnectSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  helperEmail: emailSchema,
  status: HelperConnectStatusSchema,
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
  approvedAt: optionalIsoDateStringSchema,
  rejectedAt: optionalIsoDateStringSchema,
  isDeleted: z.boolean(),
});

export const CreateHelperConnectRequestSchema = z.object({
  helperEmail: emailSchema,
});

export const HelperConnectWithDetailsSchema = HelperConnectSchema.extend({
  userName: z.string().optional(),
  helperName: z.string().optional(),
});

// Export inferred types
export type HelperConnect = z.infer<typeof HelperConnectSchema>;
export type CreateHelperConnectRequest = z.infer<typeof CreateHelperConnectRequestSchema>;
export type HelperConnectWithDetails = z.infer<typeof HelperConnectWithDetailsSchema>;
