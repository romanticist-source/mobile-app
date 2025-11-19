import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { NotificationCard } from '../NotificationCard/NotificationCard';
import type { AlertHistory } from '@/_schema/alert';

interface NotificationsListProps {
  alerts: AlertHistory[];
  onNotificationPress: (alert: AlertHistory) => void;
}

export function NotificationsList({
  alerts,
  onNotificationPress,
}: NotificationsListProps) {
  return (
    <View style={styles.notificationsList}>
      {alerts.map((alert) => (
        <NotificationCard
          key={alert.id}
          alert={alert}
          onPress={() => onNotificationPress(alert)}
        />
      ))}
    </View>
  );
}

