import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SettingsHeader } from "@/components/layouts/SettingsHeader/SettingsHeader";
import { NotificationPermissionSection } from "@/components/features/settings/notifications/NotificationPermissionSection/NotificationPermissionSection";
import { styles } from "./styles";

export default function NotificationsScreen() {
  const handleOpenSettings = () => {
    // TODO: Implement notification settings navigation
    console.log("Open notification settings");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="通知設定" />

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Notification Permission Section */}
            <NotificationPermissionSection
              onOpenSettings={handleOpenSettings}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
