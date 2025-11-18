import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Notification, NotificationPriority } from '@/_schema/notification';
import { styles } from './styles';

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

