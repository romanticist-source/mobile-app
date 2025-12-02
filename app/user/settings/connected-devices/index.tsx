import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PermissionSection } from "./(components)/PermissionSection/PermissionSection";
import { styles } from "./styles";

export default function ConnectedDevicesScreen() {
  const router = useRouter();

  const handleOpenSettings = () => {
    // TODO: Implement device settings navigation
    console.log("Open device settings");
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
          <Text style={styles.headerTitle}>接続デバイス管理</Text>
          <View style={styles.headerRight} />
        </View>

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
