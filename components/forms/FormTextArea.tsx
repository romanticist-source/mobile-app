import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { styles } from './styles';

interface FormTextAreaProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label?: string;
  required?: boolean;
  numberOfLines?: number;
}

export function FormTextArea({
  name,
  label,
  required,
  numberOfLines = 4,
  ...rest
}: FormTextAreaProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur },
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
      <TextInput
        style={[styles.fieldInput, styles.fieldTextArea, error && styles.fieldInputError]}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholderTextColor="#CCCCCC"
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}
