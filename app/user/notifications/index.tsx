import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Notification } from './(components)/NotificationCard/NotificationCard';
import { NotificationsActionsBar } from './(components)/NotificationsActionsBar/NotificationsActionsBar';
import { NotificationsFilters } from './(components)/NotificationsFilters/NotificationsFilters';
import { NotificationsList } from './(components)/NotificationsList/NotificationsList';
import { NotificationsPagination } from './(components)/NotificationsPagination/NotificationsPagination';
import { styles } from './styles';

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: '心拍数異常',
      source: 'Apple Watch',
      timeAgo: '5分前',
      priority: 'high',
      status: 'unread',
      icon: '❤️',
      badge: '要対応',
    },
    {
      id: '2',
      title: '疲労度警告',
      source: 'ヘルスモニター',
      timeAgo: '12分前',
      priority: 'medium',
      status: 'unread',
      icon: '❤️',
    },
    {
      id: '3',
      title: '休憩時間です',
      source: '休憩スケジューラー',
      timeAgo: '16分前',
      priority: 'low',
      status: 'unread',
      icon: '🕐',
    },
    {
      id: '4',
      title: '活動量過多',
      source: 'アクティビティトラッカー',
      timeAgo: '25分前',
      priority: 'medium',
      status: 'unread',
      icon: '⚡',
    },
    {
      id: '5',
      title: 'トイレリマインダー',
      source: 'スケジュール',
      timeAgo: '35分前',
      priority: 'low',
      status: 'read',
      icon: '🕐',
    },
  ];

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
      </View>
    </>
  );
}
