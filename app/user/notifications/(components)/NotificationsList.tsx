import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NotificationCard, Notification } from './NotificationCard';

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

const styles = StyleSheet.create({
  notificationsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
