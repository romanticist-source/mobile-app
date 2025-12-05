import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { USER_ROUTES } from '@/_util/navigationRoutes';
import { styles } from './styles';
import type { ComponentProps } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const settingSections: SettingSection[] = [
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
      </View>
    </>
  );
}
