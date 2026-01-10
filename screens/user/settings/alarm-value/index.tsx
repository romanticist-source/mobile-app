import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormSaveButton } from '@/components/forms';
import { FatigueThresholdSection } from '@/components/features/settings/alarm-value/FatigueThresholdSection/FatigueThresholdSection';
import { useUser } from '@/contexts/UserContext';
import { getFatigueWarningThreshold, getFatigueCriticalThreshold, setFatigueWarningThreshold, setFatigueCriticalThreshold } from '@/_util/userSettingsHelper';
import { styles } from './styles';

export default function AlarmValueScreen() {
  const router = useRouter();
  const { selectedUserId } = useUser();

  // Fatigue thresholds
  const [warningThreshold, setWarningThresholdState] = useState(70);
  const [criticalThreshold, setCriticalThresholdState] = useState(80);
  const [loading, setLoading] = useState(true);

  // Load saved settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (!selectedUserId) {
        setLoading(false);
        return;
      }

      try {
        const [warning, critical] = await Promise.all([
          getFatigueWarningThreshold(),
          getFatigueCriticalThreshold(),
        ]);
        setWarningThresholdState(warning);
        setCriticalThresholdState(critical);
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

    // Validation: warning threshold should be less than critical threshold
    if (warningThreshold >= criticalThreshold) {
      Alert.alert('エラー', '警告レベルは危険レベルより低く設定してください');
      return;
    }

    try {
      await Promise.all([
        setFatigueWarningThreshold(warningThreshold),
        setFatigueCriticalThreshold(criticalThreshold),
      ]);
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
              <Text style={styles.pageTitle}>疲労度アラート閾値設定</Text>
              <Text style={styles.pageDescription}>
                疲労度が設定した閾値を超えた場合に通知します
              </Text>
            </View>

            {/* Notice */}
            <View style={styles.noticeBox}>
              <Text style={styles.noticeText}>
                アラート通知は本人と介助者の両方に送信されます
              </Text>
            </View>

            {/* Fatigue Threshold Section */}
            <FatigueThresholdSection
              warningValue={warningThreshold}
              criticalValue={criticalThreshold}
              onWarningValueChange={setWarningThresholdState}
              onCriticalValueChange={setCriticalThresholdState}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <FormSaveButton onSave={handleSave} />
      </View>
    </>
  );
}
