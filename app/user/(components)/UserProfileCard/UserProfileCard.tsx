import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface UserProfileCardProps {
  name: string;
  avatarText: string;
  status: string;
  onSettingsPress?: () => void;
}

export function UserProfileCard({
  name,
  avatarText,
  status,
  onSettingsPress,
}: UserProfileCardProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileLeft}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{avatarText}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileStatus}>状態: {status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
        <Text style={styles.settingsButtonText}>設定</Text>
      </TouchableOpacity>
    </View>
  );
}
