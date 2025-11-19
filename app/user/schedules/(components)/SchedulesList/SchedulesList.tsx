import React from 'react';
import { YStack } from 'tamagui';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';
import type { Schedule } from '@/_schema/schedule';

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
    <YStack paddingHorizontal="$4" marginTop="$4">
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          onEdit={() => onEdit(schedule.id)}
          onDelete={() => onDelete(schedule.id)}
        />
      ))}
    </YStack>
  );
}

