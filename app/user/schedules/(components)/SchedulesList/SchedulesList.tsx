import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import type { UserSchedule } from '@/_schema/schedule';
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
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(schedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = schedules.slice(startIndex, endIndex);

  // Reset to page 1 when schedules change
  useEffect(() => {
    setCurrentPage(1);
  }, [schedules.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={schedules.length}
      />
    </View>
  );
}

