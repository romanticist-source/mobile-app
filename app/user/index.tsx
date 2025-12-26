import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation/BottomNavigation';
import { styles } from './styles';

export default function UserHomeScreen() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();

  // Mock data - 将来的にはAPIから取得
  const fatigueLevel = 45; // 疲労度 (0-100)
  const fatigueStatus = '注意'; // 良好 | 注意 | 警告

  const urgentNotifications = [
    {
      id: '1',
      title: '水分補給の時間です',
      description: '前回の水分補給から2時間が経過しました',
      time: '5分前',
      color: '#FFA726',
    },
    {
      id: '2',
      title: '休憩のおすすめ',
      description: '疲労度が上昇しています。15分程度の休憩をお勧めします',
      time: '15分前',
      color: '#42A5F5',
    },
  ];

  const recentActivities = [
    '午前の散歩を完了しました',
    '水分補給リマインダー',
    '朝のバイタル測定完了',
  ];

  // 疲労度に応じた背景色とボーダー色を取得
  const getFatigueColors = (level: number) => {
    if (level < 30) {
      return { bg: '#E8F5E9', border: '#4CAF50', progress: '#4CAF50' }; // 緑系
    } else if (level < 60) {
      return { bg: '#FFF8E1', border: '#FFA726', progress: '#FFA726' }; // 黄色/オレンジ系
    } else {
      return { bg: '#FFEBEE', border: '#EF5350', progress: '#EF5350' }; // 赤系
    }
  };

  const fatigueColors = getFatigueColors(fatigueLevel);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>ホーム</Text>
            <TouchableOpacity
              style={styles.switchViewButton}
              onPress={() => router.push('/helper')}
            >
              <Text style={styles.switchViewButtonText}>介助者ビューに切替</Text>
            </TouchableOpacity>
          </View>

          {/* User Profile Card - Compact */}
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
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push('/user/settings')}
            >
              <Text style={styles.settingsButtonText}>設定</Text>
            </TouchableOpacity>
          </View>

          {/* Help Request Button */}
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => setShowHelpModal(true)}
          >
            <MaterialIcons name="error-outline" size={24} color="#FFFFFF" />
            <Text style={styles.helpButtonText}>ヘルプ要請</Text>
          </TouchableOpacity>

          {/* Fatigue Level Card */}
          <View style={[styles.fatigueCard, { backgroundColor: fatigueColors.bg, borderColor: fatigueColors.border }]}>
            <View style={styles.fatigueHeader}>
              <View style={styles.fatigueTitle}>
                <MaterialIcons name="show-chart" size={20} color="#333333" />
                <Text style={styles.fatigueTitleText}>現在の疲労度</Text>
              </View>
              <View style={styles.fatigueStatusBadge}>
                <Text style={styles.fatigueStatusText}>{fatigueStatus}</Text>
              </View>
            </View>

            <View style={styles.fatigueContent}>
              <Text style={styles.fatigueValue}>{fatigueLevel}</Text>
              <Text style={styles.fatigueUnit}>%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.fatigueProgressContainer}>
              <View style={[styles.fatigueProgressBar, { backgroundColor: fatigueColors.progress, width: `${fatigueLevel}%` }]} />
            </View>

            <Text style={styles.fatigueDescription}>
              センサーから取得した疲労度データです。休憩が必要な場合はお知らせします。
            </Text>
          </View>

          {/* Urgent Notifications Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="notifications-active" size={20} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>要対応</Text>
            </View>

            <View style={styles.urgentNotificationsList}>
              {urgentNotifications.map((notification) => (
                <View key={notification.id} style={styles.urgentNotificationItem}>
                  <View style={[styles.urgentNotificationIndicator, { backgroundColor: notification.color }]} />
                  <View style={styles.urgentNotificationContent}>
                    <View style={styles.urgentNotificationTop}>
                      <Text style={styles.urgentNotificationTitle}>{notification.title}</Text>
                      <View style={styles.urgentNotificationTime}>
                        <MaterialIcons name="access-time" size={14} color="#999999" />
                        <Text style={styles.urgentNotificationTimeText}>{notification.time}</Text>
                      </View>
                    </View>
                    <Text style={styles.urgentNotificationDescription}>{notification.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Activity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>最近の活動</Text>
            <View style={styles.activityList}>
              {recentActivities.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityBullet} />
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
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
                <MaterialIcons name="location-on" size={24} color="#FF6B6B" />
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
