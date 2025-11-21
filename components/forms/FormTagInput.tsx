import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { YStack, XStack, Input, Label, Text } from 'tamagui';

interface FormTagInputProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  addButtonText?: string;
}

export function FormTagInput({
  name,
  label,
  required,
  placeholder = '新しい項目を追加...',
  addButtonText = '+',
}: FormTagInputProps) {
  const { control } = useFormContext();
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...value, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_: string, i: number) => i !== index));
  };

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

      {/* Tags Container */}
      {value.length > 0 && (
        <XStack flexWrap="wrap" gap="$2">
          {value.map((item: string, index: number) => (
            <XStack
              key={index}
              backgroundColor="$blue3"
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$3"
              alignItems="center"
              gap="$2"
            >
              <Text color="$blue11" fontSize="$3">
                {item}
              </Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Text color="$blue11" fontSize="$3" fontWeight="600">
                  ×
                </Text>
              </TouchableOpacity>
            </XStack>
          ))}
        </XStack>
      )}

      {/* Add Input */}
      <XStack gap="$2" alignItems="center">
        <Input
          flex={1}
          value={newItem}
          onChangeText={setNewItem}
          placeholder={placeholder}
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
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: '#007AFF',
            width: 44,
            height: 44,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="600">
            {addButtonText}
          </Text>
        </TouchableOpacity>
      </XStack>

      {error && (
        <Text color="$red10" fontSize="$2" marginTop="$1">
          {error.message}
        </Text>
      )}
    </YStack>
  );
}
