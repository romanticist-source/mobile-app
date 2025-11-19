import type { AlertHistory } from '@/_schema/alert';

/**
 * Mock Alert History
 * System notifications with priority levels for development and testing
 */
export const mockAlerts: AlertHistory[] = [
  {
    id: 'alert-1',
    userId: 'user-1',
    title: '服薬時間のお知らせ',
    description: '朝の血圧の薬を服用してください',
    importance: 3, // 高優先度
    alertType: '服薬',
    createdAt: '2025-01-19T09:00:00Z',
  },
  {
    id: 'alert-2',
    userId: 'user-1',
    title: '明日の病院予約',
    description: '明日10:30から内科の定期検診があります',
    importance: 2, // 中優先度
    alertType: '予定',
    createdAt: '2025-01-19T20:00:00Z',
  },
  {
    id: 'alert-3',
    userId: 'user-1',
    title: '水分補給のお知らせ',
    description: 'こまめに水分を取りましょう',
    importance: 1, // 低優先度
    alertType: '健康',
    createdAt: '2025-01-19T15:00:00Z',
  },
  {
    id: 'alert-4',
    userId: 'user-1',
    title: 'トイレのお知らせ',
    description: 'トイレに行く時間です',
    importance: 2,
    alertType: 'トイレ',
    createdAt: '2025-01-19T16:00:00Z',
  },
  {
    id: 'alert-5',
    userId: 'user-1',
    title: '体操の時間',
    description: 'ラジオ体操の時間です',
    importance: 1,
    alertType: '運動',
    createdAt: '2025-01-19T10:00:00Z',
  },
  {
    id: 'alert-6',
    userId: 'user-1',
    title: '異常検知',
    description: '長時間動きが検出されませんでした',
    importance: 3,
    alertType: '緊急',
    createdAt: '2025-01-19T03:30:00Z',
  },
  {
    id: 'alert-7',
    userId: 'user-1',
    title: '食事のお知らせ',
    description: '昼食の時間です',
    importance: 2,
    alertType: '食事',
    createdAt: '2025-01-19T12:00:00Z',
  },
  {
    id: 'alert-8',
    userId: 'user-1',
    title: '休息のお知らせ',
    description: '午後の休息時間です',
    importance: 1,
    alertType: '休息',
    createdAt: '2025-01-19T14:00:00Z',
  },
  {
    id: 'alert-9',
    userId: 'user-1',
    title: 'ヘルパー訪問予定',
    description: '15:00にヘルパーの田中さんが訪問予定です',
    importance: 2,
    alertType: '予定',
    createdAt: '2025-01-19T14:30:00Z',
  },
  {
    id: 'alert-10',
    userId: 'user-1',
    title: '夜の服薬時間',
    description: '睡眠薬を服用してください',
    importance: 3,
    alertType: '服薬',
    createdAt: '2025-01-19T21:00:00Z',
  },
];

/**
 * Mock notifications (alias for mockAlerts for backward compatibility)
 */
export const mockNotifications = mockAlerts;
