import { HelperHeader } from '@/components/layouts/HelperHeader/HelperHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { AddScheduleModal } from '@/components/features/schedules/AddScheduleModal/AddScheduleModal';
import { NextScheduleCard } from '@/components/features/schedules/NextScheduleCard/NextScheduleCard';
import { SchedulesList } from '@/components/features/schedules/SchedulesList/SchedulesList';
import { SchedulesPageHeader } from '@/components/features/schedules/SchedulesPageHeader/SchedulesPageHeader';
import { SchedulesSearchBar } from '@/components/features/schedules/SchedulesSearchBar/SchedulesSearchBar';
import { useSchedules, useNextSchedule, useScheduleModal } from './(hooks)';
import { styles } from './styles';

export default function HelperSchedulesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // カスタムhooksを使用
  const { schedules, fetchSchedules, deleteSchedule } = useSchedules();
  const nextSchedule = useNextSchedule(schedules);
  const { showModal, editingSchedule, handleEdit, handleAddNew, handleClose } = useScheduleModal(schedules);

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

  const handleSaveSuccess = () => {
    fetchSchedules();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          <HelperHeader />

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
            onDelete={deleteSchedule}
          />
        </UserHomeLayout>

        <BottomNavigation activeTab="schedule" />

        <AddScheduleModal
          visible={showModal}
          onClose={handleClose}
          schedule={editingSchedule}
          onSave={handleSaveSuccess}
        />
      </View>
    </>
  );
}
