import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CategoryBadge } from './CategoryBadge';
import type { Schedule } from '@/_schema/schedule';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeIcon: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
    color: '#666666',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});
