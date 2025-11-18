export type NotificationPriority = 'high' | 'medium' | 'low';
export type NotificationStatus = 'read' | 'unread';

export interface Notification {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  icon: string;
  badge?: string;
}
