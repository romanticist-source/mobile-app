import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { styles } from './styles';

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
