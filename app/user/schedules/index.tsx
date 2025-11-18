import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation';
import { AppHeader } from '@/components/layouts/AppHeader';
import { Schedule } from './(components)/ScheduleCard';
import { NextScheduleCard } from './(components)/NextScheduleCard';
import { SchedulesPageHeader } from './(components)/SchedulesPageHeader';
import { SchedulesSearchBar } from './(components)/SchedulesSearchBar';
import { SchedulesList } from './(components)/SchedulesList';
import { AddScheduleModal } from './(components)/AddScheduleModal';

export default function SchedulesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data
  const schedules: Schedule[] = [
    {
      id: '1',
      category: '予定',
      time: '10:00',
      title: '通院',
      description: '定期検診',
    },
    {
      id: '2',
      category: '休息',
      time: '14:00',
      title: '休息タイム',
      description: '30分の休憩',
    },
    {
      id: '3',
      category: 'トイレ',
      time: '16:00',
      title: 'トイレタイミング',
    },
  ];

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
      <View style={styles.container}>
        <UserHomeLayout>
          <AppHeader />

          <SchedulesPageHeader
            date="2025年11月14日金曜日"
            onAddPress={() => setShowAddModal(true)}
          />

          {/* Next Schedule Card */}
          <View style={styles.section}>
            <NextScheduleCard
              title="午後のリハビリテーション"
              time="14:00 - 15:00"
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
          onClose={() => setShowAddModal(false)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
