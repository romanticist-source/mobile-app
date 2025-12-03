import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface SchedulesPageHeaderProps {
  date: string;
  onAddPress: () => void;
}

export function SchedulesPageHeader({
  date,
  onAddPress,
}: SchedulesPageHeaderProps) {
  return (
    <View style={styles.pageHeader}>
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <MaterialIcons name="event" size={24} color="#FF6B6B" />
          <Text style={styles.pageTitle}>スケジュール管理</Text>
        </View>
        <Text style={styles.pageDate}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+ 追加</Text>
      </TouchableOpacity>
    </View>
  );
}

