import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import type { UserSchedule, ScheduleCategory } from '@/_schema/schedule';
import { styles } from './styles';

interface ScheduleCardProps {
  schedule: UserSchedule;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Helper function to format ISO date string to time (HH:MM)
const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Category colors - use text color from CategoryBadge for border
const CATEGORY_BORDER_COLORS: Record<string, string> = {
  // 日本語
  '予定': '#FF6B6B',
  '休息': '#20C9A6',
  'トイレ': '#2196F3',
  '服薬': '#F57C00',
  '食事': '#8E24AA',
  '運動': '#43A047',
  'その他': '#757575',
  // 英語（バックエンドから返される値）
  'appointment': '#FF6B6B',
  'rest': '#20C9A6',
  'toilet': '#2196F3',
  'medication': '#F57C00',
  'meal': '#8E24AA',
  'exercise': '#43A047',
  'other': '#757575',
};

const DEFAULT_BORDER_COLOR = '#757575';

export function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {
  const borderColor = CATEGORY_BORDER_COLORS[schedule.scheduleType as ScheduleCategory] || DEFAULT_BORDER_COLOR;

  // Debug: Log schedule type to check what value we're getting
  if (!CATEGORY_BORDER_COLORS[schedule.scheduleType as ScheduleCategory]) {
    console.log('[ScheduleCard] Unknown scheduleType:', schedule.scheduleType, 'Title:', schedule.title);
  }

  return (
    <View
      style={[
        styles.card,
        {
          borderColor,
          borderWidth: 2,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <CategoryBadge category={schedule.scheduleType} />
          <View style={styles.timeContainer}>
            <MaterialIcons name="schedule" size={14} color="#666666" />
            <Text style={styles.time}>{formatTime(schedule.startAt)}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <MaterialIcons name="edit" size={18} color="#666666" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <MaterialIcons name="delete" size={18} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.title}>{schedule.title}</Text>
      {schedule.description && (
        <Text style={styles.description}>{schedule.description}</Text>
      )}
    </View>
  );
}

