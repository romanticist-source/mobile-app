import React from 'react';
import { YStack, Text, getTokens } from 'tamagui';
import type { ScheduleCategory } from '@/_schema/schedule';

interface CategoryBadgeProps {
  category: ScheduleCategory;
}

const CATEGORY_COLORS: Record<ScheduleCategory, { background: string; text: string }> = {
  '予定': {
    background: '$primaryLight',
    text: '$primary',
  },
  '休息': {
    background: '$categoryRestBg',
    text: '$categoryRest',
  },
  'トイレ': {
    background: '$categoryToiletBg',
    text: '$categoryToilet',
  },
  '服薬': {
    background: '$categoryMedicineBg',
    text: '$categoryMedicine',
  },
  '食事': {
    background: '$categoryFoodBg',
    text: '$categoryFood',
  },
  '運動': {
    background: '$categoryExerciseBg',
    text: '$categoryExercise',
  },
  'その他': {
    background: '$backgroundSecondary',
    text: '$colorSecondary',
  },
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <YStack
      paddingHorizontal="$3"
      paddingVertical="$1"
      borderRadius="$3"
      alignSelf="flex-start"
      backgroundColor={colors.background}
    >
      <Text fontSize={12} fontWeight="600" color={colors.text}>
        {category}
      </Text>
    </YStack>
  );
}

