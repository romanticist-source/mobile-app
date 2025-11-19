import React from 'react';
import { View } from 'react-native';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';
import type { Schedule } from '@/_schema/schedule';
import { styles } from './styles';

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

