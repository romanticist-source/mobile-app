import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface FormButtonGroupProps {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  saveDisabled?: boolean;
  loading?: boolean;
}

export function FormButtonGroup({
  onCancel,
  onSave,
  cancelLabel = 'キャンセル',
  saveLabel = '保存',
  saveDisabled = false,
  loading = false,
}: FormButtonGroupProps) {
  const isDisabled = saveDisabled || loading;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton} disabled={loading}>
        <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSave}
        style={[styles.saveButton, isDisabled && styles.saveButtonDisabled]}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={[styles.saveButtonText, isDisabled && styles.saveButtonTextDisabled]}>
            {saveLabel}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveButtonTextDisabled: {
    color: '#999999',
  },
});
