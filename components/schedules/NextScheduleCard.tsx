import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NextScheduleCardProps {
  title: string;
  time: string;
}

export function NextScheduleCard({ title, time }: NextScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.calendarIcon}>📅</Text>
        <Text style={styles.headerText}>次の予定</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.clockIcon}>🕐</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  calendarIcon: {
    fontSize: 16,
  },
  headerText: {
    fontSize: 14,
    color: '#666666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clockIcon: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
    color: '#666666',
  },
});
