import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUserSchedulesByUserId, deleteUserSchedule } from '@/api/user-schedules';
import { useUser } from '@/contexts/UserContext';
import type { UserSchedule } from '@/_schema';

interface UseSchedulesReturn {
  schedules: UserSchedule[];
  loading: boolean;
  error: Error | null;
  fetchSchedules: () => Promise<void>;
  deleteSchedule: (scheduleId: string) => Promise<void>;
}

export function useSchedules(): UseSchedulesReturn {
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [schedules, setSchedules] = useState<UserSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedules = useCallback(async () => {
    if (!selectedUserId || isUserLoading) {
      console.log('[useSchedules] Waiting for userId...', { selectedUserId, isUserLoading });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('[useSchedules] Fetching schedules for userId:', selectedUserId);
      const data = await getUserSchedulesByUserId(selectedUserId);
      console.log('[useSchedules] Fetched schedules:', data.length);

      // 開始時刻でソート（最新が上）
      const sortedData = data.sort(
        (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
      );
      setSchedules(sortedData);
      setError(null);
    } catch (err) {
      console.error('[useSchedules] Error fetching schedules:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedUserId, isUserLoading]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const deleteSchedule = useCallback(async (scheduleId: string) => {
    try {
      await deleteUserSchedule(scheduleId);
      // 削除成功後、ローカルのstateも更新
      setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
    } catch (err) {
      console.error('Failed to delete schedule:', err);
      Alert.alert('エラー', 'スケジュールの削除に失敗しました');
    }
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    deleteSchedule,
  };
}
