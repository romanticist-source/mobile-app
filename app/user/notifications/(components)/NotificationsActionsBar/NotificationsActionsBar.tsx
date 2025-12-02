import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
        <MaterialIcons name="notifications" size={18} color="#FF6B6B" />
        <Text style={styles.unreadText}>未読 {unreadCount}件</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.markAllReadButton}
        onPress={onMarkAllRead}
      >
        <MaterialIcons name="check" size={16} color="#666666" />
        <Text style={styles.markAllReadText}>すべて既読</Text>
      </TouchableOpacity>
    </View>
  );
}

