import type { User } from '@/_schema/user';

/**
 * Mock Users
 * User account data for development and testing
 */
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '山田 一郎',
    age: 78,
    mail: 'ichiro.yamada@example.com',
    address: '東京都世田谷区桜新町1-2-3',
    comment: '高血圧と糖尿病の治療中。毎日の服薬管理が必要。散歩が好きで、天気の良い日は近所の公園を散歩している。',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2025-01-10T15:30:00Z',
    isDeleted: false,
  },
  {
    id: 'user-2',
    name: '佐藤 花子',
    age: 82,
    mail: 'hanako.sato@example.com',
    address: '神奈川県横浜市青葉区美しが丘2-3-4',
    comment: '認知症の初期段階。日常生活は概ね自立しているが、定期的な見守りが必要。趣味は編み物。',
    createdAt: '2024-03-20T09:00:00Z',
    updatedAt: '2025-01-18T11:20:00Z',
    isDeleted: false,
  },
  {
    id: 'user-3',
    name: '鈴木 太郎',
    age: 75,
    mail: 'taro.suzuki@example.com',
    address: null,
    comment: null,
    createdAt: '2024-06-01T14:00:00Z',
    updatedAt: '2024-12-15T16:45:00Z',
    isDeleted: false,
  },
];
