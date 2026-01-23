import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { USER_ROUTES } from '@/_util/navigationRoutes';
import { styles } from './styles';
import type { ComponentProps } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createFatigueAlert, createEmergencyHelpRequest, createMedicationNotification, createToiletNotification } from '@/_util/notificationHelper';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

interface SettingItem {
  id: string;
  icon: MaterialIconName;
  title: string;
  description: string;
  onPress: () => void;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');


  const handleLogout = async () => {
    await logout();
    // ログイン画面へ遷移
    router.replace("/login");
  };

  // Test notification handlers
  const handleTestFatigueAlert = async () => {
    if (!user?.id) {
      Alert.alert('エラー', 'ユーザー情報が取得できませんでした');
      return;
    }

    try {
      await createFatigueAlert(user.id, 85, 30);
      Alert.alert('成功', '疲労度アラート（危険レベル）を送信しました');
    } catch (error) {
      console.error('[Test] Failed to send fatigue alert:', error);
      Alert.alert('エラー', '疲労度アラートの送信に失敗しました');
    }
  };

  const handleTestEmergencyAlert = async () => {
    if (!user?.id || !user?.name) {
      Alert.alert('エラー', 'ユーザー情報が取得できませんでした');
      return;
    }

    try {
      await createEmergencyHelpRequest(user.id, user.name);
      Alert.alert('成功', '緊急ヘルプ要請を送信しました');
    } catch (error) {
      console.error('[Test] Failed to send emergency alert:', error);
      Alert.alert('エラー', '緊急アラートの送信に失敗しました');
    }
  };

  const handleTestMedicationAlert = async () => {
    if (!user?.id) {
      Alert.alert('エラー', 'ユーザー情報が取得できませんでした');
      return;
    }

    try {
      await createMedicationNotification(user.id, '血圧の薬');
      Alert.alert('成功', '服薬リマインダーを送信しました');
    } catch (error) {
      console.error('[Test] Failed to send medication alert:', error);
      Alert.alert('エラー', '服薬アラートの送信に失敗しました');
    }
  };

  const handleTestToiletAlert = async () => {
    if (!user?.id) {
      Alert.alert('エラー', 'ユーザー情報が取得できませんでした');
      return;
    }

    try {
      await createToiletNotification(user.id);
      Alert.alert('成功', 'トイレリマインダーを送信しました');
    } catch (error) {
      console.error('[Test] Failed to send toilet alert:', error);
      Alert.alert('エラー', 'トイレアラートの送信に失敗しました');
    }
  };

  const settingSections: SettingSection[] = [
    // Development/Test section - only show in development mode
    {
      title: '🧪 テスト機能（開発用）',
      items: [
        {
          id: 'test-fatigue-alert',
          icon: 'warning',
          title: '疲労度アラート通知をテスト',
          description: '危険レベル（85%）の通知を送信（表示値は変わりません）',
          onPress: handleTestFatigueAlert,
        },
        {
          id: 'test-emergency-alert',
          icon: 'emergency',
          title: '緊急ヘルプ要請をテスト',
          description: '緊急ヘルプ要請アラートを送信',
          onPress: handleTestEmergencyAlert,
        },
        {
          id: 'test-medication-alert',
          icon: 'medication',
          title: '服薬リマインダーをテスト',
          description: '服薬時間のリマインダーを送信',
          onPress: handleTestMedicationAlert,
        },
        {
          id: 'test-toilet-alert',
          icon: 'schedule',
          title: 'トイレリマインダーをテスト',
          description: 'トイレタイミングのリマインダーを送信',
          onPress: handleTestToiletAlert,
        },
      ],
    },
    {
      title: '通知とアラート',
      items: [
        {
          id: 'notifications',
          icon: 'notifications',
          title: '通知設定',
          description: '通知の種類とタイミングをカスタマイズ',
          onPress: () => router.push(USER_ROUTES.SETTINGS_NOTIFICATIONS),
        },
      ],
    },
    {
      title: 'アカウント',
      items: [
        {
          id: 'profile',
          icon: 'person',
          title: 'プロフィール設定',
          description: '名前、生年月日、連絡先など',
          onPress: () => router.push(USER_ROUTES.SETTINGS_PROFILE),
        },
        {
          id: 'health-profile',
          icon: 'favorite',
          title: '健康プロフィール',
          description: '既往歴、アレルギー、服薬情報',
          onPress: () => router.push(USER_ROUTES.SETTINGS_HEALTH_PROFILE),
        },
      ],
    },
    {
      title: '安全と共有',
      items: [
        {
          id: 'add-helper',
          icon: 'person-add',
          title: '介助者を追加',
          description: '新しい介助者にリクエストを送信',
          onPress: () => router.push(USER_ROUTES.SETTINGS_ADD_HELPER),
        },
        {
          id: 'connected-helpers',
          icon: 'people',
          title: '紐づき済み介助者',
          description: '接続済みの介助者を管理',
          onPress: () => router.push('/user/settings/connected-helpers'),
        },
        {
          id: 'caregiver',
          icon: 'group',
          title: '介助者管理',
          description: '介助者の追加・削除・権限設定',
          onPress: () => router.push(USER_ROUTES.SETTINGS_CAREGIVER),
        },
      ],
    },
    {
      title: 'サポート機能',
      items: [
        {
          id: 'toilet-timing',
          icon: 'schedule',
          title: 'トイレタイミング',
          description: 'リマインダーの間隔と通知設定',
          onPress: () => router.push(USER_ROUTES.SETTINGS_TOILET_TIMING),
        },
        {
          id: 'alarm-value',
          icon: 'notifications-active',
          title: 'アラート閾値',
          description: '心拍数、疲労度などの通知基準',
          onPress: () => router.push(USER_ROUTES.SETTINGS_ALARM_VALUE),
        },
        {
          id: 'emergency-contact',
          icon: 'emergency',
          title: '緊急連絡先',
          description: '緊急時の連絡先を管理',
          onPress: () => router.push(USER_ROUTES.SETTINGS_EMERGENCY_CONTACT),
        },
      ],
    },
    {
      title: 'デバイス',
      items: [
        {
          id: 'connected-devices',
          icon: 'watch',
          title: '接続デバイス管理',
          description: 'Apple Watch、Pixel Watchの管理',
          onPress: () => router.push(USER_ROUTES.SETTINGS_CONNECTED_DEVICES),
        },
      ],
    },
  ];

  const handleNotificationPress = (item: SettingItem) => {
    item.onPress();
  };

  const filteredSections = searchQuery
    ? settingSections
        .map(section => ({
          ...section,
          items: section.items.filter(
            item =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(section => section.items.length > 0)
    : settingSections;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>設定</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={20} color="#999999" />
              <TextInput
                style={styles.searchInput}
                placeholder="設定を検索..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Settings Sections */}
          <ScrollView style={styles.settingsList} showsVerticalScrollIndicator={false}>
            {filteredSections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionContent}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.settingItem,
                        itemIndex === section.items.length - 1 && styles.settingItemLast,
                      ]}
                      onPress={() => handleNotificationPress(item)}
                    >
                      <View style={styles.settingItemLeft}>
                        <View style={styles.iconContainer}>
                          <MaterialIcons name={item.icon} size={24} color="#FF6B6B" />
                        </View>
                        <View style={styles.settingTextContainer}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>みまもりケア v1.0.0</Text>
            </View>
          </ScrollView>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="settings" />

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>ログアウト</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
