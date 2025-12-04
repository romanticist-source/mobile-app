import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import type { ScheduleCategory } from '@/_schema/schedule';

interface CategoryBadgeProps {
  category: string; // Accept string from UserSchedule.scheduleType
}

const CATEGORY_COLORS: Record<string, { background: string; text: string; label: string }> = {
  // 日本語
  '予定': {
    background: '#FFE5E5',
    text: '#FF6B6B',
    label: '予定',
  },
  '休息': {
    background: '#E0F7F7',
    text: '#20C9A6',
    label: '休息',
  },
  'トイレ': {
    background: '#E3F2FD',
    text: '#2196F3',
    label: 'トイレ',
  },
  '服薬': {
    background: '#FFF3E0',
    text: '#F57C00',
    label: '服薬',
  },
  '食事': {
    background: '#F3E5F5',
    text: '#8E24AA',
    label: '食事',
  },
  '運動': {
    background: '#E8F5E9',
    text: '#43A047',
    label: '運動',
  },
  'その他': {
    background: '#F5F5F5',
    text: '#757575',
    label: 'その他',
  },
  // 英語（バックエンドから返される値）
  'appointment': {
    background: '#FFE5E5',
    text: '#FF6B6B',
    label: '予定',
  },
  'rest': {
    background: '#E0F7F7',
    text: '#20C9A6',
    label: '休息',
  },
  'toilet': {
    background: '#E3F2FD',
    text: '#2196F3',
    label: 'トイレ',
  },
  'medication': {
    background: '#FFF3E0',
    text: '#F57C00',
    label: '服薬',
  },
  'meal': {
    background: '#F3E5F5',
    text: '#8E24AA',
    label: '食事',
  },
  'exercise': {
    background: '#E8F5E9',
    text: '#43A047',
    label: '運動',
  },
  'other': {
    background: '#F5F5F5',
    text: '#757575',
    label: 'その他',
  },
};

const DEFAULT_COLORS = {
  background: '#F5F5F5',
  text: '#757575',
  label: 'その他',
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category as ScheduleCategory] || DEFAULT_COLORS;

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{colors.label}</Text>
    </View>
  );
}

