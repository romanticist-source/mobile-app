import React from 'react';
import { YStack, XStack, Text } from 'tamagui';

interface NextScheduleCardProps {
  title: string;
  time: string;
}

export function NextScheduleCard({ title, time }: NextScheduleCardProps) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$3"
      padding="$4"
      borderLeftWidth={4}
      borderLeftColor="$primary"
      marginBottom="$4"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.05}
      shadowRadius={4}
      elevation={2}
    >
      <XStack alignItems="center" gap="$2" marginBottom="$2">
        <Text fontSize={16}>📅</Text>
        <Text fontSize={14} color="$colorSecondary">
          次の予定
        </Text>
      </XStack>
      <Text fontSize={18} fontWeight="bold" color="$color" marginBottom="$2">
        {title}
      </Text>
      <XStack alignItems="center" gap="$1">
        <Text fontSize={14}>🕐</Text>
        <Text fontSize={14} color="$colorSecondary">
          {time}
        </Text>
      </XStack>
    </YStack>
  );
}
