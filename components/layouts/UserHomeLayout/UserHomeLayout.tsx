import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { styles } from './styles';

interface UserHomeLayoutProps {
  children?: ReactNode;
  showHeader?: boolean;
}

export function UserHomeLayout({ children, showHeader = true }: UserHomeLayoutProps) {
  return (
    <View style={styles.container}>
      {showHeader && <AppHeader />}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </View>
  );
}

