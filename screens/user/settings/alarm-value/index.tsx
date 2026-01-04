import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormSaveButton } from '@/components/forms';
import { HeartRateSection } from '@/components/features/settings/alarm-value/HeartRateSection/HeartRateSection';
import { useUser } from '@/contexts/UserContext';
import { styles } from './styles';

const ALARM_VALUE_STORAGE_KEY = '@alarm_value_settings';

export default function AlarmValueScreen() {
  const router = useRouter();
  const { selectedUserId } = useUser();

  // Heart rate thresholds
  const [minHeartRate, setMinHeartRate] = useState(60);
  const [maxHeartRate, setMaxHeartRate] = useState(100);
  const [loading, setLoading] = useState(true);

  // Load saved settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (!selectedUserId) {
        setLoading(false);
        return;
      }

      try {
        const storageKey = `${ALARM_VALUE_STORAGE_KEY}_${selectedUserId}`;
        const savedSettings = await AsyncStorage.getItem(storageKey);
        if (savedSettings) {
          const { minHeartRate: savedMin, maxHeartRate: savedMax } = JSON.parse(savedSettings);
          setMinHeartRate(savedMin);
          setMaxHeartRate(savedMax);
        }
      } catch (error) {
        console.error('Failed to load alarm settings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, [selectedUserId]);

  const handleSave = async () => {
    if (!selectedUserId) {
      Alert.alert('エラー', 'ユーザーIDが見つかりません');
      return;
    }

    try {
      const settings = { minHeartRate, maxHeartRate };
      const storageKey = `${ALARM_VALUE_STORAGE_KEY}_${selectedUserId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(settings));
      Alert.alert('成功', 'アラート閾値を保存しました');
      router.back();
    } catch (error) {
      console.error('Failed to save alarm settings:', error);
      Alert.alert('エラー', '設定の保存に失敗しました');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>アラート閾値</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Page Header */}
            <View style={styles.pageHeader}>
              <View style={styles.headerIcon}>
                <MaterialIcons name="notifications-active" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.pageTitle}>アラート閾値設定</Text>
              <Text style={styles.pageDescription}>
                バイタルデータが設定した閾値を超えた場合に通知します
              </Text>
            </View>

            {/* Notice */}
            <View style={styles.noticeBox}>
              <Text style={styles.noticeText}>
                アラート通知は本人と介助者の両方に送信されます
              </Text>
            </View>

            {/* Heart Rate Section */}
            <HeartRateSection
              minValue={minHeartRate}
              maxValue={maxHeartRate}
              onMinValueChange={setMinHeartRate}
              onMaxValueChange={setMaxHeartRate}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <FormSaveButton onSave={handleSave} />
      </View>
    </>
  );
}
