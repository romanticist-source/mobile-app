import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface FormSaveButtonProps {
  onSave: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export function FormSaveButton({
  onSave,
  label = '保存',
  disabled = false,
  loading = false,
  icon = 'save',
}: FormSaveButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.saveButton, isDisabled && styles.saveButtonDisabled]}
        onPress={onSave}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <MaterialIcons name={icon} size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.saveButtonText}>{label}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  icon: {
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
