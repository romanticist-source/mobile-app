export interface Caregiver {
  id: string;
  name: string;
  relation: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  avatarColor: string;
  status: 'online' | 'offline';
}

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

export const mockHealthCardData: HealthCardData = {
  healthConditions: ['高血圧', '糖尿病', '軽度の身体障害', '心臓病'],
  bloodType: 'A型',
  height: '170',
  weight: '65',
  allergies: 'ペニシリン、花粉',
  medications: '降圧剤、ビタミンD',
  disability: '軽度の歩行障害',
  notes: '長時間の立位は困難、30分ごとに休憩が必要',
};

export const mockCaregivers: Caregiver[] = [
  {
    id: '1',
    name: '山田花子',
    relation: 'はなちゃん',
    role: '娘',
    phone: '090-XXXX-XXXX',
    email: 'hanako@example.com',
    avatar: '山',
    avatarColor: '#FFE4E4',
    status: 'online',
  },
  {
    id: '2',
    name: '佐藤健太',
    relation: 'けんちゃん',
    role: '息子',
    phone: '090-YYYY-YYYY',
    email: '',
    avatar: '佐',
    avatarColor: '#FFE4E4',
    status: 'online',
  },
  {
    id: '3',
    name: '田中看護師',
    relation: '田中さん',
    role: '訪問看護師',
    phone: '090-ZZZZ-ZZZZ',
    email: 'tanaka@nursing.com',
    avatar: '田',
    avatarColor: '#FFE4E4',
    status: 'offline',
  },
];
