import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { YStack } from 'tamagui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface NotificationPermissionSectionProps {
  onOpenSettings: () => void;
}

export function NotificationPermissionSection({ onOpenSettings }: NotificationPermissionSectionProps) {
  return (
    <YStack style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <MaterialIcons name="notifications" size={24} color="#FF6B6B" />
        <Text style={styles.title}>通知権限</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        アプリからの通知を受け取るには、端末の通知権限を許可する必要があります。
        下のボタンをタップして、設定画面から通知を許可してください。
      </Text>

      {/* Permission Button */}
      <TouchableOpacity style={styles.button} onPress={onOpenSettings}>
        <MaterialIcons name="settings" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>通知権限を許可</Text>
      </TouchableOpacity>
    </YStack>
  );
}