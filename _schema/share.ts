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
