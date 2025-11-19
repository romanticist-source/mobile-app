import React from 'react';
import { XStack, Text } from 'tamagui';

interface NotificationsActionsBarProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationsActionsBar({
  unreadCount,
  onMarkAllRead,
}: NotificationsActionsBarProps) {
  return (
    <XStack gap="$3" paddingHorizontal="$4" paddingTop="$4">
      <XStack
        alignItems="center"
        gap="$1.5"
        paddingHorizontal="$4"
        paddingVertical="$2"
        borderRadius="$5"
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$primary"
      >
        <Text fontSize={16}>🔔</Text>
        <Text fontSize={14} fontWeight="600" color="$primary">
          未読 {unreadCount}件
        </Text>
      </XStack>
      <XStack
        alignItems="center"
        gap="$1.5"
        paddingHorizontal="$4"
        paddingVertical="$2"
        borderRadius="$5"
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
        pressStyle={{ opacity: 0.7 }}
        onPress={onMarkAllRead}
      >
        <Text fontSize={16} color="$primary">✓</Text>
        <Text fontSize={14} fontWeight="600" color="$colorSecondary">
          すべて既読
        </Text>
      </XStack>
    </XStack>
  );
}

