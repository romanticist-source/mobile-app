import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
});
