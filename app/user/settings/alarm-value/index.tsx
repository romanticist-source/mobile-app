import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormSaveButton } from '@/components/forms';
import { HeartRateSection } from './(components)/HeartRateSection/HeartRateSection';
import { styles } from './styles';

export default function AlarmValueScreen() {
  const router = useRouter();

  // Heart rate thresholds
  const [minHeartRate, setMinHeartRate] = useState(60);
  const [maxHeartRate, setMaxHeartRate] = useState(100);

  const handleSave = () => {
    console.log('Save alarm value settings:', {
      minHeartRate,
      maxHeartRate,
    });
    // TODO: API call to update alarm value settings
    router.back();
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
