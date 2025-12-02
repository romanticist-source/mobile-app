import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NotificationPermissionSection } from "./(components)/NotificationPermissionSection/NotificationPermissionSection";
import { styles } from "./styles";

export default function NotificationsScreen() {
  const router = useRouter();

  const handleOpenSettings = () => {
    // TODO: Implement notification settings navigation
    console.log("Open notification settings");
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
