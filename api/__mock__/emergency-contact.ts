import type { EmergencyContact } from '@/_schema/emergency-contact';

/**
 * Mock Emergency Contacts
 * List of emergency contacts and caregivers for development and testing
 */
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 'emergency-contact-1',
    userId: 'user-1',
    helperId: 'helper-1',
    name: '山田 太郎',
    relationship: '長男',
    phoneNumber: '090-1234-5678',
    email: 'taro.yamada@example.com',
    address: '東京都渋谷区1-2-3',
    isMain: true,
    createdAt: '2024-01-15T09:00:00.000Z',
    updatedAt: '2024-01-15T09:00:00.000Z',
  },
  {
    id: 'emergency-contact-2',
    userId: 'user-1',
    helperId: 'helper-2',
    name: '山田 花子',
    relationship: '長女',
    phoneNumber: '080-2345-6789',
    email: 'hanako.yamada@example.com',
    isMain: false,
    createdAt: '2024-01-15T09:05:00.000Z',
    updatedAt: '2024-01-15T09:05:00.000Z',
  },
  {
    id: 'emergency-contact-3',
    userId: 'user-1',
    helperId: 'helper-3',
    name: '田中 次郎',
    relationship: 'ヘルパー',
    phoneNumber: '070-3456-7890',
    isMain: false,
    createdAt: '2024-01-20T10:30:00.000Z',
    updatedAt: '2024-01-20T10:30:00.000Z',
  },
  {
    id: 'emergency-contact-4',
    userId: 'user-1',
    helperId: 'helper-4',
    name: '佐藤 美咲',
    relationship: 'ケアマネージャー',
    phoneNumber: '080-4567-8901',
    email: 'misaki.sato@caremanager.jp',
    address: '東京都新宿区ケアセンター5-6-7',
    isMain: false,
    createdAt: '2024-02-01T14:00:00.000Z',
    updatedAt: '2024-02-01T14:00:00.000Z',
  },
  {
    id: 'emergency-contact-5',
    userId: 'user-1',
    helperId: 'helper-5',
    name: '鈴木 健一',
    relationship: '近隣住民',
    phoneNumber: '090-5678-9012',
    isMain: false,
    createdAt: '2024-02-10T16:45:00.000Z',
    updatedAt: '2024-02-10T16:45:00.000Z',
  },
];
