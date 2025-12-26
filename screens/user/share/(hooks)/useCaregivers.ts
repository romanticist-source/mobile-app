import { getEmergencyContactsByUserId } from '@/api/emergency-contacts';
import type { EmergencyContact } from '@/_schema';
import { useUser } from '@/contexts/UserContext';
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

// EmergencyContact から CaregiverDisplay への変換
const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const emergencyContactToCaregiverDisplay = (contact: EmergencyContact, index: number): CaregiverDisplay => ({
  id: contact.helperId,
  name: contact.name,
  relation: contact.relationship,
  role: contact.relationship, // 緊急連絡先には役職がないので関係性を使用
  phone: contact.phoneNumber,
  email: contact.email,
  avatar: contact.name.charAt(0),
  avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
  status: 'offline',
});

export function useCaregivers() {
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [caregivers, setCaregivers] = useState<CaregiverDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaregivers = useCallback(async () => {
    if (!selectedUserId || isUserLoading) {
      console.log('[useCaregivers] Waiting for userId...', { selectedUserId, isUserLoading });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('[useCaregivers] Fetching emergency contacts for userId:', selectedUserId);
      const contacts = await getEmergencyContactsByUserId(selectedUserId);
      console.log('[useCaregivers] Fetched emergency contacts:', contacts.length, contacts);

      const displayCaregivers = contacts.map((contact, index) =>
        emergencyContactToCaregiverDisplay(contact, index)
      );
      setCaregivers(displayCaregivers);
      setError(null);
    } catch (err) {
      console.error('[useCaregivers] Error fetching caregivers:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedUserId, isUserLoading]);

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
