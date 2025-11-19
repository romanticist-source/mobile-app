import { z } from 'zod';

export const addScheduleFormSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  startTime: z.date({ required_error: '開始時刻を選択してください' }),
  endTime: z.date({ required_error: '終了時刻を選択してください' }),
  scheduleType: z.string().default('予定'),
  isRepeat: z.boolean().default(false),
  memo: z.string().optional(),
}).refine(
  (data) => data.endTime > data.startTime,
  {
    message: '終了時刻は開始時刻より後である必要があります',
    path: ['endTime'],
  }
);

export type AddScheduleFormData = z.infer<typeof addScheduleFormSchema>;
