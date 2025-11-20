import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUserSchedules, deleteUserSchedule } from '@/api/user-schedules';
import type { UserSchedule } from '@/_schema';

interface UseSchedulesReturn {
  schedules: UserSchedule[];
  loading: boolean;
  error: Error | null;
  fetchSchedules: () => Promise<void>;
  deleteSchedule: (scheduleId: string) => Promise<void>;
}

export function useSchedules(): UseSchedulesReturn {
  const [schedules, setSchedules] = useState<UserSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserSchedules();
      // 開始時刻でソート（最新が上）
      const sortedData = data.sort(
        (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
      );
      setSchedules(sortedData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

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
