import React from 'react';
import { View } from 'react-native';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import type { UserSchedule } from '@/_schema/schedule';
import { usePagination } from '@/hooks/usePagination';
import { styles } from './styles';

interface SchedulesListProps {
  schedules: UserSchedule[];
  onEdit: (scheduleId: string) => void;
  onDelete: (scheduleId: string) => void;
  itemsPerPage?: number;
}

export function SchedulesList({
  schedules,
  onEdit,
  onDelete,
  itemsPerPage = 5,
}: SchedulesListProps) {
  const {
    currentPage,
    totalPages,
    currentItems: currentSchedules,
    setCurrentPage,
    totalItems,
  } = usePagination(schedules, { itemsPerPage });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {currentSchedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onEdit={() => onEdit(schedule.id)}
            onDelete={() => onDelete(schedule.id)}
          />
        ))}
      </View>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </View>
  );
}

