import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { styles } from './styles';

interface SettingItem {
  id: string;
  icon: string;
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
  const [searchQuery, setSearchQuery] = useState('');

  const settingSections: SettingSection[] = [
    {
      title: '通知とアラート',
      items: [
        {
          id: 'notifications',
          icon: '🔔',
          title: '通知設定',
          description: '通知の種類とタイミングをカスタマイズ',
          onPress: () => router.push('/user/settings/notifications'),
        },
      ],
    },
    {
      title: 'アカウント',
      items: [
        {
          id: 'profile',
          icon: '👤',
          title: 'プロフィール設定',
          description: '名前、生年月日、連絡先など',
          onPress: () => router.push('/user/settings/profile'),
        },
        {
          id: 'health-profile',
          icon: '❤️',
          title: '健康プロフィール',
          description: '既往歴、アレルギー、服薬情報',
          onPress: () => router.push('/user/settings/health-profile'),
        },
      ],
    },
    {
      title: '安全と共有',
      items: [
        {
          id: 'caregiver',
          icon: '👥',
          title: '介助者管理',
          description: '介助者の追加・削除・権限設定',
          onPress: () => router.push('/user/settings/caregiver'),
        },
        {
          id: 'privacy',
          icon: '👁️',
          title: 'プライバシー設定',
          description: '情報共有範囲と公開設定',
          onPress: () => router.push('/user/settings/privacy'),
        },
      ],
    },
    {
      title: 'サポート機能',
      items: [
        {
          id: 'toilet-timing',
          icon: '🕐',
          title: 'トイレタイミング',
          description: 'リマインダーの間隔と通知設定',
          onPress: () => router.push('/user/settings/toilet-timing'),
        },
        {
          id: 'rest-management',
          icon: '🕐',
          title: '休憩管理',
          description: '休憩時間と自動提案の設定',
          onPress: () => router.push('/user/settings/rest-management'),
        },
        {
          id: 'alarm-value',
          icon: '🔔',
          title: 'アラート閾値',
          description: '心拍数、疲労度などの通知基準',
          onPress: () => router.push('/user/settings/alarm-value'),
        },
        {
          id: 'emergency-contact',
          icon: '🆘',
          title: '緊急連絡先',
          description: '緊急時の連絡先を管理',
          onPress: () => router.push('/user/settings/emergency-contact'),
        },
      ],
    },
    {
      title: 'アクセシビリティ',
      items: [
        {
          id: 'sound-vibration',
          icon: '🔊',
          title: '音と振動設定',
          description: '通知音、振動パターンのカスタマイズ',
          onPress: () => router.push('/user/settings/sound-vibration'),
        },
        {
          id: 'accessibility',
          icon: '♿',
          title: 'アクセシビリティ設定',
          description: '文字サイズ、コントラスト、音声ガイド',
          onPress: () => router.push('/user/settings/accessibility'),
        },
      ],
    },
    {
      title: 'デバイス',
      items: [
        {
          id: 'connected-devices',
          icon: '⌚',
          title: '接続デバイス管理',
          description: 'Apple Watch、Pixel Watchの管理',
          onPress: () => router.push('/user/settings/connected-devices'),
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
          {/* Header */}
          <AppHeader />

          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>設定</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
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
                          <Text style={styles.settingIcon}>{item.icon}</Text>
                        </View>
                        <View style={styles.settingTextContainer}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <Text style={styles.chevron}>›</Text>
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
      </View>
    </>
  );
}
