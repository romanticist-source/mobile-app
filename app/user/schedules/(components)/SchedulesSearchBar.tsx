import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface SchedulesSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SchedulesSearchBar({
  value,
  onChangeText,
}: SchedulesSearchBarProps) {
  return (
    <View style={styles.section}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="スケジュールを検索..."
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
});
