import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { NotificationCard } from '../NotificationCard/NotificationCard';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import type { AlertHistory } from '@/_schema/alert';

interface NotificationsListProps {
  alerts: AlertHistory[];
  onNotificationPress: (alert: AlertHistory) => void;
  itemsPerPage?: number;
}

export function NotificationsList({
  alerts,
  onNotificationPress,
  itemsPerPage = 5,
}: NotificationsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = alerts.slice(startIndex, endIndex);

  // Reset to page 1 when alerts change
  useEffect(() => {
    setCurrentPage(1);
  }, [alerts.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationsList}>
        {currentAlerts.map((alert) => (
          <NotificationCard
            key={alert.id}
            alert={alert}
            onPress={() => onNotificationPress(alert)}
          />
        ))}
      </View>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={alerts.length}
      />
    </View>
  );
}

