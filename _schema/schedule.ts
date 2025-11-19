import { z } from 'zod';

// User Schedule Schemas
export const UserScheduleSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  scheduleType: z.string(),
  isRepeat: z.boolean(),
  startAt: z.string(),
});

export const CreateUserScheduleSchema = z.object({
  userId: z.string(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  scheduleType: z.string(),
  isRepeat: z.boolean(),
  startAt: z.string(),
});

export const UpdateUserScheduleSchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  scheduleType: z.string().optional(),
  isRepeat: z.boolean().optional(),
  startAt: z.string().optional(),
});

// User Repeat Schedule Schemas
export const UserRepeatScheduleSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  scheduleType: z.string(),
  interval: z.number(),
  scheduleTime: z.string(),
});

export const CreateUserRepeatScheduleSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  scheduleType: z.string(),
  interval: z.number(),
  scheduleTime: z.string(),
});

export const UpdateUserRepeatScheduleSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  scheduleType: z.string().optional(),
  interval: z.number().optional(),
  scheduleTime: z.string().optional(),
});

// Export inferred types
export type UserSchedule = z.infer<typeof UserScheduleSchema>;
export type CreateUserSchedule = z.infer<typeof CreateUserScheduleSchema>;
export type UpdateUserSchedule = z.infer<typeof UpdateUserScheduleSchema>;

export type UserRepeatSchedule = z.infer<typeof UserRepeatScheduleSchema>;
export type CreateUserRepeatSchedule = z.infer<typeof CreateUserRepeatScheduleSchema>;
export type UpdateUserRepeatSchedule = z.infer<typeof UpdateUserRepeatScheduleSchema>;
