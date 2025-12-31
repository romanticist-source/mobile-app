import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormSaveButton } from '@/components/forms';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { ToiletNotificationSettings } from '@/components/features/settings/toilet-timing/ToiletNotificationSettings/ToiletNotificationSettings';
import { ToiletRecordsList } from '@/components/features/settings/toilet-timing/ToiletRecordsList/ToiletRecordsList';
import { useUser } from '@/contexts/UserContext';
import { createToiletNotification } from '@/_util/notificationHelper';
import { styles } from './styles';

const TOILET_TIMING_STORAGE_KEY = '@toilet_timing_settings';

interface ToiletRecord {
  time: string;
  type: 'scheduled' | 'manual';
}

export default function ToiletTimingScreen() {
  const router = useRouter();
  const { selectedUserId } = useUser();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [intervalHours, setIntervalHours] = useState(4);
  const [loading, setLoading] = useState(true);

  const todayRecords: ToiletRecord[] = [
    { time: '08:00', type: 'scheduled' },
    { time: '12:00', type: 'scheduled' },
    { time: '16:00', type: 'manual' },
  ];

  // Load saved settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (!selectedUserId) {
        setLoading(false);
        return;
      }

      try {
        const storageKey = `${TOILET_TIMING_STORAGE_KEY}_${selectedUserId}`;
        const savedSettings = await AsyncStorage.getItem(storageKey);
        if (savedSettings) {
          const { notificationEnabled: savedEnabled, intervalHours: savedInterval } = JSON.parse(savedSettings);
          setNotificationEnabled(savedEnabled);
          setIntervalHours(savedInterval);
        }
      } catch (error) {
        console.error('Failed to load toilet timing settings:', error);
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
      const settings = { notificationEnabled, intervalHours };
      const storageKey = `${TOILET_TIMING_STORAGE_KEY}_${selectedUserId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(settings));
      Alert.alert('成功', 'トイレタイミング設定を保存しました');
      router.back();
    } catch (error) {
      console.error('Failed to save toilet timing settings:', error);
      Alert.alert('エラー', '設定の保存に失敗しました');
    }
  };

  // Test notification function
  const handleTestNotification = async () => {
    if (!selectedUserId) {
      Alert.alert('エラー', 'ユーザーIDが見つかりません');
      return;
    }

    try {
      await createToiletNotification(selectedUserId);
      Alert.alert('成功', 'テスト通知を作成しました。通知ページをご確認ください。');
    } catch (error) {
      console.error('Failed to create test notification:', error);
      Alert.alert('エラー', 'テスト通知の作成に失敗しました');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="トイレタイミング" />

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Notification Settings Section */}
            <ToiletNotificationSettings
              notificationEnabled={notificationEnabled}
              intervalHours={intervalHours}
              onNotificationToggle={setNotificationEnabled}
              onIntervalChange={setIntervalHours}
            />

            {/* Today's Records */}
            <ToiletRecordsList records={todayRecords} />

            {/* Test Notification Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F5F5F5',
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
                alignItems: 'center',
              }}
              onPress={handleTestNotification}
            >
              <Text style={{ color: '#FF6B6B', fontSize: 14, fontWeight: '600' }}>
                テスト通知を送信
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Save Button */}
        <FormSaveButton onSave={handleSave} />
      </View>
    </>
  );
}
