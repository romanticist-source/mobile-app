import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 8,
  },
  cardHeaderIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  cardHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonIcon: {
    fontSize: 14,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  cardBody: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE4E4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    fontSize: 10,
  },
  userName2: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  sectionLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFE4E4',
    borderRadius: 16,
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  removeTagIcon: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  addConditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  addConditionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  addConditionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addConditionButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#333333',
  },
  detailInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  detailInputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  heightWeightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heightWeightInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  heightWeightSeparator: {
    fontSize: 15,
    color: '#666666',
  },
});
