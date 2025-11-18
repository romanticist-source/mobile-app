import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  unreadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  bellIcon: {
    fontSize: 16,
  },
  unreadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  markAllReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  markAllReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
});
