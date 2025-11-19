import React from 'react';
import { YStack } from 'tamagui';
import { NotificationCard } from '../NotificationCard/NotificationCard';
import type { Notification } from '@/_schema/notification';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
}

export function NotificationsList({
  notifications,
  onNotificationPress,
}: NotificationsListProps) {
  return (
    <YStack paddingHorizontal="$4" paddingTop="$4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onPress={() => onNotificationPress(notification)}
        />
      ))}
    </YStack>
  );
}

