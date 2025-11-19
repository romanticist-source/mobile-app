import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

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
