import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

export function ErrorState({
  message = '読み込みに失敗しました',
  onRetry,
  retryButtonText = '再読み込み',
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={48} color="#F44336" />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>{retryButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
