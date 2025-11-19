import { z } from 'zod';

// Alert History Schemas
export const AlertHistorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  importance: z.number(),
  alertType: z.string(),
  createdAt: z.string(),
});

export const CreateAlertHistorySchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  importance: z.number(),
  alertType: z.string(),
});

export const UpdateAlertHistorySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  importance: z.number().optional(),
  alertType: z.string().optional(),
});

// Export inferred types
export type AlertHistory = z.infer<typeof AlertHistorySchema>;
export type CreateAlertHistory = z.infer<typeof CreateAlertHistorySchema>;
export type UpdateAlertHistory = z.infer<typeof UpdateAlertHistorySchema>;
