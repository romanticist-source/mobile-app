import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  HouseFill,
  HouseLine,
  ItineraryFill,
  ItineraryLine,
  MenuFill,
  MenuLine,
  NotificationFill,
  NotificationLine,
  HelpFill,
  HelpLine,
} from '@imaimai17468/digital-agency-icons-react';

export type NavTab = 'home' | 'schedule' | 'share' | 'notification' | 'settings';

interface BottomNavigationProps {
  activeTab?: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

export function BottomNavigation({ activeTab = 'home', onTabPress }: BottomNavigationProps) {
  const router = useRouter();

  const handlePress = (tab: NavTab) => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      // Default navigation behavior
      switch (tab) {
        case 'home':
          router.push('/user');
          break;
        case 'schedule':
          router.push('/user/schedules');
          break;
        case 'notification':
          router.push('/user/notifications');
          break;
        case 'share':
          router.push('/user/share');
          break;
        case 'settings':
          router.push('/user/settings');
          break;
      }
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('home')}
      >
        <View style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>
          {activeTab === 'home' ? (
            <HouseFill size={24} color="#FF6B6B" />
          ) : (
            <HouseLine size={24} color="#999999" />
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('schedule')}
      >
        <View style={[styles.navIcon, activeTab === 'schedule' && styles.navIconActive]}>
          {activeTab === 'schedule' ? (
            <ItineraryFill size={24} color="#FF6B6B" />
          ) : (
            <ItineraryLine size={24} color="#999999" />
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'schedule' && styles.navLabelActive]}>スケジュール</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('share')}
      >
        <View style={[styles.navIcon, activeTab === 'share' && styles.navIconActive]}>
          {activeTab === 'share' ? (
            <MenuFill size={24} color="#FF6B6B" />
          ) : (
            <MenuLine size={24} color="#999999" />
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'share' && styles.navLabelActive]}>共有</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('notification')}
      >
        <View style={[styles.navIcon, activeTab === 'notification' && styles.navIconActive]}>
          {activeTab === 'notification' ? (
            <NotificationFill size={24} color="#FF6B6B" />
          ) : (
            <NotificationLine size={24} color="#999999" />
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'notification' && styles.navLabelActive]}>通知</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('settings')}
      >
        <View style={[styles.navIcon, activeTab === 'settings' && styles.navIconActive]}>
          {activeTab === 'settings' ? (
            <HelpFill size={24} color="#FF6B6B" />
          ) : (
            <HelpLine size={24} color="#999999" />
          )}
        </View>
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
    width: 24,
    height: 24,
  },
  navIconActive: {
    // Icon color is controlled via the color prop
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
