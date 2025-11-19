import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import type { ScheduleCategory } from '@/_schema/schedule';

interface CategoryBadgeProps {
  category: ScheduleCategory;
}

const CATEGORY_COLORS: Record<ScheduleCategory, { background: string; text: string }> = {
  '予定': {
    background: '#FFE5E5',
    text: '#FF6B6B',
  },
  '休息': {
    background: '#E0F7F7',
    text: '#20C9A6',
  },
  'トイレ': {
    background: '#E3F2FD',
    text: '#2196F3',
  },
  '服薬': {
    background: '#FFF3E0',
    text: '#F57C00',
  },
  '食事': {
    background: '#F3E5F5',
    text: '#8E24AA',
  },
  '運動': {
    background: '#E8F5E9',
    text: '#43A047',
  },
  'その他': {
    background: '#F5F5F5',
    text: '#757575',
  },
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{category}</Text>
    </View>
  );
}

