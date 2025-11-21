import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface AppHeaderProps {
  userName?: string;
}

export function AppHeader({ userName = 'ユーザー名' }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>❤️</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>みまもりケア</Text>
          <Text style={styles.appSubtitle}>あなたの健康をサポート</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.userIconContainer}>
          <Text style={styles.userIcon}>👤</Text>
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
}

