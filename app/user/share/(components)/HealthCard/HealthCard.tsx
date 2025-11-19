import React from 'react';
import { XStack, YStack, Text, Input } from 'tamagui';

export interface HealthCardData {
  healthConditions: string[];
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  disability: string;
  notes: string;
}

interface HealthCardProps {
  isEditing: boolean;
  data: HealthCardData;
  newCondition: string;
  onToggleEdit: () => void;
  onDataChange: (field: keyof HealthCardData, value: any) => void;
  onNewConditionChange: (value: string) => void;
  onAddCondition: () => void;
  onRemoveCondition: (index: number) => void;
  calculateBMI: () => string;
}

export function HealthCard({
  isEditing,
  data,
  newCondition,
  onToggleEdit,
  onDataChange,
  onNewConditionChange,
  onAddCondition,
  onRemoveCondition,
  calculateBMI,
}: HealthCardProps) {
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$3"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$3"
        borderBottomWidth={1}
        borderBottomColor="$backgroundSecondary"
        gap="$2"
      >
        <Text fontSize={16} color="$primary">👤</Text>
        <Text flex={1} fontSize={16} fontWeight="600" color="$primary">
          体調カード
        </Text>
        <XStack
          alignItems="center"
          gap="$1"
          pressStyle={{ opacity: 0.7 }}
          onPress={onToggleEdit}
        >
          {isEditing ? (
            <>
              <Text fontSize={14}>✓</Text>
              <Text fontSize={14} color="$primary">完了</Text>
            </>
          ) : (
            <>
              <Text fontSize={14}>✏️</Text>
              <Text fontSize={14} color="$primary">編集</Text>
            </>
          )}
        </XStack>
      </XStack>

      <YStack padding="$4">
        {/* User Info */}
        <XStack alignItems="center" gap="$3" marginBottom="$5">
          <YStack
            width={48}
            height={48}
            borderRadius={24}
            backgroundColor="$primaryLight"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Text fontSize={20} fontWeight="bold" color="$primary">山</Text>
            {isEditing && (
              <YStack
                position="absolute"
                bottom={-2}
                right={-2}
                width={20}
                height={20}
                borderRadius={10}
                backgroundColor="$primary"
                alignItems="center"
                justifyContent="center"
                borderWidth={2}
                borderColor="$background"
              >
                <Text fontSize={10}>📷</Text>
              </YStack>
            )}
          </YStack>
          <Text fontSize={18} fontWeight="600" color="$color">
            山田太郎
          </Text>
        </XStack>

        {/* Health Conditions */}
        <Text fontSize={13} color="$colorSecondary" marginBottom="$2">
          病状・疾患
        </Text>
        <XStack flexWrap="wrap" gap="$2" marginBottom="$5">
          {data.healthConditions.map((condition, index) => (
            <XStack
              key={index}
              alignItems="center"
              paddingHorizontal="$3"
              paddingVertical="$1.5"
              backgroundColor="$primaryLight"
              borderRadius="$4"
              gap="$1.5"
            >
              <Text fontSize={13} color="$primary" fontWeight="500">
                {condition}
              </Text>
              {isEditing && (
                <Text
                  fontSize={16}
                  color="$primary"
                  fontWeight="bold"
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => onRemoveCondition(index)}
                >
                  ×
                </Text>
              )}
            </XStack>
          ))}
        </XStack>

        {isEditing && (
          <XStack alignItems="center" gap="$2" marginBottom="$5">
            <Input
              flex={1}
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={14}
              color="$color"
              backgroundColor="$background"
              placeholder="新しい病状を追加..."
              value={newCondition}
              onChangeText={onNewConditionChange}
            />
            <YStack
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor="$primary"
              alignItems="center"
              justifyContent="center"
              pressStyle={{ opacity: 0.7 }}
              onPress={onAddCondition}
            >
              <Text fontSize={20} color="white" fontWeight="bold">
                +
              </Text>
            </YStack>
          </XStack>
        )}

        {/* Details */}
        <Text fontSize={15} fontWeight="600" color="$color" marginBottom="$3">
          詳細情報
        </Text>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            血液型
          </Text>
          {isEditing ? (
            <Input
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={15}
              color="$color"
              backgroundColor="$background"
              value={data.bloodType}
              onChangeText={(value) => onDataChange('bloodType', value)}
            />
          ) : (
            <Text fontSize={15} color="$color">
              {data.bloodType}
            </Text>
          )}
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            身長・体重
          </Text>
          {isEditing ? (
            <XStack alignItems="center" gap="$2">
              <Input
                flex={1}
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$2"
                paddingHorizontal="$3"
                paddingVertical="$2"
                fontSize={15}
                color="$color"
                backgroundColor="$background"
                value={data.height}
                onChangeText={(value) => onDataChange('height', value)}
                keyboardType="numeric"
                placeholder="170"
              />
              <Text fontSize={15} color="$colorSecondary">/</Text>
              <Input
                flex={1}
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$2"
                paddingHorizontal="$3"
                paddingVertical="$2"
                fontSize={15}
                color="$color"
                backgroundColor="$background"
                value={data.weight}
                onChangeText={(value) => onDataChange('weight', value)}
                keyboardType="numeric"
                placeholder="65"
              />
            </XStack>
          ) : (
            <Text fontSize={15} color="$color">
              {data.height}cm / {data.weight}kg
            </Text>
          )}
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            BMI
          </Text>
          <Text fontSize={15} color="$color">
            {calculateBMI()}
          </Text>
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            アレルギー
          </Text>
          {isEditing ? (
            <Input
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={15}
              color="$color"
              backgroundColor="$background"
              value={data.allergies}
              onChangeText={(value) => onDataChange('allergies', value)}
              placeholder="ペニシリン、花粉"
            />
          ) : (
            <Text fontSize={15} color="$color">
              {data.allergies}
            </Text>
          )}
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            服用薬
          </Text>
          {isEditing ? (
            <Input
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={15}
              color="$color"
              backgroundColor="$background"
              value={data.medications}
              onChangeText={(value) => onDataChange('medications', value)}
              placeholder="降圧剤、ビタミンD"
            />
          ) : (
            <Text fontSize={15} color="$color">
              {data.medications}
            </Text>
          )}
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            障害情報
          </Text>
          {isEditing ? (
            <Input
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={15}
              color="$color"
              backgroundColor="$background"
              value={data.disability}
              onChangeText={(value) => onDataChange('disability', value)}
              placeholder="軽度の歩行障害"
            />
          ) : (
            <Text fontSize={15} color="$color">
              {data.disability}
            </Text>
          )}
        </YStack>

        <YStack marginBottom="$4">
          <Text fontSize={13} color="$colorSecondary" marginBottom="$1">
            注意事項
          </Text>
          {isEditing ? (
            <Input
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize={15}
              color="$color"
              backgroundColor="$background"
              value={data.notes}
              onChangeText={(value) => onDataChange('notes', value)}
              placeholder="長時間の立位は困難、30分ごとに休憩が必要"
              multiline
              minHeight={60}
            />
          ) : (
            <Text fontSize={15} color="$color">
              {data.notes}
            </Text>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
}


