import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { YStack } from 'tamagui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface PermissionSectionProps {
  onOpenSettings: () => void;
}

export function PermissionSection({ onOpenSettings }: PermissionSectionProps) {
  return (
    <YStack style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <MaterialIcons name="security" size={24} color="#FF6B6B" />
        <Text style={styles.title}>デバイス権限</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        健康データやセンサー情報を取得するには、デバイスの権限許可が必要です。
        下のボタンをタップして、設定画面から必要な権限を許可してください。
      </Text>

      {/* Permission Button */}
      <TouchableOpacity style={styles.button} onPress={onOpenSettings}>
        <MaterialIcons name="settings" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>デバイス権限を許可</Text>
      </TouchableOpacity>
    </YStack>
  );
}