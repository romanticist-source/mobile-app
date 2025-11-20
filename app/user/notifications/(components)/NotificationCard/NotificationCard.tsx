import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { AlertHistory } from '@/_schema/alert';
import { styles } from './styles';

interface NotificationCardProps {
  alert: AlertHistory;
  onPress?: () => void;
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

export function NotificationCard({ alert, onPress }: NotificationCardProps) {
  const alertTypeLabel = ALERT_TYPE_LABELS[alert.alertType] || alert.alertType;
  // Get color based on importance level
  const priorityColor = PRIORITY_COLORS[alert.importance] || DEFAULT_COLOR;

  const dotColor = priorityColor;
  const borderColor = priorityColor;

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
          <Text style={styles.icon}>{alertTypeLabel}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{alert.title}</Text>
        </View>
        <Text style={styles.meta}>
          {alertTypeLabel} • {alert.createdAt}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

