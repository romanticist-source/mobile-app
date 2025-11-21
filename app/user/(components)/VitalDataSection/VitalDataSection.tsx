import React from 'react';
import { View, Text, DimensionValue } from 'react-native';
import { styles } from './styles';

interface VitalData {
  icon: string;
  label: string;
  value: string;
  unit: string;
  barColor: string;
  barFillColor: string;
  fillPercentage: string;
  status: string;
}

interface VitalDataSectionProps {
  title: string;
  vitals: VitalData[];
}

export function VitalDataSection({ title, vitals }: VitalDataSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.vitalGrid}>
        {vitals.map((vital, index) => (
          <View key={index} style={styles.vitalCard}>
            <View style={styles.vitalHeader}>
              <Text style={styles.vitalIcon}>{vital.icon}</Text>
              <Text style={styles.vitalLabel}>{vital.label}</Text>
            </View>
            <Text style={styles.vitalValue}>
              {vital.value} <Text style={styles.vitalUnit}>{vital.unit}</Text>
            </Text>
            <View style={[styles.vitalBar, { backgroundColor: vital.barColor }]}>
              <View
                style={[
                  styles.vitalBarFill,
                  { width: vital.fillPercentage as DimensionValue, backgroundColor: vital.barFillColor },
                ]}
              />
            </View>
            <Text style={styles.vitalStatus}>{vital.status}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
