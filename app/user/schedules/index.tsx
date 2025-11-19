import { mockSchedules } from '@/_api/__mock__/schedule';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { YStack } from 'tamagui';
import { AddScheduleModal } from './(components)/AddScheduleModal/AddScheduleModal';
import { NextScheduleCard } from './(components)/NextScheduleCard/NextScheduleCard';
import { SchedulesList } from './(components)/SchedulesList/SchedulesList';
import { SchedulesPageHeader } from './(components)/SchedulesPageHeader/SchedulesPageHeader';
import { SchedulesSearchBar } from './(components)/SchedulesSearchBar/SchedulesSearchBar';

export default function SchedulesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const schedules = mockSchedules;

  const handleEdit = (scheduleId: string) => {
    console.log('Edit schedule:', scheduleId);
    setShowAddModal(true);
  };

  const handleDelete = (scheduleId: string) => {
    console.log('Delete schedule:', scheduleId);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <YStack flex={1} backgroundColor="$backgroundSecondary">
        <UserHomeLayout>
          <AppHeader />

          <SchedulesPageHeader
            date="2025年11月14日金曜日"
            onAddPress={() => setShowAddModal(true)}
          />

          {/* Next Schedule Card */}
          <YStack paddingHorizontal="$4" marginTop="$4">
            <NextScheduleCard
              title="午後のリハビリテーション"
              time="14:00 - 15:00"
            />
          </YStack>

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
          onClose={() => setShowAddModal(false)}
        />
      </YStack>
    </>
  );
}
