import type { User } from '@/_schema/user';
import { getUserById } from '@/api/users';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { useUser } from '@/contexts/UserContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { EditHealthCardModal } from '@/components/features/share/EditHealthCardModal/EditHealthCardModal';
import { EditEmergencyCardModal } from '@/components/features/share/EditEmergencyCardModal/EditEmergencyCardModal';
import { useShareScreen } from './(hooks)/useShareScreen';

export default function ShareScreen() {
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const {
    activeTab,
    setActiveTab,
    isHealthModalVisible,
    isEmergencyModalVisible,
    openHealthModal,
    closeHealthModal,
    openEmergencyModal,
    closeEmergencyModal,
    healthCardData,
    healthCardLoading,
    healthCardError,
    calculateBMI,
    handleHealthCardSave,
    emergencyCardData,
    handleEmergencyCardSave,
    caregivers,
    caregiversLoading,
    caregiversError,
  } = useShareScreen();

  const [userData, setUserData] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (!selectedUserId || isUserLoading) return;

    const fetchUser = async () => {
      try {
        const user = await getUserById(selectedUserId);
        setUserData(user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [selectedUserId, isUserLoading]);

  if (userLoading || !userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          <AppHeader />

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
              <MaterialIcons name="person" size={20} color={activeTab === 'health' ? '#FF6B6B' : '#666666'} />
              <Text style={[styles.tabText, activeTab === 'health' && styles.tabTextActive]}>体調カード</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'emergency' && styles.tabActive]}
              onPress={() => setActiveTab('emergency')}
            >
              <MaterialIcons name="favorite" size={20} color={activeTab === 'emergency' ? '#FF6B6B' : '#666666'} />
              <Text style={[styles.tabText, activeTab === 'emergency' && styles.tabTextActive]}>緊急ヘルプカード</Text>
            </TouchableOpacity>
          </View>

          {/* Card Content */}
          <View style={styles.cardContainer}>
            {activeTab === 'health' ? (
              // Health Card
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <MaterialIcons name="person" size={24} color="#FF6B6B" style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderText}>体調カード</Text>
                  <TouchableOpacity style={styles.editButton} onPress={openHealthModal}>
                    <MaterialIcons name="edit" size={16} color="#FF6B6B" />
                    <Text style={styles.editButtonText}>編集</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  {/* User Info */}
                  <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                      <Text style={styles.userAvatarText}>{userData.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.userName2}>

                    </Text>
                  </View>

                  {/* Health Conditions */}
                  <Text style={styles.sectionLabel}>病状・疾患</Text>
                  <View style={styles.tagsContainer}>
                    {healthCardData.healthConditions.map((condition, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{condition}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Details */}
                  <Text style={styles.sectionTitle}>詳細情報</Text>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>血液型</Text>
                    <Text style={styles.detailValue}>{healthCardData.bloodType}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>身長・体重</Text>
                    <Text style={styles.detailValue}>{healthCardData.height}cm / {healthCardData.weight}kg</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>BMI</Text>
                    <Text style={styles.detailValue}>{calculateBMI()}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>アレルギー</Text>
                    <Text style={styles.detailValue}>{healthCardData.allergies}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>服用薬</Text>
                    <Text style={styles.detailValue}>{healthCardData.medications}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>障害情報</Text>
                    <Text style={styles.detailValue}>{healthCardData.disability}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>注意事項</Text>
                    <Text style={styles.detailValue}>{healthCardData.notes}</Text>
                  </View>
                </View>
              </View>
            ) : (
              // Emergency Help Card
              <View style={styles.card}>
                <View style={styles.emergencyHeader}>
                  <MaterialIcons name="warning" size={24} color="#FF6B6B" style={styles.emergencyHeaderIcon} />
                  <View style={styles.emergencyHeaderContent}>
                    <Text style={styles.emergencyHeaderTitle}>緊急ヘルプカード</Text>
                    <Text style={styles.emergencyHeaderSubtitle}>このカードは緊急時必要です</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={openEmergencyModal}>
                    <MaterialIcons name="edit" size={16} color="#FF6B6B" />
                    <Text style={styles.editButtonText}>編集</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  {/* Basic Info */}
                  <View style={styles.emergencySectionTitleRow}>
                    <MaterialIcons name="favorite" size={18} color="#FF6B6B" />
                    <Text style={styles.emergencySectionTitle}> 基本情報</Text>
                  </View>
                  <View style={styles.emergencyInfoGrid}>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>お名前</Text>
                      <Text style={styles.emergencyInfoValue}>{userData.name}</Text>
                    </View>
                    <View style={styles.emergencyInfoItem}>
                      <Text style={styles.emergencyInfoLabel}>役職</Text>
                      <Text style={styles.emergencyInfoValue}>{emergencyCardData.condition}</Text>
                    </View>
                  </View>
                  <View style={styles.emergencyInfoItem}>
                    <Text style={styles.emergencyInfoLabel}>血液型</Text>
                    <Text style={styles.emergencyInfoValue}>{emergencyCardData.bloodType}</Text>
                  </View>

                  {/* Emergency Notes */}
                  <Text style={styles.emergencySectionTitle2}>緊急時注意事項</Text>
                  <View style={styles.emergencyTagsContainer}>
                    {emergencyCardData.emergencyNotes.map((note, index) => (
                      <View key={index} style={styles.emergencyTag}>
                        <Text style={styles.emergencyTagText}>{note}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Medications */}
                  <Text style={styles.emergencySectionTitle2}>服用薬</Text>
                  <View style={styles.medicationList}>
                    {emergencyCardData.medications.map((med, index) => (
                      <Text key={index} style={styles.medicationItem}>• {med}</Text>
                    ))}
                  </View>

                  {/* Allergies */}
                  <Text style={styles.emergencySectionTitle2}>アレルギー</Text>
                  <Text style={styles.allergyText}>{emergencyCardData.allergies}</Text>

                  {/* Emergency Contacts */}
                  <View style={styles.emergencyContactTitleRow}>
                    <MaterialIcons name="phone" size={18} color="#FF6B6B" />
                    <Text style={styles.emergencyContactTitle}> 緊急連絡先</Text>
                  </View>
                  <View style={styles.emergencyContactBox}>
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>介助者</Text>
                      <Text style={styles.emergencyContactName}>{emergencyCardData.caregiverName}（{emergencyCardData.caregiverRelation}）</Text>
                      <Text style={styles.emergencyContactPhone}>{emergencyCardData.caregiverPhone}</Text>
                      {emergencyCardData.caregiverEmail && (
                        <Text style={styles.emergencyContactPhone}>{emergencyCardData.caregiverEmail}</Text>
                      )}
                      {emergencyCardData.caregiverAddress && (
                        <Text style={styles.emergencyContactPhone}>{emergencyCardData.caregiverAddress}</Text>
                      )}
                    </View>
                    <View style={styles.emergencyContactDivider} />
                    <View style={styles.emergencyContactItem}>
                      <Text style={styles.emergencyContactLabel}>かかりつけ病院</Text>
                      <Text style={styles.emergencyContactName}>{emergencyCardData.hospitalName}</Text>
                      <Text style={styles.emergencyContactPhone}>{emergencyCardData.hospitalPhone}</Text>
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
                <MaterialIcons name="group" size={24} color="#FF6B6B" />
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
                      <View style={styles.caregiverContactRow}>
                        <MaterialIcons name="phone" size={14} color="#666666" />
                        <Text style={styles.caregiverPhone}> {caregiver.phone}</Text>
                      </View>
                      {caregiver.email && (
                        <View style={styles.caregiverContactRow}>
                          <MaterialIcons name="email" size={14} color="#666666" />
                          <Text style={styles.caregiverEmail}> {caregiver.email}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity style={styles.callButton}>
                    <MaterialIcons name="phone" size={16} color="#FFFFFF" />
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
        onClose={closeHealthModal}
        data={healthCardData}
        onSave={handleHealthCardSave}
      />

      {/* Edit Emergency Card Modal */}
      <EditEmergencyCardModal
        visible={isEmergencyModalVisible}
        onClose={closeEmergencyModal}
        data={emergencyCardData}
        onSave={handleEmergencyCardSave}
        userName={userData.name}
      />
    </>
  );
}

