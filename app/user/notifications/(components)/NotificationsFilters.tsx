import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterDropdownText: {
    fontSize: 14,
    color: '#333333',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#999999',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
});
