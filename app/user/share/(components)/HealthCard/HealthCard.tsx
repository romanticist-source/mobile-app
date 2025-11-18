import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

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
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderIcon}>👤</Text>
        <Text style={styles.cardHeaderText}>体調カード</Text>
        <TouchableOpacity style={styles.editButton} onPress={onToggleEdit}>
          {isEditing ? (
            <>
              <Text style={styles.editButtonIcon}>✓</Text>
              <Text style={styles.editButtonText}>完了</Text>
            </>
          ) : (
            <>
              <Text style={styles.editButtonIcon}>✏️</Text>
              <Text style={styles.editButtonText}>編集</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>山</Text>
            {isEditing && (
              <View style={styles.cameraIconContainer}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
            )}
          </View>
          <Text style={styles.userName2}>山田太郎</Text>
        </View>

        {/* Health Conditions */}
        <Text style={styles.sectionLabel}>病状・疾患</Text>
        <View style={styles.tagsContainer}>
          {data.healthConditions.map((condition, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{condition}</Text>
              {isEditing && (
                <TouchableOpacity onPress={() => onRemoveCondition(index)}>
                  <Text style={styles.removeTagIcon}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {isEditing && (
          <View style={styles.addConditionContainer}>
            <TextInput
              style={styles.addConditionInput}
              placeholder="新しい病状を追加..."
              value={newCondition}
              onChangeText={onNewConditionChange}
            />
            <TouchableOpacity
              style={styles.addConditionButton}
              onPress={onAddCondition}
            >
              <Text style={styles.addConditionButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Details */}
        <Text style={styles.sectionTitle}>詳細情報</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>血液型</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailInput}
              value={data.bloodType}
              onChangeText={(value) => onDataChange('bloodType', value)}
            />
          ) : (
            <Text style={styles.detailValue}>{data.bloodType}</Text>
          )}
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>身長・体重</Text>
          {isEditing ? (
            <View style={styles.heightWeightContainer}>
              <TextInput
                style={styles.heightWeightInput}
                value={data.height}
                onChangeText={(value) => onDataChange('height', value)}
                keyboardType="numeric"
                placeholder="170"
              />
              <Text style={styles.heightWeightSeparator}>/</Text>
              <TextInput
                style={styles.heightWeightInput}
                value={data.weight}
                onChangeText={(value) => onDataChange('weight', value)}
                keyboardType="numeric"
                placeholder="65"
              />
            </View>
          ) : (
            <Text style={styles.detailValue}>
              {data.height}cm / {data.weight}kg
            </Text>
          )}
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>BMI</Text>
          <Text style={styles.detailValue}>{calculateBMI()}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>アレルギー</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailInput}
              value={data.allergies}
              onChangeText={(value) => onDataChange('allergies', value)}
              placeholder="ペニシリン、花粉"
            />
          ) : (
            <Text style={styles.detailValue}>{data.allergies}</Text>
          )}
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>服用薬</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailInput}
              value={data.medications}
              onChangeText={(value) => onDataChange('medications', value)}
              placeholder="降圧剤、ビタミンD"
            />
          ) : (
            <Text style={styles.detailValue}>{data.medications}</Text>
          )}
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>障害情報</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailInput}
              value={data.disability}
              onChangeText={(value) => onDataChange('disability', value)}
              placeholder="軽度の歩行障害"
            />
          ) : (
            <Text style={styles.detailValue}>{data.disability}</Text>
          )}
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>注意事項</Text>
          {isEditing ? (
            <TextInput
              style={[styles.detailInput, styles.detailInputMultiline]}
              value={data.notes}
              onChangeText={(value) => onDataChange('notes', value)}
              placeholder="長時間の立位は困難、30分ごとに休憩が必要"
              multiline
            />
          ) : (
            <Text style={styles.detailValue}>{data.notes}</Text>
          )}
        </View>
      </View>
    </View>
  );
}


