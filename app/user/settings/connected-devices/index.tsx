import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SettingsHeader } from "@/components/layouts/SettingsHeader/SettingsHeader";
import { PermissionSection } from "@/components/features/settings/connected-devices/PermissionSection/PermissionSection";
import { styles } from "./styles";

export default function ConnectedDevicesScreen() {
  const handleOpenSettings = () => {
    // TODO: Implement device settings navigation
    console.log("Open device settings");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="接続デバイス管理" />

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Permission Section */}
            <PermissionSection onOpenSettings={handleOpenSettings} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
