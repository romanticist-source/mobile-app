import React from 'react';
import { YStack, XStack, Text, Input } from 'tamagui';

interface SchedulesSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SchedulesSearchBar({
  value,
  onChangeText,
}: SchedulesSearchBarProps) {
  return (
    <YStack paddingHorizontal="$4" marginTop="$4">
      <XStack
        alignItems="center"
        backgroundColor="$backgroundSecondary"
        borderRadius="$3"
        paddingHorizontal="$4"
        paddingVertical="$3"
        gap="$2"
      >
        <Text fontSize={16}>🔍</Text>
        <Input
          flex={1}
          fontSize={14}
          color="$color"
          placeholder="スケジュールを検索..."
          placeholderTextColor="$colorSecondary"
          value={value}
          onChangeText={onChangeText}
          borderWidth={0}
          backgroundColor="transparent"
        />
      </XStack>
    </YStack>
  );
}

