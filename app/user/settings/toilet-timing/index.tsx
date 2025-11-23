import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

interface ToiletRecord {
  time: string;
  type: 'scheduled' | 'manual';
}

export default function ToiletTimingScreen() {
  const router = useRouter();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [intervalHours, setIntervalHours] = useState(4);

  const todayRecords: ToiletRecord[] = [
    { time: '08:00', type: 'scheduled' },
    { time: '12:00', type: 'scheduled' },
    { time: '16:00', type: 'manual' },
  ];

  const handleSave = () => {
    console.log('Save toilet timing settings:', {
      notificationEnabled,
      intervalHours,
    });
    // TODO: API call to update toilet timing settings
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>トイレタイミング</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Notification Settings Section */}
            <View style={styles.section}>
              {/* Notification Toggle */}
              <View style={styles.notificationRow}>
                <View style={styles.notificationInfo}>
                  <MaterialIcons name="alarm" size={20} color="#FF6B6B" />
                  <Text style={styles.notificationLabel}>トイレタイミング通知</Text>
                </View>
                <Switch
                  value={notificationEnabled}
                  onValueChange={setNotificationEnabled}
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
                  onValueChange={setIntervalHours}
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

              {/* Today's Records */}
              <View style={styles.recordsSection}>
                <Text style={styles.recordsTitle}>今日の記録</Text>

                {todayRecords.map((record, index) => (
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
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonIcon}>💾</Text>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
