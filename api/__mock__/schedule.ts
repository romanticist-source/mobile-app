import type { UserSchedule, UserRepeatSchedule } from '@/_schema/schedule';

/**
 * Mock User Schedules
 * Daily schedule items for development and testing
 */
export const mockSchedules: UserSchedule[] = [
  {
    id: 'schedule-1',
    userId: 'user-1',
    title: '朝の散歩',
    description: '近所の公園を30分散歩',
    scheduleType: '運動',
    isRepeat: false,
    startAt: '2025-01-20T08:00:00Z',
  },
  {
    id: 'schedule-2',
    userId: 'user-1',
    title: '病院の予約',
    description: '内科の定期検診',
    scheduleType: '予定',
    isRepeat: false,
    startAt: '2025-01-20T10:30:00Z',
  },
  {
    id: 'schedule-3',
    userId: 'user-1',
    title: '昼食',
    description: null,
    scheduleType: '食事',
    isRepeat: false,
    startAt: '2025-01-20T12:00:00Z',
  },
  {
    id: 'schedule-4',
    userId: 'user-1',
    title: '午後の休息',
    description: '1時間程度の昼寝',
    scheduleType: '休息',
    isRepeat: false,
    startAt: '2025-01-20T14:00:00Z',
  },
  {
    id: 'schedule-5',
    userId: 'user-1',
    title: '血圧の薬',
    description: '降圧剤 1錠',
    scheduleType: '服薬',
    isRepeat: false,
    startAt: '2025-01-20T15:00:00Z',
  },
  {
    id: 'schedule-6',
    userId: 'user-1',
    title: 'トイレ',
    description: null,
    scheduleType: 'トイレ',
    isRepeat: false,
    startAt: '2025-01-20T16:00:00Z',
  },
  {
    id: 'schedule-7',
    userId: 'user-1',
    title: '夕食',
    description: null,
    scheduleType: '食事',
    isRepeat: false,
    startAt: '2025-01-20T18:00:00Z',
  },
  {
    id: 'schedule-8',
    userId: 'user-1',
    title: '家族との電話',
    description: '息子と週1回の通話',
    scheduleType: 'その他',
    isRepeat: false,
    startAt: '2025-01-20T19:00:00Z',
  },
];

/**
 * Mock User Repeat Schedules
 * Recurring schedule items that repeat on a regular interval
 */
export const mockRepeatSchedules: UserRepeatSchedule[] = [
  {
    id: 'repeat-1',
    userId: 'user-1',
    title: '朝食',
    description: '毎朝の朝食',
    scheduleType: '食事',
    interval: 1, // 毎日
    scheduleTime: '08:00:00',
  },
  {
    id: 'repeat-2',
    userId: 'user-1',
    title: '昼食',
    description: '毎日の昼食',
    scheduleType: '食事',
    interval: 1,
    scheduleTime: '12:00:00',
  },
  {
    id: 'repeat-3',
    userId: 'user-1',
    title: '夕食',
    description: '毎日の夕食',
    scheduleType: '食事',
    interval: 1,
    scheduleTime: '18:00:00',
  },
  {
    id: 'repeat-4',
    userId: 'user-1',
    title: '朝の服薬',
    description: '血圧の薬と胃薬',
    scheduleType: '服薬',
    interval: 1,
    scheduleTime: '09:00:00',
  },
  {
    id: 'repeat-5',
    userId: 'user-1',
    title: '夜の服薬',
    description: '睡眠薬',
    scheduleType: '服薬',
    interval: 1,
    scheduleTime: '21:00:00',
  },
  {
    id: 'repeat-6',
    userId: 'user-1',
    title: '体操',
    description: 'ラジオ体操',
    scheduleType: '運動',
    interval: 1,
    scheduleTime: '10:00:00',
  },
  {
    id: 'repeat-7',
    userId: 'user-1',
    title: '午後の休息',
    description: '30分程度の休憩',
    scheduleType: '休息',
    interval: 1,
    scheduleTime: '14:00:00',
  },
];
