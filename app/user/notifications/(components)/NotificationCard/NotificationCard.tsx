import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { AlertHistory } from '@/_schema/alert';
import { styles } from './styles';
import { NotificationPriority } from '@/_schema/notification';

interface NotificationCardProps {
  alert: AlertHistory;
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

export function NotificationCard({ alert, onPress }: NotificationCardProps) {
  const isUnread = alert.importance === 1;
  const dotColor = isUnread
    ? PRIORITY_COLORS[alert.importance]
    : STATUS_COLORS.read;

  const borderColor = isUnread
    ? PRIORITY_COLORS[alert.importance]
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
          <Text style={styles.icon}>{alert.alertType}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{alert.title}</Text>
        </View>
        <Text style={styles.meta}>
          {alert.alertType} • {alert.createdAt}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

