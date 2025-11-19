import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import type { Notification, NotificationPriority } from '@/_schema/notification';

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
}

const PRIORITY_COLORS = {
  high: '#FF6B6B',
  medium: '#FF9ECD',
  low: '#2196F3',
};

const STATUS_COLORS = {
  unread: (priority: NotificationPriority) => PRIORITY_COLORS[priority],
  read: '#CCCCCC',
};

export function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const isUnread = notification.status === 'unread';
  const dotColor = isUnread
    ? PRIORITY_COLORS[notification.priority]
    : STATUS_COLORS.read;

  const borderColor = isUnread
    ? PRIORITY_COLORS[notification.priority]
    : '#E0E0E0';

  return (
    <XStack
      alignItems="center"
      backgroundColor="$background"
      borderRadius="$3"
      padding="$4"
      marginBottom="$3"
      gap="$3"
      borderWidth={1.5}
      borderColor={borderColor}
      pressStyle={{ opacity: 0.7 }}
      onPress={onPress}
    >
      <XStack alignItems="center" gap="$3">
        <YStack
          width={8}
          height={8}
          borderRadius={4}
          backgroundColor={dotColor}
        />
        <YStack
          width={24}
          height={24}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={20}>{notification.icon}</Text>
        </YStack>
      </XStack>

      <YStack flex={1} gap="$1">
        <XStack alignItems="center" gap="$2">
          <Text flex={1} fontSize={16} fontWeight="600" color="$color">
            {notification.title}
          </Text>
          {notification.badge && (
            <YStack
              backgroundColor="$primaryLight"
              paddingHorizontal="$2"
              paddingVertical={2}
              borderRadius="$1"
            >
              <Text fontSize={12} fontWeight="600" color="$primary">
                {notification.badge}
              </Text>
            </YStack>
          )}
        </XStack>
        <Text fontSize={14} color="$colorSecondary">
          {notification.source} • {notification.timeAgo}
        </Text>
      </YStack>

      <Text fontSize={24} color="$borderColor">›</Text>
    </XStack>
  );
}

