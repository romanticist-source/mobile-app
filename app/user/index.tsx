import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, DimensionValue } from 'react-native';
import { Stack } from 'expo-router';
import { AppHeader } from '@/components/layouts/AppHeader/AppHeader';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { useHealthKitData, formatVitalDataForSection } from '@/hooks/useHealthKitData';
import { styles } from './styles';

export default function UserHomeScreen() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { data, isLoading, error, refresh, isAvailable } = useHealthKitData({
    autoFetch: true,
    refreshInterval: 60000, // 1分ごとに更新
  });

  const healthKitVitals = formatVitalDataForSection(data);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          <AppHeader />

          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>田中</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>田中 太郎さん</Text>
                <Text style={styles.profileStatus}>状態: 良好</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsButtonText}>設定</Text>
            </TouchableOpacity>
          </View>

          {/* Help Request Button */}
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => setShowHelpModal(true)}
          >
            <View style={styles.helpButtonContent}>
              <View style={styles.helpIcon}>
                <Text style={styles.helpIconText}>⚠</Text>
              </View>
              <Text style={styles.helpButtonText}>ヘルプ要請</Text>
            </View>
          </TouchableOpacity>

          {/* Vital Data Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>バイタルデータ</Text>
              {isAvailable && (
                <TouchableOpacity onPress={refresh} style={styles.refreshButton}>
                  <Text style={styles.refreshButtonText}>更新</Text>
                </TouchableOpacity>
              )}
            </View>

            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4DABF7" />
                <Text style={styles.loadingText}>データを読み込み中...</Text>
              </View>
            )}

            {error && !isLoading && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.vitalGrid}>
              {/* HealthKitからのデータ */}
              {healthKitVitals.map((vital, index) => (
                <View key={index} style={styles.vitalCard}>
                  <View style={styles.vitalHeader}>
                    <Text style={styles.vitalIcon}>{vital.icon}</Text>
                    <Text style={styles.vitalLabel}>{vital.label}</Text>
                  </View>
                  <Text style={styles.vitalValue}>
                    {vital.value} <Text style={styles.vitalUnit}>{vital.unit}</Text>
                  </Text>
                  <View style={[styles.vitalBar, { backgroundColor: vital.barColor }]}>
                    <View
                      style={[
                        styles.vitalBarFill,
                        {
                          width: vital.fillPercentage as DimensionValue,
                          backgroundColor: vital.barFillColor
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.vitalStatus}>{vital.status}</Text>
                </View>
              ))}

              {/* HealthKitデータがない場合のフォールバック */}
              {healthKitVitals.length === 0 && !isLoading && (
                <>
                  {/* Heart Rate - フォールバック */}
                  <View style={styles.vitalCard}>
                    <View style={styles.vitalHeader}>
                      <Text style={styles.vitalIcon}>❤️</Text>
                      <Text style={styles.vitalLabel}>心拍数</Text>
                    </View>
                    <Text style={styles.vitalValue}>-- <Text style={styles.vitalUnit}>bpm</Text></Text>
                    <View style={[styles.vitalBar, { backgroundColor: '#FFE5E5' }]}>
                      <View style={[styles.vitalBarFill, { width: '0%', backgroundColor: '#FF6B6B' }]} />
                    </View>
                    <Text style={styles.vitalStatus}>データなし</Text>
                  </View>

                  {/* Steps - フォールバック */}
                  <View style={styles.vitalCard}>
                    <View style={styles.vitalHeader}>
                      <Text style={styles.vitalIcon}>🚶</Text>
                      <Text style={styles.vitalLabel}>歩数</Text>
                    </View>
                    <Text style={styles.vitalValue}>-- <Text style={styles.vitalUnit}>歩</Text></Text>
                    <View style={[styles.vitalBar, { backgroundColor: '#E0F0FF' }]}>
                      <View style={[styles.vitalBarFill, { width: '0%', backgroundColor: '#4DABF7' }]} />
                    </View>
                    <Text style={styles.vitalStatus}>データなし</Text>
                  </View>

                  {/* Activity Level - フォールバック */}
                  <View style={styles.vitalCard}>
                    <View style={styles.vitalHeader}>
                      <Text style={styles.vitalIcon}>🔥</Text>
                      <Text style={styles.vitalLabel}>アクティブカロリー</Text>
                    </View>
                    <Text style={styles.vitalValue}>-- <Text style={styles.vitalUnit}>kcal</Text></Text>
                    <View style={[styles.vitalBar, { backgroundColor: '#FFF3E0' }]}>
                      <View style={[styles.vitalBarFill, { width: '0%', backgroundColor: '#FF9800' }]} />
                    </View>
                    <Text style={styles.vitalStatus}>データなし</Text>
                  </View>

                  {/* Oxygen - フォールバック */}
                  <View style={styles.vitalCard}>
                    <View style={styles.vitalHeader}>
                      <Text style={styles.vitalIcon}>💨</Text>
                      <Text style={styles.vitalLabel}>血中酸素濃度</Text>
                    </View>
                    <Text style={styles.vitalValue}>-- <Text style={styles.vitalUnit}>%</Text></Text>
                    <View style={[styles.vitalBar, { backgroundColor: '#E8F5E9' }]}>
                      <View style={[styles.vitalBarFill, { width: '0%', backgroundColor: '#4CAF50' }]} />
                    </View>
                    <Text style={styles.vitalStatus}>データなし</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Recent Activity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>最近の活動</Text>
            <View style={styles.activityList}>
              {/* Activity items would go here */}
            </View>
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />

        {/* Help Request Modal */}
        <HelpRequestModal
          visible={showHelpModal}
          onClose={() => setShowHelpModal(false)}
        />
      </View>
    </>
  );
}

// Help Request Modal Component
interface HelpRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

function HelpRequestModal({ visible, onClose }: HelpRequestModalProps) {
  const [includeLocation, setIncludeLocation] = useState(true);

  const handleSendHelp = () => {
    console.log('Send help request with location:', includeLocation);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <View style={styles.modalWarningIcon}>
                <Text style={styles.modalWarningIconText}>!</Text>
              </View>
              <Text style={styles.modalTitle}>ヘルプ要請の確認</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* Description */}
            <Text style={styles.modalDescription}>
              以下の情報を登録済み介助者と緊急連絡先に送信します
            </Text>

            {/* Recipients Section */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>送信先</Text>
              <View style={styles.recipientsList}>
                <View style={styles.recipientItem}>
                  <View style={[styles.recipientAvatar, { backgroundColor: '#FFE5E5' }]}>
                    <Text style={[styles.recipientAvatarText, { color: '#FF6B6B' }]}>山</Text>
                  </View>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>山田花子</Text>
                    <Text style={styles.recipientRelation}>娘</Text>
                  </View>
                </View>
                <View style={styles.recipientItem}>
                  <View style={[styles.recipientAvatar, { backgroundColor: '#FFE5E5' }]}>
                    <Text style={[styles.recipientAvatarText, { color: '#FF6B6B' }]}>佐</Text>
                  </View>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>佐藤健太</Text>
                    <Text style={styles.recipientRelation}>息子</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Information Section */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>送信される情報</Text>
              <View style={styles.infoList}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>現在のバイタルデータ</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>体調カード情報</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>緊急連絡先</Text>
                </View>
              </View>
            </View>

            {/* Location Section */}
            <TouchableOpacity
              style={styles.locationOption}
              onPress={() => setIncludeLocation(!includeLocation)}
            >
              <View style={styles.locationIconContainer}>
                <Text style={styles.locationIcon}>📍</Text>
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>位置情報を含めて送信</Text>
                <Text style={styles.locationSubtitle}>現在地: 自宅</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  includeLocation && styles.checkboxChecked
                ]}>
                  {includeLocation && (
                    <Text style={styles.checkboxIcon}>✓</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Modal Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendHelpButton}
              onPress={handleSendHelp}
            >
              <View style={styles.sendHelpButtonContent}>
                <Text style={styles.sendHelpIcon}>⚠</Text>
                <Text style={styles.sendHelpButtonText}>ヘルプを送信</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
