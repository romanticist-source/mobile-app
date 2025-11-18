import React, { useState } from 'react';
import { Modal } from 'react-native';
import { YStack, XStack, Text, Input, Button, ScrollView } from 'tamagui';
import type { ScheduleCategory } from '@/_schema/schedule';

interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

const CATEGORIES: ScheduleCategory[] = ['予定', '休息', 'トイレ', '服薬', '食事', '運動', 'その他'];

export function AddScheduleModal({ visible, onClose }: AddScheduleModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ScheduleCategory>('予定');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('Save schedule:', { title, category, time, description });
    // Reset form
    setTitle('');
    setCategory('予定');
    setTime('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <YStack
        flex={1}
        backgroundColor="$backgroundOverlay"
        justifyContent="center"
        alignItems="center"
        padding="$5"
      >
        <YStack
          backgroundColor="$background"
          borderRadius="$4"
          width="100%"
          maxWidth={500}
          maxHeight="90%"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          elevation={8}
        >
          {/* Modal Header */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            padding="$5"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <XStack alignItems="center" gap="$3">
              <YStack
                width={40}
                height={40}
                borderRadius={20}
                backgroundColor="$primaryLight"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize={20}>📅</Text>
              </YStack>
              <Text fontSize={18} fontWeight="600" color="$color">
                新規スケジュール
              </Text>
            </XStack>
            <Button
              padding="$2"
              backgroundColor="transparent"
              onPress={onClose}
              unstyled
            >
              <Text fontSize={24} color="$colorSecondary">✕</Text>
            </Button>
          </XStack>

          {/* Modal Content */}
          <ScrollView padding="$5">
            <YStack gap="$6">
              {/* Title Field */}
              <YStack gap="$3">
                <Text fontSize={14} fontWeight="600" color="$colorSecondary">
                  タイトル
                </Text>
                <Input
                  value={title}
                  onChangeText={setTitle}
                  placeholder="例: 通院、休憩タイム"
                  backgroundColor="$backgroundSecondary"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$2"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  fontSize={16}
                />
              </YStack>

              {/* Category Field */}
              <YStack gap="$3">
                <Text fontSize={14} fontWeight="600" color="$colorSecondary">
                  カテゴリー
                </Text>
                <XStack flexWrap="wrap" gap="$2">
                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat}
                      size="$3"
                      paddingHorizontal="$4"
                      paddingVertical="$2"
                      borderRadius={20}
                      backgroundColor={category === cat ? '$primaryLight' : '$backgroundSecondary'}
                      borderWidth={1}
                      borderColor={category === cat ? '$primary' : '$borderColor'}
                      onPress={() => setCategory(cat)}
                    >
                      <Text
                        fontSize={14}
                        color={category === cat ? '$primary' : '$colorSecondary'}
                        fontWeight={category === cat ? '600' : '400'}
                      >
                        {cat}
                      </Text>
                    </Button>
                  ))}
                </XStack>
              </YStack>

              {/* Time Field */}
              <YStack gap="$3">
                <Text fontSize={14} fontWeight="600" color="$colorSecondary">
                  時間
                </Text>
                <Input
                  value={time}
                  onChangeText={setTime}
                  placeholder="例: 10:00"
                  backgroundColor="$backgroundSecondary"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$2"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  fontSize={16}
                />
              </YStack>

              {/* Description Field */}
              <YStack gap="$3">
                <Text fontSize={14} fontWeight="600" color="$colorSecondary">
                  詳細（任意）
                </Text>
                <Input
                  value={description}
                  onChangeText={setDescription}
                  placeholder="備考や注意事項を入力..."
                  backgroundColor="$backgroundSecondary"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$2"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  fontSize={16}
                  multiline
                  numberOfLines={4}
                  minHeight={100}
                />
              </YStack>
            </YStack>
          </ScrollView>

          {/* Modal Footer */}
          <XStack
            justifyContent="flex-end"
            gap="$3"
            padding="$5"
            borderTopWidth={1}
            borderTopColor="$borderColor"
          >
            <Button
              paddingHorizontal="$6"
              paddingVertical="$3"
              borderRadius="$2"
              backgroundColor="$backgroundSecondary"
              onPress={onClose}
            >
              <Text fontSize={16} fontWeight="600" color="$colorSecondary">
                キャンセル
              </Text>
            </Button>
            <Button
              paddingHorizontal="$6"
              paddingVertical="$3"
              borderRadius="$2"
              backgroundColor="$primary"
              onPress={handleSave}
            >
              <XStack alignItems="center" gap="$2">
                <Text fontSize={16} color="white">✓</Text>
                <Text fontSize={16} fontWeight="600" color="white">
                  保存
                </Text>
              </XStack>
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
}

