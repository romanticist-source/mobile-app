import React from 'react';
import { View, Text, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

interface ToiletNotificationSettingsProps {
  notificationEnabled: boolean;
  intervalHours: number;
  onNotificationToggle: (value: boolean) => void;
  onIntervalChange: (value: number) => void;
}

export function ToiletNotificationSettings({
  notificationEnabled,
  intervalHours,
  onNotificationToggle,
  onIntervalChange,
}: ToiletNotificationSettingsProps) {
  return (
    <View style={styles.section}>
      {/* Notification Toggle */}
      <View style={styles.notificationRow}>
        <View style={styles.notificationInfo}>
          <MaterialIcons name="alarm" size={20} color="#FF6B6B" />
          <Text style={styles.notificationLabel}>トイレタイミング通知</Text>
        </View>
        <Switch
          value={notificationEnabled}
          onValueChange={onNotificationToggle}
          trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
          thumbColor={notificationEnabled ? '#FF6B6B' : '#F3F4F6'}
        />
      </View>

      {/* Interval Slider */}
      <View style={styles.intervalContainer}>
        <View style={styles.intervalHeader}>
          <Text style={styles.intervalLabel}>通知間隔</Text>
          <Text style={styles.intervalValue}>{intervalHours}時間</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={2}
          maximumValue={8}
          step={1}
          value={intervalHours}
          onValueChange={onIntervalChange}
          minimumTrackTintColor="#FF6B6B"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#FF6B6B"
        />

        <View style={styles.intervalRange}>
          <Text style={styles.intervalRangeText}>2時間</Text>
          <Text style={styles.intervalRangeText}>8時間</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          下半身が動かない方向けの定時通知機能です。スケジュールに応じて自動的に微調整されます。
        </Text>
      </View>
    </View>
  );
}
