import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styles } from './styles';

interface NotificationSettings {
  // 通知全般
  pushNotifications: boolean;
  inAppNotifications: boolean;
  vibration: boolean;
  doNotDisturb: boolean;

  // 健康モニタリング
  heartRateAlert: boolean;
  breathingAlert: boolean;
  bloodPressureReminder: boolean;
  sleepData: boolean;

  // 活動トラッキング
  dailyGoals: boolean;
  stepCount: boolean;
  motionlessAlert: boolean;

  // スケジュール
  medicationReminder: boolean;
  toiletReminder: boolean;
  restReminder: boolean;
  hydrationReminder: boolean;

  // 位置情報
  locationPermission: boolean;
  safetyArea: boolean;

  // デバイス
  batteryWarning: boolean;
  connectivityAlert: boolean;
}

export default function NotificationSettingsScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    inAppNotifications: true,
    vibration: true,
    doNotDisturb: false,
    heartRateAlert: true,
    breathingAlert: false,
    bloodPressureReminder: false,
    sleepData: true,
    dailyGoals: true,
    stepCount: false,
    motionlessAlert: true,
    medicationReminder: true,
    toiletReminder: true,
    restReminder: true,
    hydrationReminder: false,
    locationPermission: true,
    safetyArea: true,
    batteryWarning: true,
    connectivityAlert: true,
  });

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log('Save notification settings:', settings);
    // TODO: API call to update notification settings
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
          <Text style={styles.headerTitle}>通知設定</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* 通知全般 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔔</Text>
                <Text style={styles.sectionTitle}>通知全般</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>プッシュ通知</Text>
                  <Text style={styles.settingDescription}>
                    アプリ外での通知を受け取る
                  </Text>
                </View>
                <Switch
                  value={settings.pushNotifications}
                  onValueChange={() => toggleSetting('pushNotifications')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.pushNotifications ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>通知音</Text>
                  <Text style={styles.settingDescription}>通知時に音を鳴らす</Text>
                </View>
                <Switch
                  value={settings.inAppNotifications}
                  onValueChange={() => toggleSetting('inAppNotifications')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.inAppNotifications ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>バイブレーション</Text>
                  <Text style={styles.settingDescription}>通知時に振動する</Text>
                </View>
                <Switch
                  value={settings.vibration}
                  onValueChange={() => toggleSetting('vibration')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.vibration ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>おやすみモード</Text>
                  <Text style={styles.settingDescription}>
                    指定時間は緊急通知のみ受け取る
                  </Text>
                </View>
                <Switch
                  value={settings.doNotDisturb}
                  onValueChange={() => toggleSetting('doNotDisturb')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.doNotDisturb ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* 健康モニタリング */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>❤️</Text>
                <Text style={styles.sectionTitle}>健康モニタリング</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>心拍異常</Text>
                  <Text style={styles.settingDescription}>
                    異常値を検出した際に通知
                  </Text>
                </View>
                <Switch
                  value={settings.heartRateAlert}
                  onValueChange={() => toggleSetting('heartRateAlert')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.heartRateAlert ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>呼吸障害</Text>
                  <Text style={styles.settingDescription}>
                    呼吸が浅い/低い時に通知に通知
                  </Text>
                </View>
                <Switch
                  value={settings.breathingAlert}
                  onValueChange={() => toggleSetting('breathingAlert')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.breathingAlert ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>血圧測りマインダー</Text>
                  <Text style={styles.settingDescription}>
                    定期的な血圧測定を促す通知
                  </Text>
                </View>
                <Switch
                  value={settings.bloodPressureReminder}
                  onValueChange={() => toggleSetting('bloodPressureReminder')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.bloodPressureReminder ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>睡眠データ</Text>
                  <Text style={styles.settingDescription}>
                    睡眠の質や時間に関する通知
                  </Text>
                </View>
                <Switch
                  value={settings.sleepData}
                  onValueChange={() => toggleSetting('sleepData')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.sleepData ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* 活動トラッキング */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>⚡</Text>
                <Text style={styles.sectionTitle}>活動トラッキング</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>運動目標</Text>
                  <Text style={styles.settingDescription}>
                    運動目標の達成状況を通知
                  </Text>
                </View>
                <Switch
                  value={settings.dailyGoals}
                  onValueChange={() => toggleSetting('dailyGoals')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.dailyGoals ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>歩数カウント</Text>
                  <Text style={styles.settingDescription}>
                    歩数目標達成状況を通知
                  </Text>
                </View>
                <Switch
                  value={settings.stepCount}
                  onValueChange={() => toggleSetting('stepCount')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.stepCount ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>座りすぎ警告</Text>
                  <Text style={styles.settingDescription}>
                    長時間動いている場合に通知
                  </Text>
                </View>
                <Switch
                  value={settings.motionlessAlert}
                  onValueChange={() => toggleSetting('motionlessAlert')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.motionlessAlert ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* スケジュール */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📅</Text>
                <Text style={styles.sectionTitle}>スケジュール</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>服薬リマインダー</Text>
                  <Text style={styles.settingDescription}>
                    服薬時間になったら通知
                  </Text>
                </View>
                <Switch
                  value={settings.medicationReminder}
                  onValueChange={() => toggleSetting('medicationReminder')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.medicationReminder ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>トイレリマインダー</Text>
                  <Text style={styles.settingDescription}>
                    一定時間ごとに通知
                  </Text>
                </View>
                <Switch
                  value={settings.toiletReminder}
                  onValueChange={() => toggleSetting('toiletReminder')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.toiletReminder ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>休憩リマインダー</Text>
                  <Text style={styles.settingDescription}>
                    休憩時間になったら通知
                  </Text>
                </View>
                <Switch
                  value={settings.restReminder}
                  onValueChange={() => toggleSetting('restReminder')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.restReminder ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>水分補給</Text>
                  <Text style={styles.settingDescription}>
                    定期的な水分補給を促す通知
                  </Text>
                </View>
                <Switch
                  value={settings.hydrationReminder}
                  onValueChange={() => toggleSetting('hydrationReminder')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.hydrationReminder ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* 位置情報 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📍</Text>
                <Text style={styles.sectionTitle}>位置情報</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>位置情報許可</Text>
                  <Text style={styles.settingDescription}>
                    位置情報の取得を許可
                  </Text>
                </View>
                <Switch
                  value={settings.locationPermission}
                  onValueChange={() => toggleSetting('locationPermission')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.locationPermission ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>安全エリア</Text>
                  <Text style={styles.settingDescription}>
                    安全エリアの出入りを通知
                  </Text>
                </View>
                <Switch
                  value={settings.safetyArea}
                  onValueChange={() => toggleSetting('safetyArea')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.safetyArea ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* デバイス */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📱</Text>
                <Text style={styles.sectionTitle}>デバイス</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>バッテリー残量</Text>
                  <Text style={styles.settingDescription}>
                    デバイスのバッテリーが少ない場合に通知
                  </Text>
                </View>
                <Switch
                  value={settings.batteryWarning}
                  onValueChange={() => toggleSetting('batteryWarning')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.batteryWarning ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>接続状態</Text>
                  <Text style={styles.settingDescription}>
                    デバイスの接続が切れた場合に通知
                  </Text>
                </View>
                <Switch
                  value={settings.connectivityAlert}
                  onValueChange={() => toggleSetting('connectivityAlert')}
                  trackColor={{ false: '#E0E0E0', true: '#FFB4B4' }}
                  thumbColor={settings.connectivityAlert ? '#FF6B6B' : '#FFFFFF'}
                />
              </View>
            </View>

            {/* 注意事項 */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>⚠️</Text>
              <Text style={styles.infoText}>
                緊急通知について{'\n'}
                心拍異常などの緊急性のある通知は、おやすみモードやおやすみモード中でも受け取れるように設定されます。
              </Text>
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
