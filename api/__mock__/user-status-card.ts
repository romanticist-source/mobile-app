import type { UserStatusCard, UserStatusCardDisease } from '@/_schema/user-status-card';

/**
 * Mock User Status Card
 * User health information and medical details for development and testing
 */
export const mockUserStatusCard: UserStatusCard = {
  id: 'status-card-1',
  userId: 'user-1',
  bloodType: 'A型',
  allergy: '花粉、ハウスダスト、ペニシリン',
  medicine: '降圧剤(アムロジピン 5mg)、胃薬(ファモチジン 20mg)、睡眠薬(ゾルピデム 5mg)',
};

/**
 * Mock User Status Card Diseases
 * List of diseases/conditions associated with the user's status card
 */
export const mockDiseases: UserStatusCardDisease[] = [
  {
    id: 'disease-1',
    userStatusCardId: 'status-card-1',
    name: '高血圧症',
  },
  {
    id: 'disease-2',
    userStatusCardId: 'status-card-1',
    name: '糖尿病(2型)',
  },
  {
    id: 'disease-3',
    userStatusCardId: 'status-card-1',
    name: '慢性胃炎',
  },
  {
    id: 'disease-4',
    userStatusCardId: 'status-card-1',
    name: '変形性膝関節症',
  },
];

/**
 * Mock health card data (alias for backward compatibility)
 */
export const mockHealthCardData = {
  statusCard: mockUserStatusCard,
  diseases: mockDiseases,
};
