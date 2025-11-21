import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';

interface UserHomeLayoutProps {
  children?: ReactNode;
}

export function UserHomeLayout({ children }: UserHomeLayoutProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </View>
  );
}

