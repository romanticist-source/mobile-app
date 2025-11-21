import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styles } from './styles';

interface RestSchedule {
  id: string;
  title: string;
  time: string;
  duration: string;
}

interface RestRecord {
  timeRange: string;
  duration: string;
  type: 'scheduled' | 'suggested';
}

export default function RestManagementScreen() {
  const router = useRouter();

  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(true);

  const restSchedules: RestSchedule[] = [
    { id: '1', title: '午前の休憩', time: '10:30', duration: '15分間の休憩' },
    { id: '2', title: '午後の休憩', time: '14:30', duration: '30分間の休憩' },
    { id: '3', title: '夕方の休憩', time: '16:30', duration: '15分間の休憩' },
  ];

  const todayRecords: RestRecord[] = [
    { timeRange: '09:36 - 10:06', duration: '30分間', type: 'scheduled' },
    { timeRange: '07:36 - 08:06', duration: '30分間', type: 'suggested' },
  ];

  const handleEditSchedule = () => {
    console.log('Edit schedule');
    // TODO: Navigate to schedule edit screen
  };

  const handleSave = () => {
    console.log('Save rest management settings:', {
      autoSuggestEnabled,
    });
    // TODO: API call to update rest management settings
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
          <Text style={styles.headerTitle}>休憩管理</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Rest Schedule Section */}
            <View style={styles.section}>
              {/* Schedule Header with Toggle */}
              <View style={styles.scheduleHeader}>
                <View style={styles.scheduleHeaderLeft}>
                  <Text style={styles.scheduleIcon}>🕐</Text>
                  <Text style={styles.scheduleTitle}>休憩スケジュール</Text>
                </View>
                <View style={styles.scheduleHeaderRight}>
                  <Text style={styles.autoSuggestLabel}>自動提案</Text>
                  <Switch
                    value={autoSuggestEnabled}
                    onValueChange={setAutoSuggestEnabled}
                    trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                    thumbColor={autoSuggestEnabled ? '#FF6B6B' : '#F3F4F6'}
                  />
                </View>
              </View>

              {/* Schedule Cards */}
              {restSchedules.map((schedule) => (
                <View key={schedule.id} style={styles.scheduleCard}>
                  <View style={styles.scheduleCardLeft}>
                    <Text style={styles.scheduleCardTitle}>{schedule.title}</Text>
                    <Text style={styles.scheduleCardDuration}>{schedule.duration}</Text>
                  </View>
                  <Text style={styles.scheduleCardTime}>{schedule.time}</Text>
                </View>
              ))}

              {/* Edit Schedule Button */}
              <TouchableOpacity
                style={styles.editScheduleButton}
                onPress={handleEditSchedule}
              >
                <Text style={styles.editScheduleButtonText}>スケジュールを編集</Text>
              </TouchableOpacity>
            </View>

            {/* Today's Records Section */}
            <View style={styles.recordsSection}>
              <Text style={styles.recordsSectionTitle}>今日の休憩記録</Text>

              {todayRecords.map((record, index) => (
                <View key={index} style={styles.recordCard}>
                  <View style={styles.recordLeft}>
                    <Text style={styles.recordCheckIcon}>✓</Text>
                    <View style={styles.recordInfo}>
                      <Text style={styles.recordTime}>{record.timeRange}</Text>
                      <Text style={styles.recordDuration}>{record.duration}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.recordBadge,
                      record.type === 'scheduled'
                        ? styles.recordBadgeScheduled
                        : styles.recordBadgeSuggested,
                    ]}
                  >
                    <Text
                      style={[
                        styles.recordBadgeText,
                        record.type === 'scheduled'
                          ? styles.recordBadgeTextScheduled
                          : styles.recordBadgeTextSuggested,
                      ]}
                    >
                      {record.type === 'scheduled' ? '予定' : '提案'}
                    </Text>
                  </View>
                </View>
              ))}
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
