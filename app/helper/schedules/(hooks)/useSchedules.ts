import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUserSchedules, deleteUserSchedule } from '@/api/user-schedules';
import type { UserSchedule } from '@/_schema';

interface UseSchedulesOptions {
  helperId: string;
}

interface UseSchedulesReturn {
  schedules: UserSchedule[];
  loading: boolean;
  error: Error | null;
  fetchSchedules: () => Promise<void>;
  deleteSchedule: (scheduleId: string) => Promise<void>;
}

export function useSchedules({ helperId }: UseSchedulesOptions): UseSchedulesReturn {
  const [schedules, setSchedules] = useState<UserSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedules = useCallback(async () => {
    if (!helperId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with getSchedulesByHelperId when API is ready
      // For now, using getUserSchedules as fallback
      const data = await getUserSchedules(); // This needs to be replaced with proper helper API
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
  }, [helperId]);

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
