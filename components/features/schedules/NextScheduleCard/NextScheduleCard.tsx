import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface NextScheduleCardProps {
  title: string;
  time: string;
  scheduleType: string;
}

// Category colors - same as ScheduleCard
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

export function NextScheduleCard({ title, time, scheduleType }: NextScheduleCardProps) {
  const borderColor = CATEGORY_BORDER_COLORS[scheduleType] || DEFAULT_BORDER_COLOR;

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
      <View style={styles.header}>
        <MaterialIcons name="event" size={18} color="#FF6B6B" />
        <Text style={styles.headerText}>次の予定</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.timeContainer}>
        <MaterialIcons name="schedule" size={14} color="#666666" />
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
