import React from 'react';
import { View, Text } from 'react-native';
import { YStack, XStack } from 'tamagui';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface FatigueThresholdSectionProps {
  warningValue: number;
  criticalValue: number;
  onWarningValueChange: (value: number) => void;
  onCriticalValueChange: (value: number) => void;
}

export function FatigueThresholdSection({
  warningValue,
  criticalValue,
  onWarningValueChange,
  onCriticalValueChange,
}: FatigueThresholdSectionProps) {
  return (
    <YStack gap="$3" style={styles.container}>
      {/* Section Header */}
      <XStack alignItems="center" gap="$2">
        <MaterialIcons name="show-chart" size={20} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>疲労度</Text>
      </XStack>

      {/* Warning Threshold */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <View style={styles.labelContainer}>
            <Text style={styles.sliderLabel}>警告レベル</Text>
            <View style={styles.warningBadge}>
              <Text style={styles.badgeText}>注意</Text>
            </View>
          </View>
          <Text style={styles.sliderValueWarning}>{warningValue}%</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={90}
          step={5}
          value={warningValue}
          onValueChange={onWarningValueChange}
          minimumTrackTintColor="#FFA726"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#FFA726"
        />
        <Text style={styles.sliderDescription}>
          疲労度が {warningValue}% を超えると警告通知が送信されます
        </Text>
      </View>

      {/* Critical Threshold */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <View style={styles.labelContainer}>
            <Text style={styles.sliderLabel}>危険レベル</Text>
            <View style={styles.criticalBadge}>
              <Text style={styles.badgeText}>危険</Text>
            </View>
          </View>
          <Text style={styles.sliderValueCritical}>{criticalValue}%</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={60}
          maximumValue={95}
          step={5}
          value={criticalValue}
          onValueChange={onCriticalValueChange}
          minimumTrackTintColor="#EF5350"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#EF5350"
        />
        <Text style={styles.sliderDescription}>
          疲労度が {criticalValue}% を超えると緊急通知が送信されます
        </Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          現在の設定: {warningValue}% で警告、{criticalValue}% で危険通知
        </Text>
        <Text style={styles.descriptionSubText}>
          ※ 警告レベルは危険レベルより低く設定してください
        </Text>
      </View>
    </YStack>
  );
}
