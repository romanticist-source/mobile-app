import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styles } from './styles';

interface PrivacySettings {
  shareLocationWithCaregivers: boolean;
  shareHealthWithCaregivers: boolean;
  shareActivityWithCaregivers: boolean;
  publicProfile: boolean;
  improveService: boolean;
  shareWithThirdParty: boolean;
  saveLocationHistory: boolean;
  saveLongTermHealthData: boolean;
}

export default function PrivacySettingsScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState<PrivacySettings>({
    shareLocationWithCaregivers: true,
    shareHealthWithCaregivers: true,
    shareActivityWithCaregivers: false,
    publicProfile: false,
    improveService: true,
    shareWithThirdParty: false,
    saveLocationHistory: true,
    saveLongTermHealthData: true,
  });

  const handleToggle = (key: keyof PrivacySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExportData = () => {
    console.log('Export data');
    // TODO: Implement data export functionality
  };

  const handleDeleteData = () => {
    console.log('Delete data');
    // TODO: Implement data deletion with confirmation
  };

  const handleSave = () => {
    console.log('Save privacy settings:', settings);
    // TODO: API call to update privacy settings
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
          <Text style={styles.headerTitle}>プライバシー設定</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Privacy Protection Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>🔒</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>プライバシー保護</Text>
                <Text style={styles.infoText}>
                  あなたの個人情報とヘルスデータは厳重に保護されています。共有範囲を自由に設定できます。
                </Text>
              </View>
            </View>

            {/* Sharing with Caregivers Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>👥</Text>
                <Text style={styles.sectionTitle}>介助者との共有</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>位置情報を共有</Text>
                  <Text style={styles.settingDescription}>
                    登録された介助者にリアルタイムの位置情報を共有
                  </Text>
                </View>
                <Switch
                  value={settings.shareLocationWithCaregivers}
                  onValueChange={() => handleToggle('shareLocationWithCaregivers')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.shareLocationWithCaregivers ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>健康情報を共有</Text>
                  <Text style={styles.settingDescription}>
                    バイタルデータや健康状態を介助者と共有
                  </Text>
                </View>
                <Switch
                  value={settings.shareHealthWithCaregivers}
                  onValueChange={() => handleToggle('shareHealthWithCaregivers')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.shareHealthWithCaregivers ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>活動データを共有</Text>
                  <Text style={styles.settingDescription}>
                    歩数や運動記録などの活動データを共有
                  </Text>
                </View>
                <Switch
                  value={settings.shareActivityWithCaregivers}
                  onValueChange={() => handleToggle('shareActivityWithCaregivers')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.shareActivityWithCaregivers ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Public Settings Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🌐</Text>
                <Text style={styles.sectionTitle}>公開設定</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>プロフィールを公開</Text>
                  <Text style={styles.settingDescription}>
                    基本情報を他のユーザーに公開（推奨: オフ）
                  </Text>
                </View>
                <Switch
                  value={settings.publicProfile}
                  onValueChange={() => handleToggle('publicProfile')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.publicProfile ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Data Usage Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>👁️</Text>
                <Text style={styles.sectionTitle}>データの利用</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>サービス改善に協力</Text>
                  <Text style={styles.settingDescription}>
                    匿名化されたデータをアプリの改善に利用
                  </Text>
                </View>
                <Switch
                  value={settings.improveService}
                  onValueChange={() => handleToggle('improveService')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.improveService ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>サードパーティとの共有</Text>
                  <Text style={styles.settingDescription}>
                    パートナー企業とデータを共有（推奨: オフ）
                  </Text>
                </View>
                <Switch
                  value={settings.shareWithThirdParty}
                  onValueChange={() => handleToggle('shareWithThirdParty')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.shareWithThirdParty ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Data Storage Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔐</Text>
                <Text style={styles.sectionTitle}>データの保存</Text>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>位置情報履歴を保存</Text>
                  <Text style={styles.settingDescription}>
                    過去の位置情報を記録（行動履歴の確認に使用）
                  </Text>
                </View>
                <Switch
                  value={settings.saveLocationHistory}
                  onValueChange={() => handleToggle('saveLocationHistory')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.saveLocationHistory ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>健康データを長期保存</Text>
                  <Text style={styles.settingDescription}>
                    健康データを1年以上保存（傾向分析に使用）
                  </Text>
                </View>
                <Switch
                  value={settings.saveLongTermHealthData}
                  onValueChange={() => handleToggle('saveLongTermHealthData')}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={settings.saveLongTermHealthData ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Data Management Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>データの管理</Text>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleExportData}
              >
                <Text style={styles.actionButtonIcon}>⭕</Text>
                <Text style={styles.actionButtonText}>データをエクスポート</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDeleteData}
              >
                <Text style={styles.deleteButtonIcon}>🚫</Text>
                <Text style={styles.deleteButtonText}>データを削除</Text>
              </TouchableOpacity>

              {/* Warning Box */}
              <View style={styles.warningBox}>
                <Text style={styles.warningIcon}>⚠️</Text>
                <Text style={styles.warningText}>
                  データ削除は取り消せません。削除を実行する前に、必要なデータはエクスポートしてください。
                </Text>
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
