import React from 'react';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useController, useFormContext } from 'react-hook-form';
import { YStack, Label, Text, XStack } from 'tamagui';

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
    <YStack gap="$2" marginBottom="$4">
      {label && (
        <Label htmlFor={name} fontSize="$3" fontWeight="500" color="$color">
          {label}
          {required && (
            <Text color="$red10" marginLeft="$1">
              *
            </Text>
          )}
        </Label>
      )}

      <XStack
        borderWidth={1}
        borderColor={error ? '$red9' : '$borderColor'}
        borderRadius="$4"
        backgroundColor="$background"
        overflow="hidden"
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{
            flex: 1,
            height: Platform.OS === 'ios' ? 200 : 48,
            color: '#333333',
          }}
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
      </XStack>

      {error && (
        <Text color="$red10" fontSize="$2" marginTop="$1">
          {error.message}
        </Text>
      )}
    </YStack>
  );
}
