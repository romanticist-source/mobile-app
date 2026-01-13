import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';
import type { ComponentProps } from 'react';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

interface VitalCardProps {
  icon: MaterialIconName;
  iconColor: string;
  title: string;
  value: string | number;
  unit: string;
  subtext: string;
  backgroundColor: string;
  borderColor: string;
  isLarge?: boolean;
  progressBar?: {
    percentage: number;
    color: string;
  };
}

export function VitalCard({
  icon,
  iconColor,
  title,
  value,
  unit,
  subtext,
  backgroundColor,
  borderColor,
  isLarge = false,
  progressBar,
}: VitalCardProps) {
  return (
    <View
      style={[
        styles.vitalCard,
        isLarge && styles.vitalCardLarge,
        { backgroundColor, borderColor },
      ]}
    >
      <View style={styles.vitalCardHeader}>
        <MaterialIcons name={icon} size={isLarge ? 20 : 18} color={iconColor} />
        <Text style={styles.vitalCardTitle}>{title}</Text>
      </View>

      <View style={styles.vitalCardContent}>
        <Text style={styles.vitalCardValue}>{value}</Text>
        <Text style={styles.vitalCardUnit}>{unit}</Text>
      </View>

      {progressBar && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: progressBar.color,
                width: `${progressBar.percentage}%`,
              },
            ]}
          />
        </View>
      )}

      <Text style={styles.vitalCardSubtext}>{subtext}</Text>
    </View>
  );
}
