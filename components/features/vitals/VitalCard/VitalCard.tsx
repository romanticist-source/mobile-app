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
  lastUpdated?: Date | null;
}

/**
 * 最終更新時間を「○分前」形式でフォーマット
 */
function formatLastUpdated(date: Date | null | undefined): string {
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return '今';
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}時間前`;
  return `${Math.floor(diffMins / 1440)}日前`;
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
  lastUpdated,
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
        <View style={styles.vitalCardTitleRow}>
          <MaterialIcons name={icon} size={isLarge ? 20 : 18} color={iconColor} />
          <Text style={styles.vitalCardTitle}>{title}</Text>
        </View>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>{formatLastUpdated(lastUpdated)}</Text>
        )}
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
