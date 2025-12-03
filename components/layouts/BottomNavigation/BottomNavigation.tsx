import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { useNavigationContext } from '@/hooks/useNavigationContext';
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
  const { routes } = useNavigationContext();

  const handlePress = (tab: NavTab) => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      // Default navigation behavior - automatically routes to /user or /helper based on context
      switch (tab) {
        case 'home':
          router.push(routes.HOME);
          break;
        case 'schedule':
          router.push(routes.SCHEDULES);
          break;
        case 'notification':
          router.push(routes.NOTIFICATIONS);
          break;
        case 'share':
          router.push(routes.SHARE);
          break;
        case 'settings':
          router.push(routes.SETTINGS);
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

