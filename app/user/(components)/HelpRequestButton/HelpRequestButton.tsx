import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface HelpRequestButtonProps {
  onPress: () => void;
}

export function HelpRequestButton({ onPress }: HelpRequestButtonProps) {
  return (
    <TouchableOpacity style={styles.helpButton} onPress={onPress}>
      <View style={styles.helpButtonContent}>
        <View style={styles.helpIcon}>
          <Text style={styles.helpIconText}>⚠</Text>
        </View>
        <Text style={styles.helpButtonText}>ヘルプ要請</Text>
      </View>
    </TouchableOpacity>
  );
}
