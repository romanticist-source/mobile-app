import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import type { Schedule } from '@/_schema/schedule';

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$3"
      padding="$4"
      marginBottom="$3"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={3}
      elevation={2}
    >
      <XStack
        justifyContent="space-between"
        alignItems="flex-start"
        marginBottom="$2"
      >
        <XStack alignItems="center" gap="$3">
          <CategoryBadge category={schedule.category} />
          <XStack alignItems="center" gap="$1">
            <Text fontSize={14}>🕐</Text>
            <Text fontSize={14} color="$colorSecondary">
              {schedule.time}
            </Text>
          </XStack>
        </XStack>
        <XStack gap="$3">
          {onEdit && (
            <Button
              padding="$1"
              backgroundColor="transparent"
              onPress={onEdit}
              unstyled
            >
              <Text fontSize={20}>✏️</Text>
            </Button>
          )}
          {onDelete && (
            <Button
              padding="$1"
              backgroundColor="transparent"
              onPress={onDelete}
              unstyled
            >
              <Text fontSize={20}>🗑️</Text>
            </Button>
          )}
        </XStack>
      </XStack>
      <Text fontSize={16} fontWeight="600" color="$color" marginBottom="$1">
        {schedule.title}
      </Text>
      {schedule.description && (
        <Text fontSize={14} color="$colorSecondary">
          {schedule.description}
        </Text>
      )}
    </YStack>
  );
}

