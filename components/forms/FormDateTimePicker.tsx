import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useController, useFormContext } from 'react-hook-form';
import { styles } from './styles';

interface FormDateTimePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  format?: (date: Date) => string;
}

export function FormDateTimePicker({
  name,
  label,
  required,
  mode = 'datetime',
  format,
}: FormDateTimePickerProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [show, setShow] = useState(false);

  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleDismiss = () => {
    setShow(false);
  };

  const formatValue = (date: Date | undefined) => {
    if (!date) return '';
    if (format) return format(date);

    if (mode === 'time') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    if (mode === 'date') {
      return date.toLocaleDateString('ja-JP');
    }
    return date.toLocaleString('ja-JP');
  };

  return (
    <View style={styles.formField}>
      {label && (
        <Text style={styles.fieldLabel}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.fieldInput, styles.dateTimePickerButton, error && styles.fieldInputError]}
        onPress={() => setShow(true)}
      >
        <Text style={value ? styles.fieldValue : styles.fieldPlaceholder}>
          {formatValue(value) || '選択してください'}
        </Text>
        <Text style={styles.dateTimePickerIcon}>🕐</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {/* Android: Native Picker */}
      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}

      {/* iOS: Modal Picker */}
      {show && Platform.OS === 'ios' && (
        <Modal
          transparent
          animationType="slide"
          visible={show}
          onRequestClose={handleDismiss}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleDismiss}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label || '時刻を選択'}</Text>
                <TouchableOpacity onPress={handleDismiss}>
                  <Text style={styles.modalDoneButton}>完了</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={value || new Date()}
                mode={mode}
                display="spinner"
                onChange={handleChange}
                style={styles.iosPicker}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}
