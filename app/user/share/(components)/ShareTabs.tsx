import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TabType = 'health' | 'emergency';

interface ShareTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ShareTabs({ activeTab, onTabChange }: ShareTabsProps) {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'health' && styles.tabActive]}
        onPress={() => onTabChange('health')}
      >
        <Text
          style={[
            styles.tabIcon,
            activeTab === 'health' && styles.tabIconActive,
          ]}
        >
          👤
        </Text>
        <Text
          style={[
            styles.tabText,
            activeTab === 'health' && styles.tabTextActive,
          ]}
        >
          体調カード
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'emergency' && styles.tabActive]}
        onPress={() => onTabChange('emergency')}
      >
        <Text
          style={[
            styles.tabIcon,
            activeTab === 'emergency' && styles.tabIconActive,
          ]}
        >
          ❤️
        </Text>
        <Text
          style={[
            styles.tabText,
            activeTab === 'emergency' && styles.tabTextActive,
          ]}
        >
          緊急ヘルプカード
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabIconActive: {
    // Icon remains the same
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#FF6B6B',
  },
});
