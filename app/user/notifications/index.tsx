import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation';
import { NotificationCard, Notification } from './(components)/NotificationCard';

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

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => n.status === 'unread')
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.appIcon}>
                <Text style={styles.appIconText}>❤️</Text>
              </View>
              <View>
                <Text style={styles.appTitle}>みまもりケア</Text>
                <Text style={styles.appSubtitle}>あなたの健康をサポート</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.userIconContainer}>
                <Text style={styles.userIcon}>👤</Text>
              </View>
              <Text style={styles.userName}>ユーザー名</Text>
            </View>
          </View>

          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>通知</Text>
          </View>

          {/* Actions Bar */}
          <View style={styles.actionsBar}>
            <TouchableOpacity style={styles.unreadButton}>
              <Text style={styles.bellIcon}>🔔</Text>
              <Text style={styles.unreadText}>未読 {unreadCount}件</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.markAllReadButton}
              onPress={handleMarkAllRead}
            >
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.markAllReadText}>すべて既読</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterDropdownText}>すべて</Text>
              <Text style={styles.dropdownArrow}>⌄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'unread' && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(filter === 'all' ? 'unread' : 'all')}
            >
              <Text style={styles.filterIcon}>🔍</Text>
              <Text style={[
                styles.filterButtonText,
                filter === 'unread' && styles.filterButtonTextActive,
              ]}>
                未読のみ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={() => handleNotificationPress(notification)}
              />
            ))}
          </View>

          {/* Pagination */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={styles.paginationButton}
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(currentPage - 1)}
            >
              <Text style={[
                styles.paginationButtonText,
                currentPage === 1 && styles.paginationButtonDisabled,
              ]}>
                ‹ 前へ
              </Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>{currentPage} / {totalPages} ページ</Text>
            <TouchableOpacity
              style={styles.paginationButton}
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(currentPage + 1)}
            >
              <Text style={[
                styles.paginationButtonText,
                currentPage === totalPages && styles.paginationButtonDisabled,
              ]}>
                次へ ›
              </Text>
            </TouchableOpacity>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="notification" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  userName: {
    fontSize: 14,
    color: '#333333',
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  actionsBar: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  unreadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  bellIcon: {
    fontSize: 16,
  },
  unreadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  markAllReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  markAllReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterDropdownText: {
    fontSize: 14,
    color: '#333333',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#999999',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  notificationsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  paginationButtonDisabled: {
    color: '#CCCCCC',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666666',
  },
});
