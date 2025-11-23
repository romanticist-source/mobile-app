import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface NextScheduleCardProps {
  title: string;
  time: string;
}

export function NextScheduleCard({ title, time }: NextScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="event" size={18} color="#FF6B6B" />
        <Text style={styles.headerText}>次の予定</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.timeContainer}>
        <MaterialIcons name="schedule" size={14} color="#666666" />
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
