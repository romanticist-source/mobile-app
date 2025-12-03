import { z } from 'zod';

export const addScheduleFormSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  scheduleType: z.string().min(1, { message: 'カテゴリを選択してください' }),
  startTime: z.date({ message: '開始時刻を選択してください' }),
  endTime: z.date({ message: '終了時刻を選択してください' }),
  repeatPattern: z.string().optional(),
  memo: z.string().optional(),
}).refine(
  (data) => data.endTime > data.startTime,
  {
    message: '終了時刻は開始時刻より後である必要があります',
    path: ['endTime'],
  }
);

export type AddScheduleFormData = z.infer<typeof addScheduleFormSchema>;
