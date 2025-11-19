import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useController, useFormContext } from 'react-hook-form';
import { styles } from './styles';

export interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export function FormSelect({
  name,
  label,
  required,
  options,
  placeholder = '選択してください',
}: FormSelectProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View style={styles.formField}>
      {label && (
        <Text style={styles.fieldLabel}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={[styles.fieldInput, error && styles.fieldInputError, styles.pickerContainer]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item
            label={placeholder}
            value=""
            enabled={false}
            color="#CCCCCC"
          />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}
