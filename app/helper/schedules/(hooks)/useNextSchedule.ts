import { useMemo } from 'react';
import type { UserSchedule } from '@/_schema';

interface NextScheduleInfo {
  title: string;
  time: string;
}

export function useNextSchedule(schedules: UserSchedule[]): NextScheduleInfo {
  return useMemo(() => {
    const now = new Date();
    const upcomingSchedules = schedules
      .filter((s) => new Date(s.startAt) > now)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

    if (upcomingSchedules.length > 0) {
      const next = upcomingSchedules[0];
      const startTime = new Date(next.startAt).toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return {
        title: next.title || next.scheduleType,
        time: startTime,
      };
    }
    return { title: '予定なし', time: '' };
  }, [schedules]);
}
