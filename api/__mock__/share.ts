/**
 * Mock Share Data
 * Health card and caregiver data for share screen
 */

// Health Card Data Type
export interface HealthCardData {
  healthConditions: string[];
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  disability: string;
  notes: string;
}

// Caregiver Type
export interface Caregiver {
  id: string;
  name: string;
  relation: string;
  role: string;
  phone: string;
  email?: string;
  avatar: string;
  avatarColor: string;
  status: 'online' | 'offline';
}

/**
 * Mock Health Card Data
 */
export const mockHealthCardData: HealthCardData = {
  healthConditions: ['高血圧', '糖尿病'],
  bloodType: 'A型',
  height: '165',
  weight: '58',
  allergies: 'ペニシリン、花粉',
  medications: '降圧剤、ビタミンD',
  disability: '軽度の歩行障害',
  notes: '長時間の立位は困難、30分ごとに休憩が必要',
};

/**
 * Mock Caregivers
 */
export const mockCaregivers: Caregiver[] = [
  {
    id: 'caregiver-1',
    name: '山田花子',
    relation: '娘',
    role: '主介護者',
    phone: '090-1234-5678',
    email: 'hanako.yamada@example.com',
    avatar: '花',
    avatarColor: '#FFE5E5',
    status: 'online',
  },
  {
    id: 'caregiver-2',
    name: '田中一郎',
    relation: '息子',
    role: '副介護者',
    phone: '090-2345-6789',
    email: 'ichiro.tanaka@example.com',
    avatar: '一',
    avatarColor: '#E0F7F7',
    status: 'offline',
  },
  {
    id: 'caregiver-3',
    name: '佐藤美咲',
    relation: 'ヘルパー',
    role: '訪問介護員',
    phone: '080-3456-7890',
    email: 'misaki.sato@care-service.jp',
    avatar: '美',
    avatarColor: '#E3F2FD',
    status: 'online',
  },
];
