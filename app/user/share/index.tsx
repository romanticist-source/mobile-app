import { mockHealthCardData } from '@/api/__mock__/share';
import { getHelpers } from '@/api/helpers';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import type { Helper } from '@/_schema';
import { Stack } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { EditHealthCardModal } from './(components)/EditHealthCardModal/EditHealthCardModal';
import { EditEmergencyCardModal } from './(components)/EditEmergencyCardModal/EditEmergencyCardModal';

// UI表示用の型
interface CaregiverDisplay {
  id: string;
  name: string;
  relation: string;
  role: string;
  phone: string;
  email?: string;
  avatar: string;
  avatarColor: string;
  status: 'online' | 'offline';
}

// Helper から CaregiverDisplay への変換
const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const helperToCaregiverDisplay = (helper: Helper, index: number): CaregiverDisplay => ({
  id: helper.id,
  name: helper.name,
  relation: helper.relationship,
  role: helper.nickname,
  phone: helper.phoneNumber,
  email: helper.email,
  avatar: helper.name.charAt(0),
  avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
  status: 'offline',
});

type TabType = 'health' | 'emergency';

export default function ShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');
  const [isHealthModalVisible, setIsHealthModalVisible] = useState(false);
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false);

  // Health card data states - initialized from mock data
  const [healthConditions, setHealthConditions] = useState(mockHealthCardData.healthConditions);
  const [bloodType, setBloodType] = useState(mockHealthCardData.bloodType);
  const [height, setHeight] = useState(mockHealthCardData.height);
  const [weight, setWeight] = useState(mockHealthCardData.weight);
  const [allergies, setAllergies] = useState(mockHealthCardData.allergies);
  const [medications, setMedications] = useState(mockHealthCardData.medications);
  const [disability, setDisability] = useState(mockHealthCardData.disability);
  const [notes, setNotes] = useState(mockHealthCardData.notes);

  // Emergency card data states
  const [emergencyName, setEmergencyName] = useState('山田太郎');
  const [emergencyCondition, setEmergencyCondition] = useState('軽度の身体障害');
  const [emergencyBloodType, setEmergencyBloodType] = useState('A型');
  const [emergencyNotes, setEmergencyNotes] = useState(['心臓病', '低血圧']);
  const [emergencyMedications, setEmergencyMedications] = useState(['サンプル薬A', 'サンプル薬B']);
  const [emergencyAllergies, setEmergencyAllergies] = useState('なし');
  const [caregiverName, setCaregiverName] = useState('山田花子');
  const [caregiverRelation, setCaregiverRelation] = useState('娘');
  const [caregiverPhone, setCaregiverPhone] = useState('090-YYYY-YYYY');
  const [hospitalName, setHospitalName] = useState('サンプル病院');
  const [hospitalPhone, setHospitalPhone] = useState('03-XXXX-XXXX');

  // Caregivers data from API
  const [caregivers, setCaregivers] = useState<CaregiverDisplay[]>([]);
  const [caregiversLoading, setCaregiversLoading] = useState(true);
  const [caregiversError, setCaregiversError] = useState<Error | null>(null);

  const fetchCaregivers = useCallback(async () => {
    try {
      setCaregiversLoading(true);
      const helpers = await getHelpers();
      const displayCaregivers = helpers.map((helper, index) =>
        helperToCaregiverDisplay(helper, index)
      );
      setCaregivers(displayCaregivers);
      setCaregiversError(null);
    } catch (err) {
      setCaregiversError(err as Error);
    } finally {
      setCaregiversLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaregivers();
  }, [fetchCaregivers]);

  // Calculate BMI
  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '22.5';
  };

  const handleHealthCardSave = (data: {
    healthConditions: string[];
    bloodType: string;
    height: string;
    weight: string;
    allergies: string;
    medications: string;
    disability: string;
    notes: string;
  }) => {
    setHealthConditions(data.healthConditions);
    setBloodType(data.bloodType);
    setHeight(data.height);
    setWeight(data.weight);
    setAllergies(data.allergies);
    setMedications(data.medications);
    setDisability(data.disability);
    setNotes(data.notes);
  };

  const handleEmergencyCardSave = (data: {
    name: string;
    condition: string;
    bloodType: string;
    emergencyNotes: string[];
    medications: string[];
    allergies: string;
    caregiverName: string;
    caregiverRelation: string;
    caregiverPhone: string;
    hospitalName: string;
    hospitalPhone: string;
  }) => {
    setEmergencyName(data.name);
    setEmergencyCondition(data.condition);
    setEmergencyBloodType(data.bloodType);
    setEmergencyNotes(data.emergencyNotes);
    setEmergencyMedications(data.medications);
    setEmergencyAllergies(data.allergies);
    setCaregiverName(data.caregiverName);
    setCaregiverRelation(data.caregiverRelation);
    setCaregiverPhone(data.caregiverPhone);
    setHospitalName(data.hospitalName);
    setHospitalPhone(data.hospitalPhone);
  };

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
                  <TouchableOpacity style={styles.editButton} onPress={() => setIsHealthModalVisible(true)}>
                    <Text style={styles.editButtonIcon}>✏️</Text>
                    <Text style={styles.editButtonText}>編集</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  {/* User Info */}
                  <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                      <Text style={styles.userAvatarText}>山</Text>
                    </View>
                    <Text style={styles.userName2}>山田太郎</Text>
                  </View>

                  {/* Health Conditions */}
                  <Text style={styles.sectionLabel}>病状・疾患</Text>
                  <View style={styles.tagsContainer}>
                    {healthConditions.map((condition, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{condition}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Details */}
                  <Text style={styles.sectionTitle}>詳細情報</Text>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>血液型</Text>
                    <Text style={styles.detailValue}>{bloodType}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>身長・体重</Text>
                    <Text style={styles.detailValue}>{height}cm / {weight}kg</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>BMI</Text>
                    <Text style={styles.detailValue}>{calculateBMI()}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>アレルギー</Text>
                    <Text style={styles.detailValue}>{allergies}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>服用薬</Text>
                    <Text style={styles.detailValue}>{medications}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>障害情報</Text>
                    <Text style={styles.detailValue}>{disability}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>注意事項</Text>
                    <Text style={styles.detailValue}>{notes}</Text>
                  </View>
                </View>
              </View>
            ) : (
              // Emergency Help Card
              <View style={styles.card}>
                <View style={styles.emergencyHeader}>
                  <Text style={styles.emergencyHeaderIcon}>⚠️</Text>
                  <View style={styles.emergencyHeaderContent}>
                    <Text style={styles.emergencyHeaderTitle}>緊急ヘルプカード</Text>
                    <Text style={styles.emergencyHeaderSubtitle}>このカードは緊急時必要です</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => setIsEmergencyModalVisible(true)}>
                    <Text style={styles.editButtonIcon}>✏️</Text>
                    <Text style={styles.editButtonText}>編集</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  {/* Basic Info */}
                  <Text style={styles.emergencySectionTitle}>❤️ 基本情報</Text>
                  <View style={styles.emergencyInfoGrid}>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>お名前</Text>
                      <Text style={styles.emergencyInfoValue}>{emergencyName}</Text>
                    </View>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>役職</Text>
                      <Text style={styles.emergencyInfoValue}>{emergencyCondition}</Text>
                    </View>
                  </View>
                  <View style={styles.emergencyInfoItem}>
                    <Text style={styles.emergencyInfoLabel}>血液型</Text>
                    <Text style={styles.emergencyInfoValue}>{emergencyBloodType}</Text>
                  </View>

                  {/* Emergency Notes */}
                  <Text style={styles.emergencySectionTitle2}>緊急時注意事項</Text>
                  <View style={styles.emergencyTagsContainer}>
                    {emergencyNotes.map((note, index) => (
                      <View key={index} style={styles.emergencyTag}>
                        <Text style={styles.emergencyTagText}>{note}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Medications */}
                  <Text style={styles.emergencySectionTitle2}>服用薬</Text>
                  <View style={styles.medicationList}>
                    {emergencyMedications.map((med, index) => (
                      <Text key={index} style={styles.medicationItem}>• {med}</Text>
                    ))}
                  </View>

                  {/* Allergies */}
                  <Text style={styles.emergencySectionTitle2}>アレルギー</Text>
                  <Text style={styles.allergyText}>{emergencyAllergies}</Text>

                  {/* Emergency Contacts */}
                  <Text style={styles.emergencyContactTitle}>📞 緊急連絡先</Text>
                  <View style={styles.emergencyContactBox}>
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>介助者</Text>
                      <Text style={styles.emergencyContactName}>{caregiverName}（{caregiverRelation}）</Text>
                      <Text style={styles.emergencyContactPhone}>{caregiverPhone}</Text>
                    </View>
                    <View style={styles.emergencyContactDivider} />
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>かかりつけ病院</Text>
                      <Text style={styles.emergencyContactName}>{hospitalName}</Text>
                      <Text style={styles.emergencyContactPhone}>{hospitalPhone}</Text>
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

            {caregiversLoading ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" />
              </View>
            ) : caregiversError ? (
              <View style={{ padding: 20 }}>
                <Text style={{ color: '#FF0000', textAlign: 'center' }}>
                  介助者の取得に失敗しました
                </Text>
              </View>
            ) : caregivers.length === 0 ? (
              <View style={{ padding: 20 }}>
                <Text style={{ textAlign: 'center', color: '#666' }}>
                  介助者が登録されていません
                </Text>
              </View>
            ) : (
              caregivers.map((caregiver) => (
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
              ))
            )}

            <Text style={styles.footerNote}>
              介助者と連携してあなたの健康をサポートします
            </Text>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="share" />
      </View>

      {/* Edit Health Card Modal */}
      <EditHealthCardModal
        visible={isHealthModalVisible}
        onClose={() => setIsHealthModalVisible(false)}
        data={{
          healthConditions,
          bloodType,
          height,
          weight,
          allergies,
          medications,
          disability,
          notes,
        }}
        onSave={handleHealthCardSave}
      />

      {/* Edit Emergency Card Modal */}
      <EditEmergencyCardModal
        visible={isEmergencyModalVisible}
        onClose={() => setIsEmergencyModalVisible(false)}
        data={{
          name: emergencyName,
          condition: emergencyCondition,
          bloodType: emergencyBloodType,
          emergencyNotes,
          medications: emergencyMedications,
          allergies: emergencyAllergies,
          caregiverName,
          caregiverRelation,
          caregiverPhone,
          hospitalName,
          hospitalPhone,
        }}
        onSave={handleEmergencyCardSave}
      />
    </>
  );
}

