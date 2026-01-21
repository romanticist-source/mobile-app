import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface AppHeaderProps {
  isWatchConnected?: boolean;
  watchBattery?: number;
}

export function AppHeader({ isWatchConnected = false, watchBattery }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHelperMode = pathname.startsWith('/helper');

  // Determine UI content based on mode
  const title = isHelperMode ? '介助者アプリ' : 'みまもりケア';

  const handleNotificationPress = () => {
    if (isHelperMode) {
      router.push('/helper/notifications');
    } else {
      router.push('/user/notifications');
    }
  };

  return (
    <View style={styles.header}>
      {/* Left: App Title */}
      <View style={styles.headerLeft}>
        <Text style={styles.appTitle}>{title}</Text>
      </View>

      {/* Right: Watch Status + Notification Bell */}
      <View style={styles.headerRight}>
        {/* Watch Connection Status */}
        <View style={styles.watchStatus}>
          <View style={[
            styles.watchIndicator,
            isWatchConnected ? styles.watchConnected : styles.watchDisconnected
          ]} />
          <MaterialIcons
            name="watch"
            size={20}
            color={isWatchConnected ? '#333333' : '#999999'}
          />
          {isWatchConnected && watchBattery !== undefined && (
            <Text style={styles.watchBattery}>{watchBattery}%</Text>
          )}
        </View>

        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <MaterialIcons name="notifications" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
