import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CategoryBadge, ScheduleCategory } from '../CategoryBadge/CategoryBadge';
import { styles } from './styles';

export interface Schedule {
  id: string;
  category: ScheduleCategory;
  time: string;
  title: string;
  description?: string;
}

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <CategoryBadge category={schedule.category} />
          <View style={styles.timeContainer}>
            <Text style={styles.timeIcon}>🕐</Text>
            <Text style={styles.time}>{schedule.time}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Text style={styles.actionIcon}>✏️</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Text style={styles.actionIcon}>🗑️</Text>
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

