import type { AlertHistory } from '@/_schema/alert';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { MOCK_USER_ID } from '@/constants/mockUser';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { NotificationsActionsBar } from './(components)/NotificationsActionsBar/NotificationsActionsBar';
import { NotificationsFilters } from './(components)/NotificationsFilters/NotificationsFilters';
import { NotificationsList } from './(components)/NotificationsList/NotificationsList';
import { useNotifications } from './(hooks)/useNotifications';
import { styles } from './styles';

export default function NotificationsScreen() {
  const userId = MOCK_USER_ID;

  const {
    filteredNotifications,
    isLoading,
    error,
    alertTypeFilter,
    readFilter,
    setAlertTypeFilter,
    setReadFilter,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications({
    userId,
  });

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const handleNotificationPress = async (notification: AlertHistory) => {
    await markAsRead(notification.id);
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
            alertTypeFilter={alertTypeFilter}
            readFilter={readFilter}
            onAlertTypeFilterChange={setAlertTypeFilter}
            onReadFilterChange={setReadFilter}
          />

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <NotificationsList
              alerts={filteredNotifications}
              onNotificationPress={handleNotificationPress}
            />
          )}
        </UserHomeLayout>

        <BottomNavigation activeTab="notification" />
      </View>
    </>
  );
}
