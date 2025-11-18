import { BottomNavigation } from '@/components/layouts/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type TabType = 'health' | 'emergency';

export default function ShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');
  const [isEditing, setIsEditing] = useState(false);

  // Health card data states
  const [healthConditions, setHealthConditions] = useState(['高血圧', '糖尿病', '軽度の身体障害', '心臓病']);
  const [newCondition, setNewCondition] = useState('');
  const [bloodType, setBloodType] = useState('A型');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('65');
  const [allergies, setAllergies] = useState('ペニシリン、花粉');
  const [medications, setMedications] = useState('降圧剤、ビタミンD');
  const [disability, setDisability] = useState('軽度の歩行障害');
  const [notes, setNotes] = useState('長時間の立位は困難、30分ごとに休憩が必要');

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

  const caregivers = [
    {
      id: '1',
      name: '山田花子',
      relation: 'はなちゃん',
      role: '娘',
      phone: '090-XXXX-XXXX',
      email: 'hanako@example.com',
      avatar: '山',
      avatarColor: '#FFE4E4',
      status: 'online',
    },
    {
      id: '2',
      name: '佐藤健太',
      relation: 'けんちゃん',
      role: '息子',
      phone: '090-YYYY-YYYY',
      email: '',
      avatar: '佐',
      avatarColor: '#FFE4E4',
      status: 'online',
    },
    {
      id: '3',
      name: '田中看護師',
      relation: '田中さん',
      role: '訪問看護師',
      phone: '090-ZZZZ-ZZZZ',
      email: 'tanaka@nursing.com',
      avatar: '田',
      avatarColor: '#FFE4E4',
      status: 'offline',
    },
  ];

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  userName: {
    fontSize: 14,
    color: '#333333',
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabIconActive: {
    // Icon remains the same
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#FF6B6B',
  },
  // Card
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
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
  // User Info
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
  // Tags
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
  // Details
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
  // Emergency Card
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#C62828',
    gap: 12,
  },
  emergencyHeaderIcon: {
    fontSize: 24,
  },
  emergencyHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emergencyHeaderSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  emergencySectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 12,
  },
  emergencySectionTitle2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emergencyInfoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  emergencyInfoItem: {
    flex: 1,
  },
  emergencyInfoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  emergencyInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  emergencyTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  emergencyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#C62828',
    borderRadius: 16,
  },
  emergencyTagText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  medicationList: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationItem: {
    fontSize: 14,
    color: '#1565C0',
    marginBottom: 4,
  },
  allergyText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  emergencyContactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 16,
    marginBottom: 12,
  },
  emergencyContactBox: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  emergencyContactItem: {
    marginBottom: 8,
  },
  emergencyContactLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  emergencyContactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 2,
  },
  emergencyContactPhone: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  emergencyContactDivider: {
    height: 1,
    backgroundColor: '#FFE4E4',
    marginVertical: 12,
  },
  emergencyNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Caregivers
  caregiversSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  caregiversHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  caregiversHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caregiversIcon: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  caregiversTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  caregiverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
  },
  caregiverInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  caregiverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  caregiverAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CCCCCC',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusOnline: {
    backgroundColor: '#4CAF50',
  },
  caregiverDetails: {
    flex: 1,
  },
  caregiverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  caregiverRelation: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  caregiverRole: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  caregiverPhone: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  caregiverEmail: {
    fontSize: 13,
    color: '#666666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  callButtonIcon: {
    fontSize: 16,
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerNote: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
});
