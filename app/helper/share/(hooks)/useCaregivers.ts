import { getEmergencyContactsByHelperId } from '@/api/emergency-contacts';
import { getUserById } from '@/api/users';
import type { EmergencyContact } from '@/_schema';
import { useHelper } from '@/contexts/HelperContext';
import { useState, useEffect, useCallback } from 'react';

export interface CaregiverDisplay {
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

// EmergencyContact から CaregiverDisplay への変換（担当ユーザー情報）
const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const emergencyContactToCaregiverDisplay = async (contact: EmergencyContact, index: number): Promise<CaregiverDisplay> => {
  try {
    const user = await getUserById(contact.userId);
    return {
      id: contact.userId,
      name: user.name,
      relation: '担当ユーザー',
      role: contact.relationship, // helperとの関係性（例: 長男、ケアマネージャーなど）
      phone: contact.phoneNumber, // 緊急連絡先の電話番号を使用
      email: user.mail, // Userスキーマでは'mail'プロパティを使用
      avatar: user.name.charAt(0),
      avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
      status: 'offline',
    };
  } catch (error) {
    // ユーザー情報が取得できない場合は緊急連絡先の情報を使用
    return {
      id: contact.userId,
      name: contact.name,
      relation: '担当ユーザー',
      role: contact.relationship,
      phone: contact.phoneNumber,
      email: contact.email,
      avatar: contact.name.charAt(0),
      avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
      status: 'offline',
    };
  }
};

export function useCaregivers() {
  const { selectedHelperId, isLoading: isHelperLoading } = useHelper();
  const [caregivers, setCaregivers] = useState<CaregiverDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaregivers = useCallback(async () => {
    if (!selectedHelperId || isHelperLoading) {
      console.log('[useCaregivers (Helper)] Waiting for helperId...', { selectedHelperId, isHelperLoading });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('[useCaregivers (Helper)] Fetching emergency contacts for helperId:', selectedHelperId);
      const contacts = await getEmergencyContactsByHelperId(selectedHelperId);
      console.log('[useCaregivers (Helper)] Fetched emergency contacts:', contacts.length, contacts);

      // 各緊急連絡先からユーザー情報を取得して変換
      const displayCaregiversPromises = contacts.map((contact, index) =>
        emergencyContactToCaregiverDisplay(contact, index)
      );
      const displayCaregivers = await Promise.all(displayCaregiversPromises);

      setCaregivers(displayCaregivers);
      setError(null);
    } catch (err) {
      console.error('[useCaregivers (Helper)] Error fetching caregivers:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedHelperId, isHelperLoading]);

  useEffect(() => {
    fetchCaregivers();
  }, [fetchCaregivers]);

  return {
    caregivers,
    loading,
    error,
    refetch: fetchCaregivers,
  };
}
