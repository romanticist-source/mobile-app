import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
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
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatValue = (date: Date | undefined) => {
    if (!date) return '';
    if (format) return format(date);

    if (mode === 'time') {
      return date.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
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
        style={[styles.fieldInput, error && styles.fieldInputError]}
        onPress={() => setShow(true)}
      >
        <Text style={value ? styles.fieldValue : styles.fieldPlaceholder}>
          {formatValue(value) || '選択してください'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
