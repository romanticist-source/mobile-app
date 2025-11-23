import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  titleSchema,
  descriptionSchema,
  numberSchema,
  isoDateStringSchema,
  optionalTitleSchema,
  optionalDescriptionSchema,
  optionalNumberSchema,
} from '@/_util/validations';

// Alert History Schemas
export const AlertHistorySchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  importance: numberSchema,
  alertType: z.string().min(1, { message: 'Alert type is required' }),
  createdAt: isoDateStringSchema,
});

export const CreateAlertHistorySchema = z.object({
  userId: userIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  importance: numberSchema,
  alertType: z.string().min(1, { message: 'Alert type is required' }),
});

export const UpdateAlertHistorySchema = z.object({
  title: optionalTitleSchema,
  description: optionalDescriptionSchema,
  importance: optionalNumberSchema,
  alertType: z.string().min(1, { message: 'Alert type is required' }).optional(),
});

// User Alert History Schema (既読状態)
export const UserAlertHistorySchema = z.object({
  userId: userIdSchema,
  alertId: idSchema,
  isChecked: z.boolean(),
});

// Helper Alert History Schema (介助者の既読状態)
export const HelperAlertHistorySchema = z.object({
  helperId: idSchema,
  alertId: idSchema,
  isChecked: z.boolean(),
});

// Export inferred types
export type AlertHistory = z.infer<typeof AlertHistorySchema>;
export type CreateAlertHistory = z.infer<typeof CreateAlertHistorySchema>;
export type UpdateAlertHistory = z.infer<typeof UpdateAlertHistorySchema>;
export type UserAlertHistory = z.infer<typeof UserAlertHistorySchema>;
export type HelperAlertHistory = z.infer<typeof HelperAlertHistorySchema>;
