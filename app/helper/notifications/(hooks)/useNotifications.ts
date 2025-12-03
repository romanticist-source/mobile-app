import { useState, useEffect, useCallback, useMemo } from 'react';
import type { AlertHistory, UserAlertHistory } from '@/_schema/alert';
import {
  getAlertsByUserId,
  getUserAlertHistory,
  markAlertAsCheckedByUser,
} from '@/api/alerts';
import { useHelperUserConnection } from '@/hooks/useHelperUserConnection';

export type AlertTypeFilter = 'all' | 'medication' | 'appointment' | 'health' | 'toilet' | 'exercise' | 'emergency' | 'meal' | 'rest';
export type ReadFilter = 'all' | 'unread';

export const ALERT_TYPE_OPTIONS: { value: AlertTypeFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'medication', label: '服薬' },
  { value: 'appointment', label: '予定' },
  { value: 'health', label: '健康' },
  { value: 'toilet', label: 'トイレ' },
  { value: 'exercise', label: '運動' },
  { value: 'emergency', label: '緊急' },
  { value: 'meal', label: '食事' },
  { value: 'rest', label: '休息' },
];

interface UseNotificationsReturn {
  notifications: AlertHistory[];
  filteredNotifications: AlertHistory[];
  isLoading: boolean;
  error: string | null;

  // Filter state
  alertTypeFilter: AlertTypeFilter;
  readFilter: ReadFilter;
  setAlertTypeFilter: (filter: AlertTypeFilter) => void;
  setReadFilter: (filter: ReadFilter) => void;

  // Counts
  unreadCount: number;
  totalCount: number;

  // Actions
  markAsRead: (alertId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  isRead: (alertId: string) => boolean;
  refresh: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { userId, loading: userConnectionLoading } = useHelperUserConnection();
  const [notifications, setNotifications] = useState<AlertHistory[]>([]);
  const [checkedAlerts, setCheckedAlerts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [alertTypeFilter, setAlertTypeFilter] = useState<AlertTypeFilter>('all');
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!userId || userConnectionLoading) {
      console.log('[useNotifications (Helper)] Waiting for userId...', { userId, userConnectionLoading });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('[useNotifications (Helper)] Fetching alerts for userId:', userId);
      const alerts = await getAlertsByUserId(userId);
      console.log('[useNotifications (Helper)] Fetched alerts:', alerts.length);
      setNotifications(alerts);

      // Fetch user alert history
      try {
        const history = await getUserAlertHistory(userId);
        console.log('[useNotifications (Helper)] Fetched alert history:', history.length);
        const checkedIds = new Set(
          history.filter((h: UserAlertHistory) => h.isChecked).map((h: UserAlertHistory) => h.alertId)
        );
        console.log('[useNotifications (Helper)] Checked alert IDs:', Array.from(checkedIds));
        setCheckedAlerts(checkedIds);
      } catch (err) {
        console.error('[useNotifications (Helper)] Failed to fetch alert history:', err);
        setCheckedAlerts(new Set());
      }
    } catch (err) {
      console.error('[useNotifications (Helper)] Error fetching alerts:', err);
      const message = err instanceof Error ? err.message : '通知の取得に失敗しました';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, userConnectionLoading]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Check if alert is read
  const isRead = useCallback((alertId: string) => {
    return checkedAlerts.has(alertId);
  }, [checkedAlerts]);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      // Filter by alert type
      if (alertTypeFilter !== 'all' && notification.alertType !== alertTypeFilter) {
        return false;
      }

      // Filter by read status
      if (readFilter === 'unread' && isRead(notification.id)) {
        return false;
      }

      return true;
    });
  }, [notifications, alertTypeFilter, readFilter, isRead]);

  // Calculate counts
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !isRead(n.id)).length;
  }, [notifications, isRead]);

  const totalCount = notifications.length;

  // Mark single notification as read
  const markAsRead = useCallback(async (alertId: string) => {
    if (!userId || checkedAlerts.has(alertId)) return;

    try {
      const result = await markAlertAsCheckedByUser(alertId, userId);
      console.log('[useNotifications (Helper)] Marked as read:', alertId, result);
    } catch (err) {
      console.error('[useNotifications (Helper)] Failed to mark as read:', alertId, err);
    }

    // Update local state regardless of API result
    setCheckedAlerts((prev) => {
      const newSet = new Set(prev);
      newSet.add(alertId);
      return newSet;
    });
  }, [checkedAlerts, userId]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    const unreadIds = notifications
      .filter((n) => !checkedAlerts.has(n.id))
      .map((n) => n.id);

    // Call API for each unread notification (ignore errors)
    await Promise.allSettled(
      unreadIds.map((id) => markAlertAsCheckedByUser(id, userId))
    );

    // Update local state regardless of API result
    setCheckedAlerts((prev) => {
      const newSet = new Set(prev);
      unreadIds.forEach((id) => newSet.add(id));
      return newSet;
    });
  }, [notifications, checkedAlerts, userId]);

  return {
    notifications,
    filteredNotifications,
    isLoading,
    error,

    alertTypeFilter,
    readFilter,
    setAlertTypeFilter,
    setReadFilter,

    unreadCount,
    totalCount,

    markAsRead,
    markAllAsRead,
    isRead,
    refresh: fetchNotifications,
  };
}
