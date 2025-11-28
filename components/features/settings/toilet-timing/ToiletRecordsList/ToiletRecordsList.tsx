import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface ToiletRecord {
  time: string;
  type: 'scheduled' | 'manual';
}

interface ToiletRecordsListProps {
  records: ToiletRecord[];
}

export function ToiletRecordsList({ records }: ToiletRecordsListProps) {
  return (
    <View style={styles.recordsSection}>
      <Text style={styles.recordsTitle}>今日の記録</Text>

      {records.map((record, index) => (
        <View key={index} style={styles.recordItem}>
          <View style={styles.recordLeft}>
            <Text style={styles.recordCheckIcon}>✓</Text>
            <Text style={styles.recordTime}>{record.time}</Text>
          </View>
          <View
            style={[
              styles.recordBadge,
              record.type === 'scheduled'
                ? styles.recordBadgeScheduled
                : styles.recordBadgeManual,
            ]}
          >
            <Text
              style={[
                styles.recordBadgeText,
                record.type === 'scheduled'
                  ? styles.recordBadgeTextScheduled
                  : styles.recordBadgeTextManual,
              ]}
            >
              {record.type === 'scheduled' ? '予定' : '手動'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
