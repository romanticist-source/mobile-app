import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation';

export default function UserHomeScreen() {
  const [showHelpModal, setShowHelpModal] = useState(false);

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
            <Text style={styles.sectionTitle}>バイタルデータ</Text>
            <View style={styles.vitalGrid}>
              {/* Heart Rate */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>❤️</Text>
                  <Text style={styles.vitalLabel}>心拍数</Text>
                </View>
                <Text style={styles.vitalValue}>72 <Text style={styles.vitalUnit}>bpm</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#FFE5E5' }]}>
                  <View style={[styles.vitalBarFill, { width: '70%', backgroundColor: '#FF6B6B' }]} />
                </View>
                <Text style={styles.vitalStatus}>正常</Text>
              </View>

              {/* Health Index */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>📈</Text>
                  <Text style={styles.vitalLabel}>健康指標</Text>
                </View>
                <Text style={styles.vitalValue}>85 <Text style={styles.vitalUnit}>%</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#E0F7F7' }]}>
                  <View style={[styles.vitalBarFill, { width: '85%', backgroundColor: '#20C9A6' }]} />
                </View>
                <Text style={styles.vitalStatus}>良好</Text>
              </View>

              {/* Activity Level */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>⚡</Text>
                  <Text style={styles.vitalLabel}>活動レベル</Text>
                </View>
                <Text style={styles.vitalValue}>320 <Text style={styles.vitalUnit}>kcal</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#F0E6FF' }]}>
                  <View style={[styles.vitalBarFill, { width: '60%', backgroundColor: '#9B6CFF' }]} />
                </View>
                <Text style={styles.vitalStatus}>中程度</Text>
              </View>

              {/* Water Intake */}
              <View style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Text style={styles.vitalIcon}>💧</Text>
                  <Text style={styles.vitalLabel}>水分補給</Text>
                </View>
                <Text style={styles.vitalValue}>1.2 <Text style={styles.vitalUnit}>L</Text></Text>
                <View style={[styles.vitalBar, { backgroundColor: '#E3F2FD' }]}>
                  <View style={[styles.vitalBarFill, { width: '60%', backgroundColor: '#2196F3' }]} />
                </View>
                <Text style={styles.vitalStatus}>目標の60%</Text>
              </View>
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
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileStatus: {
    fontSize: 13,
    color: '#666666',
  },
  settingsButton: {
    backgroundColor: '#D4F4E7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  settingsButtonText: {
    fontSize: 14,
    color: '#20C9A6',
    fontWeight: '600',
  },
  helpButton: {
    backgroundColor: '#C84F2A',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  helpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  helpIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIconText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  helpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  vitalIcon: {
    fontSize: 16,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#666666',
  },
  vitalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  vitalUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999999',
  },
  vitalBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  vitalBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  vitalStatus: {
    fontSize: 12,
    color: '#666666',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalWarningIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalWarningIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseIcon: {
    fontSize: 24,
    color: '#999999',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  recipientsList: {
    gap: 12,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 12,
  },
  recipientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipientAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipientInfo: {
    marginLeft: 12,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  recipientRelation: {
    fontSize: 13,
    color: '#666666',
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoBullet: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333333',
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    fontSize: 20,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  checkboxContainer: {
    marginLeft: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  checkboxIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  sendHelpButton: {
    flex: 1,
    backgroundColor: '#C84F2A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendHelpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sendHelpIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendHelpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
