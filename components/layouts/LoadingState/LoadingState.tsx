import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

interface LoadingStateProps {
  message?: string;
  color?: string;
}

export function LoadingState({ message = '読み込み中...', color = '#2196F3' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
