import React from 'react';
import { View, Text,  } from 'react-native';
import { styles } from './styles';
export type ScheduleCategory = '予定' | '休息' | 'トイレ';

interface CategoryBadgeProps {
  category: ScheduleCategory;
}

const CATEGORY_COLORS = {
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
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{category}</Text>
    </View>
  );
}

