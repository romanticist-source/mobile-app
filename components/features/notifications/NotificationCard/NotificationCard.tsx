import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { AlertHistory } from '@/_schema/alert';
import { styles } from './styles';

interface NotificationCardProps {
  alert: AlertHistory;
  onPress?: () => void;
  isRead?: boolean;
  onMarkAsRead?: () => void;
}

// importance: 1 = 低優先度 (low), 2 = 中優先度 (medium), 3 = 高優先度 (high)
const PRIORITY_COLORS: Record<number, string> = {
  1: '#2196F3', // low - blue
  2: '#FF9ECD', // medium - pink
  3: '#FF6B6B', // high - red
};

const DEFAULT_COLOR = '#CCCCCC';

// alertType to Japanese label mapping
const ALERT_TYPE_LABELS: Record<string, string> = {
  medication: '服薬',
  appointment: '予定',
  health: '健康',
  toilet: 'トイレ',
  exercise: '運動',
  emergency: '緊急',
  meal: '食事',
  rest: '休息',
};

// alertType to MaterialIcons name mapping
const ALERT_TYPE_ICONS: Record<string, string> = {
  medication: 'medication',
  appointment: 'event',
  health: 'favorite',
  toilet: 'wc',
  exercise: 'fitness-center',
  emergency: 'emergency',
  meal: 'restaurant',
  rest: 'hotel',
};

export function NotificationCard({ alert, onPress, isRead = false, onMarkAsRead }: NotificationCardProps) {
  const alertTypeLabel = ALERT_TYPE_LABELS[alert.alertType] || alert.alertType;
  const iconName = ALERT_TYPE_ICONS[alert.alertType] || 'notifications';
  // Get color based on importance level
  const priorityColor = PRIORITY_COLORS[alert.importance] || DEFAULT_COLOR;

  const dotColor = priorityColor;
  const borderColor = isRead ? '#E0E0E0' : priorityColor;
  const iconColor = isRead ? '#999999' : priorityColor;

  const handleMarkAsRead = () => {
    if (!isRead && onMarkAsRead) {
      onMarkAsRead();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderColor: isRead ? '#CCCCCC' : priorityColor,
          borderWidth: 2,
        },
        isRead && styles.cardRead,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.dot, { backgroundColor: isRead ? '#CCCCCC' : dotColor }]} />
        <View style={styles.iconContainer}>
          <MaterialIcons name={iconName as any} size={24} color={iconColor} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isRead && styles.titleRead]}>{alert.title}</Text>
        </View>
        <Text style={styles.meta}>
          {alertTypeLabel} • {alert.createdAt}
        </Text>
      </View>

      {!isRead && onMarkAsRead && (
        <TouchableOpacity
          style={styles.markReadButton}
          onPress={handleMarkAsRead}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.markReadButtonText}>既読</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

