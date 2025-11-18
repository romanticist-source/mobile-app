export type ScheduleCategory = '予定' | '休息' | 'トイレ' | '服薬' | '食事' | '運動' | 'その他';

export interface Schedule {
  id: string;
  category: ScheduleCategory;
  time: string;
  title: string;
  description?: string;
}
