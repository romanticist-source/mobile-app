import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScheduleCard, Schedule } from './ScheduleCard';

interface SchedulesListProps {
  schedules: Schedule[];
  onEdit: (scheduleId: string) => void;
  onDelete: (scheduleId: string) => void;
}

export function SchedulesList({
  schedules,
  onEdit,
  onDelete,
}: SchedulesListProps) {
  return (
    <View style={styles.section}>
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          onEdit={() => onEdit(schedule.id)}
          onDelete={() => onDelete(schedule.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
