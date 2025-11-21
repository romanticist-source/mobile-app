import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export default function SoundVibrationSettingsScreen() {
  const router = useRouter();

  const [masterVolume, setMasterVolume] = useState(70);
  const [notificationVolume, setNotificationVolume] = useState(80);
  const [alertVolume, setAlertVolume] = useState(100);
  const [notificationSoundEnabled, setNotificationSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [vibrationStrength, setVibrationStrength] = useState(70);
  const [customVibrationPattern, setCustomVibrationPattern] = useState(false);

  const handlePlaySound = (type: 'notification' | 'alert') => {
    console.log('Play sound:', type);
    // TODO: Play sound preview
  };

  const handlePlayVibration = () => {
    console.log('Play vibration');
    // TODO: Play vibration preview
  };

  const handleSave = () => {
    console.log('Save sound and vibration settings:', {
      masterVolume,
      notificationVolume,
      alertVolume,
      notificationSoundEnabled,
      vibrationEnabled,
      vibrationStrength,
      customVibrationPattern,
    });
    // TODO: API call to update settings
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
          <Text style={styles.headerTitle}>音と振動設定</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Sound Settings Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔊</Text>
                <Text style={styles.sectionTitle}>音量設定</Text>
              </View>

              {/* Master Volume */}
              <View style={styles.volumeControl}>
                <Text style={styles.volumeLabel}>マスター音量</Text>
                <Text style={styles.volumeValue}>{masterVolume}%</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={masterVolume}
                onValueChange={setMasterVolume}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#FF6B6B"
              />

              {/* Notification Volume */}
              <View style={styles.volumeControl}>
                <Text style={styles.volumeLabel}>通知音量</Text>
                <View style={styles.volumeRight}>
                  <Text style={styles.volumeValue}>{notificationVolume}%</Text>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => handlePlaySound('notification')}
                  >
                    <Text style={styles.playIcon}>▶️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={notificationVolume}
                onValueChange={setNotificationVolume}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#FF6B6B"
              />

              {/* Alert Volume */}
              <View style={styles.volumeControl}>
                <Text style={styles.volumeLabel}>緊急アラート音量</Text>
                <View style={styles.volumeRight}>
                  <Text style={styles.volumeValue}>{alertVolume}%</Text>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => handlePlaySound('alert')}
                  >
                    <Text style={styles.playIcon}>▶️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={alertVolume}
                onValueChange={setAlertVolume}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#FF6B6B"
              />

              <Text style={styles.description}>
                緊急アラートは常に最大音量で再生することを推奨します
              </Text>

              {/* Notification Sound Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>通知音を有効化</Text>
                  <Text style={styles.toggleDescription}>
                    オフの場合、緊急アラートのみ音が鳴ります
                  </Text>
                </View>
                <Switch
                  value={notificationSoundEnabled}
                  onValueChange={setNotificationSoundEnabled}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={notificationSoundEnabled ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Notification Sounds Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔔</Text>
                <Text style={styles.sectionTitle}>通知音</Text>
              </View>

              <View style={styles.selectField}>
                <Text style={styles.selectLabel}>通知音</Text>
                <TouchableOpacity style={styles.selectButton}>
                  <Text style={styles.selectPlaceholder}>選択してください</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.selectField}>
                <Text style={styles.selectLabel}>緊急アラート音</Text>
                <TouchableOpacity style={styles.selectButton}>
                  <Text style={styles.selectPlaceholder}>選択してください</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Vibration Settings Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📳</Text>
                <Text style={styles.sectionTitle}>振動設定</Text>
              </View>

              {/* Vibration Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>バイブレーションを有効化</Text>
                  <Text style={styles.toggleDescription}>
                    通知時にデバイスを振動させます
                  </Text>
                </View>
                <Switch
                  value={vibrationEnabled}
                  onValueChange={setVibrationEnabled}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={vibrationEnabled ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              {/* Vibration Strength */}
              <View style={styles.volumeControl}>
                <Text style={styles.volumeLabel}>振動の強さ</Text>
                <View style={styles.volumeRight}>
                  <Text style={styles.volumeValue}>{vibrationStrength}%</Text>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={handlePlayVibration}
                  >
                    <Text style={styles.playIcon}>▶️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={10}
                value={vibrationStrength}
                onValueChange={setVibrationStrength}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#FF6B6B"
              />

              {/* Custom Vibration Pattern Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>カスタム振動パターン</Text>
                  <Text style={styles.toggleDescription}>
                    通知の種類ごとに異なる振動パターンを使用
                  </Text>
                </View>
                <Switch
                  value={customVibrationPattern}
                  onValueChange={setCustomVibrationPattern}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={customVibrationPattern ? '#FF6B6B' : '#F3F4F6'}
                />
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
