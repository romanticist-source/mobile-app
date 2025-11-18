import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { NotificationCard, Notification } from '../NotificationCard/NotificationCard';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
}

export function NotificationsList({
  notifications,
  onNotificationPress,
}: NotificationsListProps) {
  return (
    <View style={styles.notificationsList}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onPress={() => onNotificationPress(notification)}
        />
      ))}
    </View>
  );
}

