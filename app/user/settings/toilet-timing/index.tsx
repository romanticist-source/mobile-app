import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FormSaveButton } from '@/components/forms';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { ToiletNotificationSettings } from './(components)/ToiletNotificationSettings/ToiletNotificationSettings';
import { ToiletRecordsList } from './(components)/ToiletRecordsList/ToiletRecordsList';
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
          </View>
        </ScrollView>

        {/* Save Button */}
        <FormSaveButton onSave={handleSave} />
      </View>
    </>
  );
}
