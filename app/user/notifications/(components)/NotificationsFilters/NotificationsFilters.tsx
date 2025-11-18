import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

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

  return (
    <View style={styles.filtersContainer}>
      <TouchableOpacity style={styles.filterDropdown}>
        <Text style={styles.filterDropdownText}>すべて</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'unread' && styles.filterButtonActive,
        ]}
        onPress={toggleFilter}
      >
        <Text style={styles.filterIcon}>🔍</Text>
        <Text
          style={[
            styles.filterButtonText,
            currentFilter === 'unread' && styles.filterButtonTextActive,
          ]}
        >
          未読のみ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

