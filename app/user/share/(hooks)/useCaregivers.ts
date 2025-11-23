import { getHelpers } from '@/api/helpers';
import type { Helper } from '@/_schema';
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

// Helper から CaregiverDisplay への変換
const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const helperToCaregiverDisplay = (helper: Helper, index: number): CaregiverDisplay => ({
  id: helper.id,
  name: helper.name,
  relation: helper.relationship,
  role: helper.nickname,
  phone: helper.phoneNumber,
  email: helper.email,
  avatar: helper.name.charAt(0),
  avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
  status: 'offline',
});

export function useCaregivers() {
  const [caregivers, setCaregivers] = useState<CaregiverDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaregivers = useCallback(async () => {
    try {
      setLoading(true);
      const helpers = await getHelpers();
      const displayCaregivers = helpers.map((helper, index) =>
        helperToCaregiverDisplay(helper, index)
      );
      setCaregivers(displayCaregivers);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

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
