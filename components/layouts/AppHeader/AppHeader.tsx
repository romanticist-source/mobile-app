import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

interface AppHeaderProps {
  userName?: string;
}

export function AppHeader({ userName = 'ユーザー名' }: AppHeaderProps) {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$4"
      paddingTop={50}
      paddingBottom="$4"
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <XStack alignItems="center" gap="$3">
        <YStack
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={20}>❤️</Text>
        </YStack>
        <YStack>
          <Text fontSize={16} fontWeight="bold" color="$color">
            みまもりケア
          </Text>
          <Text fontSize={11} color="$colorSecondary">
            あなたの健康をサポート
          </Text>
        </YStack>
      </XStack>
      <XStack alignItems="center" gap="$2">
        <YStack
          width={24}
          height={24}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={16} color="$primary">👤</Text>
        </YStack>
        <Text fontSize={14} color="$color">
          {userName}
        </Text>
      </XStack>
    </XStack>
  );
}

