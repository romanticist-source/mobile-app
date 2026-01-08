import { getConnections } from '@/api/helper-connect';
import type { HelperConnectWithDetails } from '@/_schema';
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

// HelperConnectWithDetails から CaregiverDisplay への変換
const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const helperConnectToCaregiverDisplay = (connection: HelperConnectWithDetails, index: number): CaregiverDisplay => ({
  id: connection.helperId,
  name: connection.helper?.name || '不明な介助者',
  relation: '介助者',
  role: '介助者',
  phone: '-', // Helper schema doesn't have phoneNumber
  email: connection.helper?.email,
  avatar: (connection.helper?.name || 'H').charAt(0),
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
      console.log('[useCaregivers] Fetching approved connections for userId:', selectedUserId);
      const connections = await getConnections();
      console.log('[useCaregivers] Fetched all connections:', connections.length, connections);

      // Filter approved connections for this user
      const userConnections = connections.filter(
        (conn) => conn.userId === selectedUserId && conn.status === 'approved'
      );
      console.log('[useCaregivers] User approved connections:', userConnections.length);

      const displayCaregivers = userConnections.map((connection, index) =>
        helperConnectToCaregiverDisplay(connection, index)
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
