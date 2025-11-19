import { mockNotifications } from '@/_api/__mock__/notification';
import type { Notification } from '@/_schema/notification';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { YStack, Text } from 'tamagui';
import { NotificationsActionsBar } from './(components)/NotificationsActionsBar/NotificationsActionsBar';
import { NotificationsFilters } from './(components)/NotificationsFilters/NotificationsFilters';
import { NotificationsList } from './(components)/NotificationsList/NotificationsList';
import { NotificationsPagination } from './(components)/NotificationsPagination/NotificationsPagination';

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const notifications = mockNotifications;

  const unreadCount = notifications.filter((n) => n.status === 'unread').length;
  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => n.status === 'unread')
      : notifications;

  const handleMarkAllRead = () => {
    console.log('Mark all as read');
  };

  const handleNotificationPress = (notification: Notification) => {
    console.log('Notification pressed:', notification.id);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <YStack flex={1} backgroundColor="$backgroundSecondary">
        <UserHomeLayout>
          <AppHeader />

          {/* Page Title */}
          <YStack
            paddingHorizontal="$4"
            paddingTop="$6"
            paddingBottom="$4"
            backgroundColor="$background"
          >
            <Text fontSize={28} fontWeight="bold" color="$color">
              通知
            </Text>
          </YStack>

          <NotificationsActionsBar
            unreadCount={unreadCount}
            onMarkAllRead={handleMarkAllRead}
          />

          <NotificationsFilters
            currentFilter={filter}
            onFilterChange={setFilter}
          />

          <NotificationsList
            notifications={filteredNotifications}
            onNotificationPress={handleNotificationPress}
          />

          <NotificationsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </UserHomeLayout>

        <BottomNavigation activeTab="notification" />
      </YStack>
    </>
  );
}
