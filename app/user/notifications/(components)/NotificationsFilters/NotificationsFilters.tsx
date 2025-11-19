import React from 'react';
import { XStack, Text } from 'tamagui';

type FilterType = 'all' | 'unread';

interface NotificationsFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function NotificationsFilters({
  currentFilter,
  onFilterChange,
}: NotificationsFiltersProps) {
  const toggleFilter = () => {
    onFilterChange(currentFilter === 'all' ? 'unread' : 'all');
  };

  const isActive = currentFilter === 'unread';

  return (
    <XStack
      gap="$3"
      paddingHorizontal="$4"
      paddingTop="$4"
      paddingBottom="$2"
    >
      <XStack
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderRadius="$2"
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Text fontSize={14} color="$color">すべて</Text>
        <Text fontSize={16} color="$colorSecondary">⌄</Text>
      </XStack>
      <XStack
        alignItems="center"
        gap="$1.5"
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderRadius="$2"
        backgroundColor={isActive ? "$primary" : "$background"}
        borderWidth={1}
        borderColor={isActive ? "$primary" : "$borderColor"}
        pressStyle={{ opacity: 0.7 }}
        onPress={toggleFilter}
      >
        <Text fontSize={14}>🔍</Text>
        <Text
          fontSize={14}
          fontWeight="600"
          color={isActive ? "white" : "$colorSecondary"}
        >
          未読のみ
        </Text>
      </XStack>
    </XStack>
  );
}

