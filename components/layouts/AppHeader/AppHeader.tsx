import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export function AppHeader() {
  const pathname = usePathname();
  const isHelperMode = pathname.startsWith('/helper');
  const { user, helper } = useAuth();

  // Determine UI content based on mode and logged-in user
  const icon = isHelperMode ? '🤝' : '❤️';
  const title = isHelperMode ? '介助者アプリ' : 'みまもりケア';
  const subtitle = isHelperMode ? 'みまもりをサポート' : 'あなたの健康をサポート';
  const userIcon = isHelperMode ? '👨‍⚕️' : '👤';

  // Display logged-in user/helper name
  const displayName = isHelperMode
    ? (helper?.name ?? '介助者名')
    : (user?.name ?? 'ユーザー名');

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>{icon}</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>{title}</Text>
          <Text style={styles.appSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.userIconContainer}>
          <Text style={styles.userIcon}>{userIcon}</Text>
        </View>
        <Text style={styles.userName}>{displayName}</Text>
      </View>
    </View>
  );
}
