import React from 'react';
import { View, Text, TextInput,  } from 'react-native';
import { styles } from './styles';
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

