import { mockCaregivers, mockHealthCardData } from '@/_api/__mock__/share';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type TabType = 'health' | 'emergency';

export default function ShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');
  const [isEditing, setIsEditing] = useState(false);

  // Health card data states - initialized from mock data
  const [healthConditions, setHealthConditions] = useState(mockHealthCardData.healthConditions);
  const [newCondition, setNewCondition] = useState('');
  const [bloodType, setBloodType] = useState(mockHealthCardData.bloodType);
  const [height, setHeight] = useState(mockHealthCardData.height);
  const [weight, setWeight] = useState(mockHealthCardData.weight);
  const [allergies, setAllergies] = useState(mockHealthCardData.allergies);
  const [medications, setMedications] = useState(mockHealthCardData.medications);
  const [disability, setDisability] = useState(mockHealthCardData.disability);
  const [notes, setNotes] = useState(mockHealthCardData.notes);

  // Calculate BMI
  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '22.5';
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setHealthConditions([...healthConditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index: number) => {
    setHealthConditions(healthConditions.filter((_, i) => i !== index));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Caregivers data from mock
  const caregivers = mockCaregivers;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.appIcon}>
                <Text style={styles.appIconText}>❤️</Text>
              </View>
              <View>
                <Text style={styles.appTitle}>みまもりケア</Text>
                <Text style={styles.appSubtitle}>あなたの健康をサポート</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.userIconContainer}>
                <Text style={styles.userIcon}>👤</Text>
              </View>
              <Text style={styles.userName}>ユーザー名</Text>
            </View>
          </View>

          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>共有</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'health' && styles.tabActive]}
              onPress={() => setActiveTab('health')}
            >
              <Text style={[styles.tabIcon, activeTab === 'health' && styles.tabIconActive]}>👤</Text>
              <Text style={[styles.tabText, activeTab === 'health' && styles.tabTextActive]}>体調カード</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'emergency' && styles.tabActive]}
              onPress={() => setActiveTab('emergency')}
            >
              <Text style={[styles.tabIcon, activeTab === 'emergency' && styles.tabIconActive]}>❤️</Text>
              <Text style={[styles.tabText, activeTab === 'emergency' && styles.tabTextActive]}>緊急ヘルプカード</Text>
            </TouchableOpacity>
          </View>

          {/* Card Content */}
          <View style={styles.cardContainer}>
            {activeTab === 'health' ? (
              // Health Card
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderIcon}>👤</Text>
                  <Text style={styles.cardHeaderText}>体調カード</Text>
                  <TouchableOpacity style={styles.editButton} onPress={handleToggleEdit}>
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
                    {healthConditions.map((condition, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{condition}</Text>
                        {isEditing && (
                          <TouchableOpacity onPress={() => handleRemoveCondition(index)}>
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
                        onChangeText={setNewCondition}
                      />
                      <TouchableOpacity style={styles.addConditionButton} onPress={handleAddCondition}>
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
                        value={bloodType}
                        onChangeText={setBloodType}
                      />
                    ) : (
                      <Text style={styles.detailValue}>{bloodType}</Text>
                    )}
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>身長・体重</Text>
                    {isEditing ? (
                      <View style={styles.heightWeightContainer}>
                        <TextInput
                          style={styles.heightWeightInput}
                          value={height}
                          onChangeText={setHeight}
                          keyboardType="numeric"
                          placeholder="170"
                        />
                        <Text style={styles.heightWeightSeparator}>/</Text>
                        <TextInput
                          style={styles.heightWeightInput}
                          value={weight}
                          onChangeText={setWeight}
                          keyboardType="numeric"
                          placeholder="65"
                        />
                      </View>
                    ) : (
                      <Text style={styles.detailValue}>{height}cm / {weight}kg</Text>
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
                        value={allergies}
                        onChangeText={setAllergies}
                        placeholder="ペニシリン、花粉"
                      />
                    ) : (
                      <Text style={styles.detailValue}>{allergies}</Text>
                    )}
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>服用薬</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.detailInput}
                        value={medications}
                        onChangeText={setMedications}
                        placeholder="降圧剤、ビタミンD"
                      />
                    ) : (
                      <Text style={styles.detailValue}>{medications}</Text>
                    )}
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>障害情報</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.detailInput}
                        value={disability}
                        onChangeText={setDisability}
                        placeholder="軽度の歩行障害"
                      />
                    ) : (
                      <Text style={styles.detailValue}>{disability}</Text>
                    )}
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>注意事項</Text>
                    {isEditing ? (
                      <TextInput
                        style={[styles.detailInput, styles.detailInputMultiline]}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="長時間の立位は困難、30分ごとに休憩が必要"
                        multiline
                      />
                    ) : (
                      <Text style={styles.detailValue}>{notes}</Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              // Emergency Help Card
              <View style={styles.card}>
                <View style={styles.emergencyHeader}>
                  <Text style={styles.emergencyHeaderIcon}>⚠️</Text>
                  <View>
                    <Text style={styles.emergencyHeaderTitle}>緊急ヘルプカード</Text>
                    <Text style={styles.emergencyHeaderSubtitle}>このカードは緊急時必要です</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  {/* Basic Info */}
                  <Text style={styles.emergencySectionTitle}>❤️ 基本情報</Text>
                  <View style={styles.emergencyInfoGrid}>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>お名前</Text>
                      <Text style={styles.emergencyInfoValue}>山田太郎</Text>
                    </View>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>役職</Text>
                      <Text style={styles.emergencyInfoValue}>軽度の身体障害</Text>
                    </View>
                  </View>
                  <View style={styles.emergencyInfoItem}>
                    <Text style={styles.emergencyInfoLabel}>血液型</Text>
                    <Text style={styles.emergencyInfoValue}>A型</Text>
                  </View>

                  {/* Emergency Notes */}
                  <Text style={styles.emergencySectionTitle2}>緊急時注意事項</Text>
                  <View style={styles.emergencyTagsContainer}>
                    <View style={styles.emergencyTag}>
                      <Text style={styles.emergencyTagText}>心臓病</Text>
                    </View>
                    <View style={styles.emergencyTag}>
                      <Text style={styles.emergencyTagText}>低血圧</Text>
                    </View>
                  </View>

                  {/* Medications */}
                  <Text style={styles.emergencySectionTitle2}>服用薬</Text>
                  <View style={styles.medicationList}>
                    <Text style={styles.medicationItem}>• サンプル薬A</Text>
                    <Text style={styles.medicationItem}>• サンプル薬B</Text>
                  </View>

                  {/* Allergies */}
                  <Text style={styles.emergencySectionTitle2}>アレルギー</Text>
                  <Text style={styles.allergyText}>なし</Text>

                  {/* Emergency Contacts */}
                  <Text style={styles.emergencyContactTitle}>📞 緊急連絡先</Text>
                  <View style={styles.emergencyContactBox}>
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>介助者</Text>
                      <Text style={styles.emergencyContactName}>山田花子（娘）</Text>
                      <Text style={styles.emergencyContactPhone}>090-YYYY-YYYY</Text>
                    </View>
                    <View style={styles.emergencyContactDivider} />
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>かかりつけ病院</Text>
                      <Text style={styles.emergencyContactName}>サンプル病院</Text>
                      <Text style={styles.emergencyContactPhone}>03-XXXX-XXXX</Text>
                    </View>
                  </View>

                  <Text style={styles.emergencyNote}>
                    このカードは緊急時・ヘルプ要請時に周囲の方へ提示してください
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Caregivers Section */}
          <View style={styles.caregiversSection}>
            <View style={styles.caregiversHeader}>
              <View style={styles.caregiversHeaderLeft}>
                <Text style={styles.caregiversIcon}>👥</Text>
                <Text style={styles.caregiversTitle}>介助者</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ 追加</Text>
              </TouchableOpacity>
            </View>

            {caregivers.map((caregiver) => (
              <View key={caregiver.id} style={styles.caregiverCard}>
                <View style={styles.caregiverInfo}>
                  <View style={[styles.caregiverAvatar, { backgroundColor: caregiver.avatarColor }]}>
                    <Text style={styles.caregiverAvatarText}>{caregiver.avatar}</Text>
                    <View style={[styles.statusIndicator, caregiver.status === 'online' && styles.statusOnline]} />
                  </View>
                  <View style={styles.caregiverDetails}>
                    <View style={styles.caregiverNameRow}>
                      <Text style={styles.caregiverName}>{caregiver.name}</Text>
                      <Text style={styles.caregiverRelation}>（{caregiver.relation}）</Text>
                    </View>
                    <Text style={styles.caregiverRole}>{caregiver.role}</Text>
                    <Text style={styles.caregiverPhone}>📞 {caregiver.phone}</Text>
                    {caregiver.email && (
                      <Text style={styles.caregiverEmail}>✉️ {caregiver.email}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Text style={styles.callButtonIcon}>📞</Text>
                  <Text style={styles.callButtonText}>電話をかける</Text>
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.footerNote}>
              介助者と連携してあなたの健康をサポートします
            </Text>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="share" />
      </View>
    </>
  );
}

