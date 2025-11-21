import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

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
