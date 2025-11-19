import { z } from 'zod';
import {
  idSchema,
  userIdSchema,
  titleSchema,
  descriptionSchema,
  booleanSchema,
  numberSchema,
  isoDateStringSchema,
  nullableTitleSchema,
  nullableDescriptionSchema,
  optionalTitleSchema,
  optionalDescriptionSchema,
  optionalBooleanSchema,
  optionalNumberSchema,
  optionalIsoDateStringSchema,
  optionalNullableStringSchema,
} from '@/_util/validations';

// Schedule Category Type
export type ScheduleCategory = '予定' | '休息' | 'トイレ' | '服薬' | '食事' | '運動' | 'その他';

// User Schedule Schemas
export const UserScheduleSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  title: nullableTitleSchema,
  description: nullableDescriptionSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }),
  isRepeat: booleanSchema,
  startAt: isoDateStringSchema,
});

export const CreateUserScheduleSchema = z.object({
  userId: userIdSchema,
  title: optionalNullableStringSchema,
  description: optionalNullableStringSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }),
  isRepeat: booleanSchema,
  startAt: isoDateStringSchema,
});

export const UpdateUserScheduleSchema = z.object({
  title: optionalNullableStringSchema,
  description: optionalNullableStringSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }).optional(),
  isRepeat: optionalBooleanSchema,
  startAt: optionalIsoDateStringSchema,
});

// User Repeat Schedule Schemas
export const UserRepeatScheduleSchema = z.object({
  id: idSchema,
  userId: userIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }),
  interval: numberSchema,
  scheduleTime: z.string().min(1, { message: 'Schedule time is required' }),
});

export const CreateUserRepeatScheduleSchema = z.object({
  userId: userIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }),
  interval: numberSchema,
  scheduleTime: z.string().min(1, { message: 'Schedule time is required' }),
});

export const UpdateUserRepeatScheduleSchema = z.object({
  title: optionalTitleSchema,
  description: optionalDescriptionSchema,
  scheduleType: z.string().min(1, { message: 'Schedule type is required' }).optional(),
  interval: optionalNumberSchema,
  scheduleTime: z.string().min(1, { message: 'Schedule time is required' }).optional(),
});

// Export inferred types
export type UserSchedule = z.infer<typeof UserScheduleSchema>;
export type CreateUserSchedule = z.infer<typeof CreateUserScheduleSchema>;
export type UpdateUserSchedule = z.infer<typeof UpdateUserScheduleSchema>;

export type UserRepeatSchedule = z.infer<typeof UserRepeatScheduleSchema>;
export type CreateUserRepeatSchedule = z.infer<typeof CreateUserRepeatScheduleSchema>;
export type UpdateUserRepeatSchedule = z.infer<typeof UpdateUserRepeatScheduleSchema>;
