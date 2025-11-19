import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
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

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function NavItem({ icon, label, isActive, onPress }: NavItemProps) {
  return (
    <YStack
      flex={1}
      alignItems="center"
      gap="$1"
      onPress={onPress}
      cursor="pointer"
      pressStyle={{ opacity: 0.7 }}
    >
      <YStack width={24} height={24}>
        {icon}
      </YStack>
      <Text
        fontSize={11}
        color={isActive ? '$primary' : '$colorTertiary'}
        fontWeight={isActive ? '600' : '400'}
      >
        {label}
      </Text>
    </YStack>
  );
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
    <XStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="$background"
      paddingVertical="$2"
      paddingBottom="$5"
      borderTopWidth={1}
      borderTopColor="$borderColor"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={10}
    >
      <NavItem
        icon={activeTab === 'home' ? (
          <HouseFill size={24} color="#FF6B6B" />
        ) : (
          <HouseLine size={24} color="#999999" />
        )}
        label="ホーム"
        isActive={activeTab === 'home'}
        onPress={() => handlePress('home')}
      />
      <NavItem
        icon={activeTab === 'schedule' ? (
          <ItineraryFill size={24} color="#FF6B6B" />
        ) : (
          <ItineraryLine size={24} color="#999999" />
        )}
        label="スケジュール"
        isActive={activeTab === 'schedule'}
        onPress={() => handlePress('schedule')}
      />
      <NavItem
        icon={activeTab === 'share' ? (
          <MenuFill size={24} color="#FF6B6B" />
        ) : (
          <MenuLine size={24} color="#999999" />
        )}
        label="共有"
        isActive={activeTab === 'share'}
        onPress={() => handlePress('share')}
      />
      <NavItem
        icon={activeTab === 'notification' ? (
          <NotificationFill size={24} color="#FF6B6B" />
        ) : (
          <NotificationLine size={24} color="#999999" />
        )}
        label="通知"
        isActive={activeTab === 'notification'}
        onPress={() => handlePress('notification')}
      />
      <NavItem
        icon={activeTab === 'settings' ? (
          <HelpFill size={24} color="#FF6B6B" />
        ) : (
          <HelpLine size={24} color="#999999" />
        )}
        label="設定"
        isActive={activeTab === 'settings'}
        onPress={() => handlePress('settings')}
      />
    </XStack>
  );
}

