import type { EmergencyContact } from '@/_schema/emergency-contact';

/**
 * Mock Emergency Contacts
 * List of emergency contacts and caregivers for development and testing
 */
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    userId: 'user-1',
    helperId: 'helper-1',
    name: '山田 太郎',
    relationship: '長男',
    phoneNumber: '090-1234-5678',
    isMain: true,
  },
  {
    userId: 'user-1',
    helperId: 'helper-2',
    name: '山田 花子',
    relationship: '長女',
    phoneNumber: '080-2345-6789',
    isMain: false,
  },
  {
    userId: 'user-1',
    helperId: 'helper-3',
    name: '田中 次郎',
    relationship: 'ヘルパー',
    phoneNumber: '070-3456-7890',
    isMain: false,
  },
  {
    userId: 'user-1',
    helperId: 'helper-4',
    name: '佐藤 美咲',
    relationship: 'ケアマネージャー',
    phoneNumber: '080-4567-8901',
    isMain: false,
  },
  {
    userId: 'user-1',
    helperId: 'helper-5',
    name: '鈴木 健一',
    relationship: '近隣住民',
    phoneNumber: '090-5678-9012',
    isMain: false,
  },
];
