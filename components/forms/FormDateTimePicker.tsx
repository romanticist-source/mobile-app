import React, { useState } from 'react';
import { Platform, Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useController, useFormContext } from 'react-hook-form';
import { YStack, XStack, Text, Button, Input, Label } from 'tamagui';

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
        value={formatValue(value)}
        placeholder="選択してください"
        editable={false}
        onPress={() => setShow(true)}
        pressStyle={{ borderColor: '$blue9' }}
        borderColor={error ? '$red9' : '$borderColor'}
        backgroundColor="$background"
        color="$color"
        fontSize="$4"
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderRadius="$4"
        cursor="pointer"
      />

      {error && (
        <Text color="$red10" fontSize="$2" marginTop="$1">
          {error.message}
        </Text>
      )}

      {/* Android: Native Picker */}
      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}

      {/* iOS: Apple-style Modal Picker */}
      {show && Platform.OS === 'ios' && (
        <RNModal
          transparent
          animationType="slide"
          visible={show}
          onRequestClose={handleDismiss}
        >
          <TouchableWithoutFeedback onPress={handleDismiss}>
            <YStack
              flex={1}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              justifyContent="flex-end"
            >
              <TouchableWithoutFeedback>
                <YStack
                  backgroundColor="#F9F9F9"
                  borderTopLeftRadius="$6"
                  borderTopRightRadius="$6"
                  overflow="hidden"
                >
                  {/* Header with Done button - Apple style */}
                  <XStack
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal="$4"
                    paddingVertical="$3"
                    backgroundColor="#FAFAFA"
                    borderBottomWidth={0.5}
                    borderBottomColor="rgba(60, 60, 67, 0.12)"
                  >
                    <Button
                      size="$3"
                      chromeless
                      color="#007AFF"
                      fontSize="$5"
                      fontWeight="400"
                      onPress={handleDismiss}
                      pressStyle={{ opacity: 0.6 }}
                    >
                      キャンセル
                    </Button>
                    <Text
                      fontSize="$4"
                      fontWeight="600"
                      color="#000000"
                      opacity={0.85}
                    >
                      {label || '時刻を選択'}
                    </Text>
                    <Button
                      size="$3"
                      chromeless
                      color="#007AFF"
                      fontSize="$5"
                      fontWeight="600"
                      onPress={handleDismiss}
                      pressStyle={{ opacity: 0.6 }}
                    >
                      完了
                    </Button>
                  </XStack>

                  {/* Date/Time Picker - Apple style spinner */}
                  <YStack
                    backgroundColor="#FFFFFF"
                    paddingVertical="$2"
                  >
                    <DateTimePicker
                      value={value || new Date()}
                      mode={mode}
                      display="spinner"
                      onChange={handleChange}
                      themeVariant="light"
                      locale="ja-JP"
                      style={{
                        height: 216,
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </YStack>

                  {/* Bottom safe area */}
                  <YStack
                    backgroundColor="#FFFFFF"
                    height={34}
                  />
                </YStack>
              </TouchableWithoutFeedback>
            </YStack>
          </TouchableWithoutFeedback>
        </RNModal>
      )}

      {/* Web: Fallback to native input */}
      {show && Platform.OS === 'web' && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000}
        >
          <DateTimePicker
            value={value || new Date()}
            mode={mode}
            display="default"
            onChange={handleChange}
          />
        </YStack>
      )}
    </YStack>
  );
}
