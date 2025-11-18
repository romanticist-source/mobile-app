import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
