import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
          <Text style={styles.pageIcon}>📅</Text>
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

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  titleSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  pageIcon: {
    fontSize: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  pageDate: {
    fontSize: 14,
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
