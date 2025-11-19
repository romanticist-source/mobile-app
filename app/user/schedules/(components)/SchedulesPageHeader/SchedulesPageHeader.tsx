import React from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';

interface SchedulesPageHeaderProps {
  date: string;
  onAddPress: () => void;
}

export function SchedulesPageHeader({
  date,
  onAddPress,
}: SchedulesPageHeaderProps) {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="flex-start"
      paddingHorizontal="$4"
      paddingTop="$6"
      paddingBottom="$4"
      backgroundColor="$background"
    >
      <YStack flex={1}>
        <XStack alignItems="center" gap="$2" marginBottom="$1">
          <Text fontSize={24}>📅</Text>
          <Text fontSize={24} fontWeight="bold" color="$color">
            スケジュール管理
          </Text>
        </XStack>
        <Text fontSize={14} color="$colorSecondary">
          {date}
        </Text>
      </YStack>
      <Button
        backgroundColor="$primary"
        paddingHorizontal="$5"
        paddingVertical="$2.5"
        borderRadius="$5"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.2}
        shadowRadius={4}
        elevation={3}
        onPress={onAddPress}
      >
        <Text color="white" fontSize={14} fontWeight="bold">
          + 追加
        </Text>
      </Button>
    </XStack>
  );
}

