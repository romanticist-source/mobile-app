import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type NotificationPriority = 'high' | 'medium' | 'low';
export type NotificationStatus = 'unread' | 'read';

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

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
}

const PRIORITY_COLORS = {
  high: '#FF6B6B',
  medium: '#FF9ECD',
  low: '#2196F3',
};

const STATUS_COLORS = {
  unread: (priority: NotificationPriority) => PRIORITY_COLORS[priority],
  read: '#CCCCCC',
};

export function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const isUnread = notification.status === 'unread';
  const dotColor = isUnread
    ? PRIORITY_COLORS[notification.priority]
    : STATUS_COLORS.read;

  const borderColor = isUnread
    ? PRIORITY_COLORS[notification.priority]
    : '#E0E0E0';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderColor, borderWidth: 1.5 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{notification.icon}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{notification.title}</Text>
          {notification.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notification.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.meta}>
          {notification.source} • {notification.timeAgo}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  meta: {
    fontSize: 14,
    color: '#666666',
  },
  arrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
});
