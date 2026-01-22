import React from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface AppHeaderProps {
  isWatchConnected?: boolean;
  watchBattery?: number;
}

export function AppHeader({ isWatchConnected = false, watchBattery }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Left: Empty for balance */}
      <View style={styles.headerLeft} />

      {/* Center: Logo */}
      <View style={styles.headerCenter}>
        <Image
          source={require('@/assets/images/mielink_new .png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Right: Watch Status */}
      <View style={styles.headerRight}>
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
      </View>
    </View>
  );
}
