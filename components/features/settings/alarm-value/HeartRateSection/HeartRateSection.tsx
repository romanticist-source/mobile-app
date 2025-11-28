import React from 'react';
import { View, Text } from 'react-native';
import { YStack, XStack } from 'tamagui';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface HeartRateSectionProps {
  minValue: number;
  maxValue: number;
  onMinValueChange: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}

export function HeartRateSection({
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
}: HeartRateSectionProps) {
  return (
    <YStack gap="$3" style={styles.container}>
      {/* Section Header */}
      <XStack alignItems="center" gap="$2">
        <MaterialIcons name="favorite" size={20} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>心拍数</Text>
      </XStack>

      {/* Min Heart Rate */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>最小値</Text>
          <Text style={styles.sliderValue}>{minValue} bpm</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={40}
          maximumValue={120}
          step={5}
          value={minValue}
          onValueChange={onMinValueChange}
          minimumTrackTintColor="#FF6B6B"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#FF6B6B"
        />
      </View>

      {/* Max Heart Rate */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderLabel}>最大値</Text>
          <Text style={styles.sliderValue}>{maxValue} bpm</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={80}
          maximumValue={180}
          step={5}
          value={maxValue}
          onValueChange={onMaxValueChange}
          minimumTrackTintColor="#FF6B6B"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#FF6B6B"
        />
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {minValue}〜{maxValue} bpm の範囲外で通知
        </Text>
      </View>
    </YStack>
  );
}
