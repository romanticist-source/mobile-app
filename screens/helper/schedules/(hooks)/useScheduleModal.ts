import { useState, useCallback } from 'react';
import type { UserSchedule } from '@/_schema';

interface UseScheduleModalReturn {
  showModal: boolean;
  editingSchedule: UserSchedule | null;
  handleEdit: (scheduleId: string) => void;
  handleAddNew: () => void;
  handleClose: () => void;
}

export function useScheduleModal(schedules: UserSchedule[]): UseScheduleModalReturn {
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<UserSchedule | null>(null);

  const handleEdit = useCallback((scheduleId: string) => {
    const scheduleToEdit = schedules.find((s) => s.id === scheduleId);
    if (scheduleToEdit) {
      setEditingSchedule(scheduleToEdit);
      setShowModal(true);
    }
  }, [schedules]);

  const handleAddNew = useCallback(() => {
    setEditingSchedule(null);
    setShowModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setEditingSchedule(null);
  }, []);

  return {
    showModal,
    editingSchedule,
    handleEdit,
    handleAddNew,
    handleClose,
  };
}
