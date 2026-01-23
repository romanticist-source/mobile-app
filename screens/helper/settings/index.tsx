import { HELPER_ROUTES } from "@/_util/navigationRoutes";
import { BottomNavigation } from "@/components/layouts/BottomNavigation/BottomNavigation";
import { UserHomeLayout } from "@/components/layouts/UserHomeLayout/UserHomeLayout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { logout } from "@/api/auth";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

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
  const [searchQuery, setSearchQuery] = useState("");

  const settingSections: SettingSection[] = [
    {
      title: "接続管理",
      items: [
        {
          id: "requests",
          icon: "person-add",
          title: "接続リクエスト",
          description: "ユーザーからの接続リクエストを管理",
          onPress: () => router.push("/helper/requests"),
        },
      ],
    },
    {
      title: "通知とアラート",
      items: [
        {
          id: "notifications",
          icon: "notifications",
          title: "通知設定",
          description: "通知の種類とタイミングをカスタマイズ",
          onPress: () => router.push(HELPER_ROUTES.SETTINGS_NOTIFICATIONS),
        },
      ],
    },
    {
      title: "アカウント",
      items: [
        {
          id: "profile",
          icon: "person",
          title: "プロフィール設定",
          description: "名前、生年月日、連絡先など",
          onPress: () => router.push(HELPER_ROUTES.SETTINGS_PROFILE),
        },
        {
          id: "health-profile",
          icon: "favorite",
          title: "健康プロフィール",
          description: "既往歴、アレルギー、服薬情報",
          onPress: () => router.push(HELPER_ROUTES.SETTINGS_HEALTH_PROFILE),
        },
      ],
    },
    {
      title: "サポート機能",
      items: [
        {
          id: "emergency-contact",
          icon: "emergency",
          title: "緊急連絡先",
          description: "緊急時の連絡先を管理",
          onPress: () => router.push(HELPER_ROUTES.SETTINGS_EMERGENCY_CONTACT),
        },
      ],
    },
    {
      title: "プライバシー",
      items: [
        {
          id: "privacy",
          icon: "lock",
          title: "プライバシー設定",
          description: "データの共有と利用設定",
          onPress: () => router.push(HELPER_ROUTES.SETTINGS_PRIVACY),
        },
      ],
    },
  ];

  const handleNotificationPress = (item: SettingItem) => {
    item.onPress();
  };

  const handleLogout = async () => {
      await logout();
      // ログイン画面へ遷移
      router.replace("/login");
  };

  const filteredSections = searchQuery
    ? settingSections
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length > 0)
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
          <ScrollView
            style={styles.settingsList}
            showsVerticalScrollIndicator={false}
          >
            {filteredSections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionContent}>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.settingItem,
                        itemIndex === section.items.length - 1 &&
                          styles.settingItemLast,
                      ]}
                      onPress={() => handleNotificationPress(item)}
                    >
                      <View style={styles.settingItemLeft}>
                        <View style={styles.iconContainer}>
                          <MaterialIcons
                            name={item.icon}
                            size={24}
                            color="#FF6B6B"
                          />
                        </View>
                        <View style={styles.settingTextContainer}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingDescription}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <MaterialIcons
                        name="chevron-right"
                        size={24}
                        color="#CCCCCC"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            {/* Logout Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>アカウント管理</Text>
              <View style={styles.sectionContent}>
                <TouchableOpacity
                  onPress={handleLogout}
                  style={[styles.settingItem, styles.settingItemLast]}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingItemLeft}>
                    {/* アイコン（任意：赤系の背景にするとログアウト感が出ます） */}
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: "#FFE5E5" },
                      ]}
                    >
                      <Text style={[styles.settingIcon, { color: "#FF6B6B" }]}>
                        󰍃
                      </Text>
                    </View>

                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: "#FF6B6B" }]}>
                        ログアウト
                      </Text>
                      <Text style={styles.settingDescription}>
                        アカウントからサインアウトします
                      </Text>
                    </View>
                  </View>

                  {/* 他の項目と合わせるための右矢印（不要ならカットしてOK） */}
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>ミエリンク v1.0.0</Text>
            </View>
          </ScrollView>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="settings" />
      </View>
    </>
  );
}
