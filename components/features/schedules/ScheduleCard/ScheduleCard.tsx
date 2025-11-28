import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import type { UserSchedule } from '@/_schema/schedule';
import { styles } from './styles';

interface ScheduleCardProps {
  schedule: UserSchedule;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Helper function to format ISO date string to time (HH:MM)
const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <CategoryBadge category={schedule.scheduleType} />
          <View style={styles.timeContainer}>
            <MaterialIcons name="schedule" size={14} color="#666666" />
            <Text style={styles.time}>{formatTime(schedule.startAt)}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <MaterialIcons name="edit" size={18} color="#666666" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <MaterialIcons name="delete" size={18} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.title}>{schedule.title}</Text>
      {schedule.description && (
        <Text style={styles.description}>{schedule.description}</Text>
      )}
    </View>
  );
}

