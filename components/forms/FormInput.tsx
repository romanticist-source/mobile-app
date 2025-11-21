import React from 'react';
import { TextInputProps } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { YStack, Input, Label, Text } from 'tamagui';

interface FormInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label?: string;
  required?: boolean;
}

export function FormInput({ name, label, required, ...rest }: FormInputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur },
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

      <Input
        id={name}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholderTextColor="$gray9"
        borderColor={error ? '$red9' : '$borderColor'}
        backgroundColor="$background"
        color="$color"
        fontSize="$4"
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderRadius="$4"
        focusStyle={{
          borderColor: '$blue9',
          outlineWidth: 0,
        }}
        {...rest}
      />

      {error && (
        <Text color="$red10" fontSize="$2" marginTop="$1">
          {error.message}
        </Text>
      )}
    </YStack>
  );
}
