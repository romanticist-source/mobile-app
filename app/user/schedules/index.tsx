import { getUserSchedules, deleteUserSchedule } from '@/api/user-schedules';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import type { UserSchedule } from '@/_schema';
import { Stack } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { AddScheduleModal } from './(components)/AddScheduleModal/AddScheduleModal';
import { NextScheduleCard } from './(components)/NextScheduleCard/NextScheduleCard';
import { SchedulesList } from './(components)/SchedulesList/SchedulesList';
import { SchedulesPageHeader } from './(components)/SchedulesPageHeader/SchedulesPageHeader';
import { SchedulesSearchBar } from './(components)/SchedulesSearchBar/SchedulesSearchBar';
import { styles } from './styles';

export default function SchedulesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [schedules, setSchedules] = useState<UserSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<UserSchedule | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserSchedules();
      // 開始時刻でソート（最新が上）
      const sortedData = data.sort(
        (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
      );
      setSchedules(sortedData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // 日付をフォーマット
  const formatDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return now.toLocaleDateString('ja-JP', options);
  };

  // 次のスケジュールを取得
  const getNextSchedule = () => {
    const now = new Date();
    const upcomingSchedules = schedules
      .filter((s) => new Date(s.startAt) > now)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

    if (upcomingSchedules.length > 0) {
      const next = upcomingSchedules[0];
      const startTime = new Date(next.startAt).toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return {
        title: next.title || next.scheduleType,
        time: startTime,
      };
    }
    return { title: '予定なし', time: '' };
  };

  const handleEdit = (scheduleId: string) => {
    const scheduleToEdit = schedules.find((s) => s.id === scheduleId);
    if (scheduleToEdit) {
      setEditingSchedule(scheduleToEdit);
      setShowAddModal(true);
    }
  };

  const handleAddNew = () => {
    setEditingSchedule(null);
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingSchedule(null);
  };

  const handleSaveSuccess = () => {
    fetchSchedules();
  };

  const handleDelete = async (scheduleId: string) => {
            try {
              await deleteUserSchedule(scheduleId);
              // 削除成功後、ローカルのstateも更新
              setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
            } catch (err) {
              console.error('Failed to delete schedule:', err);
              Alert.alert('エラー', 'スケジュールの削除に失敗しました');
            }
          }

  const nextSchedule = getNextSchedule();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          <AppHeader />

          <SchedulesPageHeader
            date={formatDate()}
            onAddPress={handleAddNew}
          />

          {/* Next Schedule Card */}
          <View style={styles.section}>
            <NextScheduleCard
              title={nextSchedule.title}
              time={nextSchedule.time}
            />
          </View>

          <SchedulesSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <SchedulesList
            schedules={schedules}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </UserHomeLayout>

        <BottomNavigation activeTab="schedule" />

        <AddScheduleModal
          visible={showAddModal}
          onClose={handleModalClose}
          schedule={editingSchedule}
          onSave={handleSaveSuccess}
        />
      </View>
    </>
  );
}
