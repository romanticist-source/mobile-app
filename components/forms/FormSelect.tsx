import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { YStack, Label, Text, Select, Adapt, Sheet } from 'tamagui';
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

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
  defaultValue?: string;
}

export function FormSelect({
  name,
  label,
  required,
  options,
  placeholder = '選択してください',
  defaultValue,
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

      <Select
        id={name}
        value={value ?? defaultValue}
        onValueChange={onChange}
        disablePreventBodyScroll
      >
        <Select.Trigger
          width="100%"
          iconAfter={<FiChevronDown size={20} />}
          borderColor={error ? '$red9' : '$borderColor'}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <FiChevronUp size={20} />
            </YStack>
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              {useMemo(
                () =>
                  options.map((option, index) => (
                    <Select.Item
                      index={index}
                      key={option.value}
                      value={option.value}
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <FiCheck size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )),
                [options]
              )}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <FiChevronDown size={20} />
            </YStack>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>

      {error && (
        <Text color="$red10" fontSize="$2" marginTop="$1">
          {error.message}
        </Text>
      )}
    </YStack>
  );
}
