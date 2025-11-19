import type { Helper } from '@/_schema/helper';

/**
 * Mock Helpers
 * List of caregivers and support staff for development and testing
 */
export const mockHelpers: Helper[] = [
  {
    id: 'helper-1',
    name: '山田 太郎',
    nickname: '太郎さん',
    phoneNumber: '090-1234-5678',
    email: 'taro.yamada@example.com',
    relationship: '長男',
  },
  {
    id: 'helper-2',
    name: '山田 花子',
    nickname: '花子さん',
    phoneNumber: '080-2345-6789',
    email: 'hanako.yamada@example.com',
    relationship: '長女',
  },
  {
    id: 'helper-3',
    name: '田中 次郎',
    nickname: '田中さん',
    phoneNumber: '070-3456-7890',
    email: 'jiro.tanaka@care-service.com',
    relationship: 'ヘルパー',
  },
  {
    id: 'helper-4',
    name: '佐藤 美咲',
    nickname: '佐藤さん',
    phoneNumber: '080-4567-8901',
    email: 'misaki.sato@care-manager.com',
    relationship: 'ケアマネージャー',
  },
  {
    id: 'helper-5',
    name: '鈴木 健一',
    nickname: '鈴木さん',
    phoneNumber: '090-5678-9012',
    email: 'kenichi.suzuki@example.com',
    relationship: '近隣住民',
  },
  {
    id: 'helper-6',
    name: '高橋 恵子',
    nickname: '高橋さん',
    phoneNumber: '080-6789-0123',
    email: 'keiko.takahashi@care-service.com',
    relationship: '訪問看護師',
  },
];

/**
 * Mock caregivers (alias for backward compatibility)
 */
export const mockCaregivers = mockHelpers;
