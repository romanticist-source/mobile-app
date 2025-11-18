import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styles } from './styles';

export default function ConnectedDevicesScreen() {
  const router = useRouter();

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
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⌚</Text>
          </View>
          <Text style={styles.title}>接続デバイス管理</Text>
          <Text style={styles.description}>
            Apple Watch、Pixel Watchの管理
          </Text>
        </View>
      </View>
    </>
  );
}
