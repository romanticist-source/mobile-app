import { mockNotifications } from '@/api/__mock__/alert';
import type { AlertHistory } from '@/_schema/alert';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NotificationsActionsBar } from './(components)/NotificationsActionsBar/NotificationsActionsBar';
import { NotificationsFilters } from './(components)/NotificationsFilters/NotificationsFilters';
import { NotificationsList } from './(components)/NotificationsList/NotificationsList';
import { NotificationsPagination } from './(components)/NotificationsPagination/NotificationsPagination';
import { styles } from './styles';

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const notifications = mockNotifications;

  const unreadCount = notifications.filter((n) => n.importance === 1).length;
  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => n.importance === 1)
      : notifications;

  const handleMarkAllRead = () => {
    console.log('Mark all as read');
  };

  const handleNotificationPress = (notification: AlertHistory) => {
    console.log('Notification pressed:', notification.id);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          <AppHeader />

          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>通知</Text>
          </View>

          <NotificationsActionsBar
            unreadCount={unreadCount}
            onMarkAllRead={handleMarkAllRead}
          />

          <NotificationsFilters
            currentFilter={filter}
            onFilterChange={setFilter}
          />

          <NotificationsList
            alerts={filteredNotifications}
            onNotificationPress={handleNotificationPress}
          />

          <NotificationsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </UserHomeLayout>

        <BottomNavigation activeTab="notification" />
      </View>
    </>
  );
}
