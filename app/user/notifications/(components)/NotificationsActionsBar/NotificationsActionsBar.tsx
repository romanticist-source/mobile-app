import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface NotificationsActionsBarProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationsActionsBar({
  unreadCount,
  onMarkAllRead,
}: NotificationsActionsBarProps) {
  return (
    <View style={styles.actionsBar}>
      <TouchableOpacity style={styles.unreadButton}>
        <Text style={styles.bellIcon}>🔔</Text>
        <Text style={styles.unreadText}>未読 {unreadCount}件</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.markAllReadButton}
        onPress={onMarkAllRead}
      >
        <Text style={styles.checkIcon}>✓</Text>
        <Text style={styles.markAllReadText}>すべて既読</Text>
      </TouchableOpacity>
    </View>
  );
}

