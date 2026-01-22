import { BottomNavigation } from "@/components/layouts/BottomNavigation/BottomNavigation";
import { UserHomeLayout } from "@/components/layouts/UserHomeLayout/UserHomeLayout";
import { VitalCard } from "@/components/features/vitals/VitalCard/VitalCard";

import { useFatigue } from "@/hooks/useFatigue";
import { useWatchData } from "@/hooks/useWatchData";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { getAlertsByUserId, getUserAlertHistory } from "@/api/alerts";
import { getConnections } from "@/api/helper-connect";
import { getHelperById } from "@/api/helpers";
import { createEmergencyHelpRequest } from "@/_util/notificationHelper";
import { makePhoneCall } from "@/_util/phoneHelper";
import type { AlertHistory, UserAlertHistory, HelperConnectWithDetails, Helper } from "@/_schema";
import { styles } from "./styles";

export default function UserHomeScreen() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [urgentNotifications, setUrgentNotifications] = useState<AlertHistory[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // useFatigueフックで疲労度を計算（METs基準）
  const { hp, fatigueLevel, steps, currentMETs, caloriesBurned, isAvailable, error } = useFatigue();

  // Watch連携でバイタルデータを取得（iOS/Android自動切り替え）
  const { vitalData, isLoading: isLoadingWatch } = useWatchData();

  // 疲労度に応じたステータス
  const getFatigueStatus = (level: number) => {
    if (level < 30) return "良好";
    if (level < 60) return "注意";
    return "警告";
  };

  const fatigueStatus = getFatigueStatus(fatigueLevel);

  // Load urgent notifications from API
  useEffect(() => {
    if (!user?.id) return;

    const loadAlerts = async () => {
      try {
        setIsLoadingAlerts(true);

        // Fetch all alerts
        const alerts = await getAlertsByUserId(user.id);

        // Fetch alert history to determine read status
        let checkedIds = new Set<string>();
        try {
          const history = await getUserAlertHistory(user.id);
          checkedIds = new Set(
            history
              .filter((h: UserAlertHistory) => h.isChecked)
              .map((h: UserAlertHistory) => h.alertId)
          );
        } catch (err) {
          console.error('[UserHome] Failed to fetch alert history:', err);
        }

        // Filter unread alerts with importance >= 4
        const urgent = alerts
          .filter((alert) => !checkedIds.has(alert.id) && alert.importance >= 4)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setUrgentNotifications(urgent);
      } catch (error) {
        console.error('[UserHome] Failed to load alerts:', error);
      } finally {
        setIsLoadingAlerts(false);
      }
    };

    loadAlerts();
  }, [user?.id]);

  // 疲労度に応じた背景色とボーダー色を取得
  const getFatigueColors = (level: number) => {
    if (level < 30) {
      return { bg: "#E8F5E9", border: "#4CAF50", progress: "#4CAF50" }; // 緑系
    } else if (level < 60) {
      return { bg: "#FFF8E1", border: "#FFA726", progress: "#FFA726" }; // 黄色/オレンジ系
    } else {
      return { bg: "#FFEBEE", border: "#EF5350", progress: "#EF5350" }; // 赤系
    }
  };

  const fatigueColors = getFatigueColors(fatigueLevel);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout
          isWatchConnected={vitalData.isConnected}
        >
          {/* Page Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>ホーム</Text>
          </View>

          {/* User Profile Card - Compact */}
          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.slice(0, 2) : '未'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.name ? `${user.name}さん` : 'ユーザー'}
                </Text>
                <Text style={styles.profileStatus}>状態: {fatigueStatus}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push("/user/settings")}
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

          {/* Vital Data Grid */}
          <View style={styles.vitalGrid}>
            {/* Fatigue Level Card */}
            <VitalCard
              icon="show-chart"
              iconColor="#333333"
              title="疲労度"
              value={fatigueLevel}
              unit="%"
              subtext={isAvailable ? `体力: ${hp}%` : '計測中...'}
              backgroundColor={fatigueColors.bg}
              borderColor={fatigueColors.border}
              isLarge={true}
              progressBar={{
                percentage: fatigueLevel,
                color: fatigueColors.progress,
              }}
            />

            {/* Heart Rate Card */}
            <VitalCard
              icon="favorite"
              iconColor="#EF5350"
              title="心拍数"
              value={isLoadingWatch ? '...' : vitalData.heartRate ?? '-'}
              unit={vitalData.heartRate !== null ? 'bpm' : ''}
              subtext={
                vitalData.platform === 'web'
                  ? 'Web版では利用不可'
                  : vitalData.isConnected
                    ? 'Watch接続中'
                    : 'Watch未接続'
              }
              backgroundColor="#FFEBEE"
              borderColor="#EF5350"
              lastUpdated={vitalData.lastUpdated}
            />

            {/* Steps Card */}
            <VitalCard
              icon="directions-walk"
              iconColor="#42A5F5"
              title="歩数"
              value={isLoadingWatch ? '...' : vitalData.steps?.toLocaleString() ?? '-'}
              unit={vitalData.steps !== null ? '歩' : ''}
              subtext={
                vitalData.platform === 'web'
                  ? 'Web版では利用不可'
                  : vitalData.isConnected
                    ? '今日の歩数'
                    : 'Watch未接続'
              }
              backgroundColor="#E3F2FD"
              borderColor="#42A5F5"
              lastUpdated={vitalData.lastUpdated}
            />

            {/* HRV Card */}
            <VitalCard
              icon="timeline"
              iconColor="#FFA726"
              title="HRV"
              value={isLoadingWatch ? '...' : vitalData.hrv ?? '-'}
              unit={vitalData.hrv !== null ? 'ms' : ''}
              subtext={
                vitalData.platform === 'web'
                  ? 'Web版では利用不可'
                  : vitalData.isConnected
                    ? '心拍変動'
                    : 'Watch未接続'
              }
              backgroundColor="#FFF3E0"
              borderColor="#FFA726"
              lastUpdated={vitalData.lastUpdated}
            />

            {/* SpO2 Card */}
            <VitalCard
              icon="air"
              iconColor="#4CAF50"
              title="SpO2"
              value={isLoadingWatch ? '...' : vitalData.spo2 ?? '-'}
              unit={vitalData.spo2 !== null ? '%' : ''}
              subtext={
                vitalData.platform === 'web'
                  ? 'Web版では利用不可'
                  : vitalData.isConnected
                    ? '血中酸素濃度'
                    : 'Watch未接続'
              }
              backgroundColor="#E8F5E9"
              borderColor="#4CAF50"
              lastUpdated={vitalData.lastUpdated}
            />
          </View>

          {/* Urgent Notifications Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="notifications-active"
                size={20}
                color="#FF6B6B"
              />
              <Text style={styles.sectionTitle}>要対応</Text>
            </View>

            {isLoadingAlerts ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#999999" />
              </View>
            ) : urgentNotifications.length === 0 ? (
              <View style={styles.emptyNotifications}>
                <Text style={styles.emptyNotificationsText}>
                  要対応の通知はありません
                </Text>
              </View>
            ) : (
              <View style={styles.urgentNotificationsList}>
                {urgentNotifications.map((notification) => {
                  const getNotificationColor = (importance: number) => {
                    if (importance >= 5) return "#EF5350"; // 危険
                    if (importance >= 4) return "#FFA726"; // 警告
                    return "#42A5F5"; // 通常
                  };

                  const formatTime = (dateString: string) => {
                    const now = new Date();
                    const alertTime = new Date(dateString);
                    const diffMs = now.getTime() - alertTime.getTime();
                    const diffMins = Math.floor(diffMs / 60000);

                    if (diffMins < 1) return "たった今";
                    if (diffMins < 60) return `${diffMins}分前`;
                    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}時間前`;
                    return `${Math.floor(diffMins / 1440)}日前`;
                  };

                  return (
                    <View
                      key={notification.id}
                      style={styles.urgentNotificationItem}
                    >
                      <View
                        style={[
                          styles.urgentNotificationIndicator,
                          { backgroundColor: getNotificationColor(notification.importance) },
                        ]}
                      />
                      <View style={styles.urgentNotificationContent}>
                        <View style={styles.urgentNotificationTop}>
                          <Text style={styles.urgentNotificationTitle}>
                            {notification.title}
                          </Text>
                          <View style={styles.urgentNotificationTime}>
                            <MaterialIcons
                              name="access-time"
                              size={14}
                              color="#999999"
                            />
                            <Text style={styles.urgentNotificationTimeText}>
                              {formatTime(notification.createdAt)}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.urgentNotificationDescription}>
                          {notification.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
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
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [helpSent, setHelpSent] = useState(false);
  const [connectedHelpers, setConnectedHelpers] = useState<HelperConnectWithDetails[]>([]);
  const [helpersWithDetails, setHelpersWithDetails] = useState<Helper[]>([]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!visible) {
      setHelpSent(false);
      setConnectedHelpers([]);
      setHelpersWithDetails([]);
    }
  }, [visible]);

  const handleSendHelp = async () => {
    if (!user?.id || !user?.name) {
      Alert.alert('エラー', 'ユーザー情報を取得できませんでした');
      return;
    }

    try {
      setIsSending(true);

      // Get all connected helpers
      const connections = await getConnections();

      if (connections.length === 0) {
        Alert.alert(
          '通知なし',
          '現在、登録されている介助者がいません。\n設定から介助者を登録してください。'
        );
        onClose();
        return;
      }

      // Create a single emergency alert for the user
      // This will be visible to all helpers connected to this user
      await createEmergencyHelpRequest(user.id, user.name);

      // Fetch full helper details (with phone numbers)
      const helperDetails = await Promise.all(
        connections.map((conn) => getHelperById(conn.helperId))
      );

      // Show success state with helper list
      setConnectedHelpers(connections);
      setHelpersWithDetails(helperDetails);
      setHelpSent(true);
    } catch (error) {
      console.error('[HelpRequest] Failed to send help request:', error);
      Alert.alert('エラー', 'ヘルプ要請の送信に失敗しました');
    } finally {
      setIsSending(false);
    }
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
              <Text style={styles.modalTitle}>
                {helpSent ? 'ヘルプ要請完了' : 'ヘルプ要請の確認'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          {!helpSent ? (
            <View style={styles.modalContent}>
              {/* Description */}
              <Text style={styles.modalDescription}>
                登録済み介助者と緊急連絡先にヘルプ要請を送信します
              </Text>

              {/* Information Section */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>送信される情報</Text>
                <View style={styles.infoList}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>現在の疲労度データ</Text>
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
            </View>
          ) : (
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalSuccessDescription}>
                {helpersWithDetails.length}人の介助者にヘルプ要請を送信しました
              </Text>

              {/* Helper List with Call Buttons */}
              <View style={styles.helperListContainer}>
                <Text style={styles.helperListTitle}>介助者一覧</Text>
                {helpersWithDetails.map((helper) => (
                  <View key={helper.id} style={styles.helperCard}>
                    <View style={styles.helperInfo}>
                      <Text style={styles.helperName}>{helper.name}</Text>
                      <Text style={styles.helperRelationship}>{helper.relationship}</Text>
                      <View style={styles.helperPhoneRow}>
                        <MaterialIcons name="phone" size={16} color="#666666" />
                        <Text style={styles.helperPhone}>{helper.phoneNumber}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.helperCallButton}
                      onPress={() => makePhoneCall(helper.phoneNumber, helper.name)}
                    >
                      <MaterialIcons name="phone" size={20} color="#FFFFFF" />
                      <Text style={styles.helperCallButtonText}>電話</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          {/* Modal Footer */}
          <View style={styles.modalFooter}>
            {!helpSent ? (
              <>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>キャンセル</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sendHelpButton, isSending && { opacity: 0.6 }]}
                  onPress={handleSendHelp}
                  disabled={isSending}
                >
                  {isSending ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <View style={styles.sendHelpButtonContent}>
                      <Text style={styles.sendHelpIcon}>⚠</Text>
                      <Text style={styles.sendHelpButtonText}>ヘルプを送信</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>閉じる</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
