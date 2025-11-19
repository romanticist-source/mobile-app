import React from 'react';
import { XStack, Text } from 'tamagui';

type TabType = 'health' | 'emergency';

interface ShareTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ShareTabs({ activeTab, onTabChange }: ShareTabsProps) {
  const isHealthActive = activeTab === 'health';
  const isEmergencyActive = activeTab === 'emergency';

  return (
    <XStack paddingHorizontal="$4" paddingTop="$4" gap="$3">
      <XStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingVertical="$3"
        backgroundColor={isHealthActive ? "$primaryLight" : "$background"}
        borderRadius="$2"
        borderWidth={1}
        borderColor={isHealthActive ? "$primary" : "$borderColor"}
        gap="$1.5"
        pressStyle={{ opacity: 0.7 }}
        onPress={() => onTabChange('health')}
      >
        <Text fontSize={16}>👤</Text>
        <Text
          fontSize={14}
          fontWeight="600"
          color={isHealthActive ? "$primary" : "$colorSecondary"}
        >
          体調カード
        </Text>
      </XStack>
      <XStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingVertical="$3"
        backgroundColor={isEmergencyActive ? "$primaryLight" : "$background"}
        borderRadius="$2"
        borderWidth={1}
        borderColor={isEmergencyActive ? "$primary" : "$borderColor"}
        gap="$1.5"
        pressStyle={{ opacity: 0.7 }}
        onPress={() => onTabChange('emergency')}
      >
        <Text fontSize={16}>❤️</Text>
        <Text
          fontSize={14}
          fontWeight="600"
          color={isEmergencyActive ? "$primary" : "$colorSecondary"}
        >
          緊急ヘルプカード
        </Text>
      </XStack>
    </XStack>
  );
}
