import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { styles } from './styles';
import {
  type AlertTypeFilter,
  type ReadFilter,
  ALERT_TYPE_OPTIONS,
} from '../../(hooks)/useNotifications';

interface NotificationsFiltersProps {
  alertTypeFilter: AlertTypeFilter;
  readFilter: ReadFilter;
  onAlertTypeFilterChange: (filter: AlertTypeFilter) => void;
  onReadFilterChange: (filter: ReadFilter) => void;
}

export function NotificationsFilters({
  alertTypeFilter,
  readFilter,
  onAlertTypeFilterChange,
  onReadFilterChange,
}: NotificationsFiltersProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleReadFilter = () => {
    onReadFilterChange(readFilter === 'all' ? 'unread' : 'all');
  };

  const selectedTypeLabel = ALERT_TYPE_OPTIONS.find(
    (option) => option.value === alertTypeFilter
  )?.label ?? 'すべて';

  const handleSelectType = (value: AlertTypeFilter) => {
    onAlertTypeFilterChange(value);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.filtersContainer}>
      {/* Alert Type Dropdown */}
      <TouchableOpacity
        style={styles.filterDropdown}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.filterDropdownText}>{selectedTypeLabel}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <FlatList
              data={ALERT_TYPE_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    alertTypeFilter === item.value && styles.dropdownItemActive,
                  ]}
                  onPress={() => handleSelectType(item.value)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      alertTypeFilter === item.value && styles.dropdownItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Unread Filter Toggle */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          readFilter === 'unread' && styles.filterButtonActive,
        ]}
        onPress={toggleReadFilter}
      >
        <Text style={styles.filterIcon}>🔍</Text>
        <Text
          style={[
            styles.filterButtonText,
            readFilter === 'unread' && styles.filterButtonTextActive,
          ]}
        >
          未読のみ
        </Text>
      </TouchableOpacity>
    </View>
  );
}
