import type { Schedule } from '@/_schema/schedule';

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    category: '予定',
    time: '10:00',
    title: '通院',
    description: '定期検診',
  },
  {
    id: '2',
    category: '休息',
    time: '14:00',
    title: '休息タイム',
    description: '30分の休憩',
  },
  {
    id: '3',
    category: 'トイレ',
    time: '16:00',
    title: 'トイレタイミング',
  },
  {
    id: '4',
    category: '服薬',
    time: '08:00',
    title: '朝の服薬',
    description: '降圧剤、ビタミンD',
  },
  {
    id: '5',
    category: '食事',
    time: '12:00',
    title: '昼食',
    description: '塩分控えめ',
  },
];
