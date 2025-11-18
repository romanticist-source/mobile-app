import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type NavTab = 'home' | 'schedule' | 'share' | 'notification' | 'settings';

interface BottomNavigationProps {
  activeTab?: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

export function BottomNavigation({ activeTab = 'home', onTabPress }: BottomNavigationProps) {
  const handlePress = (tab: NavTab) => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('home')}
      >
        <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>🏠</Text>
        <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('schedule')}
      >
        <Text style={[styles.navIcon, activeTab === 'schedule' && styles.navIconActive]}>📅</Text>
        <Text style={[styles.navLabel, activeTab === 'schedule' && styles.navLabelActive]}>スケジュール</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('share')}
      >
        <Text style={[styles.navIcon, activeTab === 'share' && styles.navIconActive]}>🔗</Text>
        <Text style={[styles.navLabel, activeTab === 'share' && styles.navLabelActive]}>共有</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('notification')}
      >
        <Text style={[styles.navIcon, activeTab === 'notification' && styles.navIconActive]}>🔔</Text>
        <Text style={[styles.navLabel, activeTab === 'notification' && styles.navLabelActive]}>通知</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('settings')}
      >
        <Text style={[styles.navIcon, activeTab === 'settings' && styles.navIconActive]}>⚙️</Text>
        <Text style={[styles.navLabel, activeTab === 'settings' && styles.navLabelActive]}>設定</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#999999',
  },
  navLabelActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
