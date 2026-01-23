import type { AlertHistory, UserAlertHistory } from "@/_schema/alert";
import type { User } from "@/_schema/user";
import {
  getAlertsByUserId,
  getUserAlertHistory,
  markAlertAsCheckedByUser,
} from "@/api/alerts";
import { getUserFatigueByUserId } from "@/api/user-fatigue";
import { getUserSchedulesByUserId } from "@/api/user-schedules";
import { getUserById } from "@/api/users";
import { NotificationCard } from "@/components/features/notifications/NotificationCard/NotificationCard";
import { BottomNavigation } from "@/components/layouts/BottomNavigation/BottomNavigation";
import { UserHomeLayout } from "@/components/layouts/UserHomeLayout/UserHomeLayout";
import { useHelperUserConnection } from "@/hooks/useHelperUserConnection";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { logout } from "@/api/auth";

export default function HelperHomeScreen() {
  const router = useRouter();
  const { userId, loading: connectionLoading } = useHelperUserConnection();

  const [urgentNotifications, setUrgentNotifications] = useState<
    AlertHistory[]
  >([]);
  const [todayScheduleCount, setTodayScheduleCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedAlertIds, setCheckedAlertIds] = useState<Set<string>>(
    new Set(),
  );
  const [fatigueLevel, setFatigueLevel] = useState<number | null>(null);
  const [fatigueLoading, setFatigueLoading] = useState(false);

  const getFatigueColors = (level: number) => {
    if (level < 30) {
      return {
        bg: "#E8F5E9",
        border: "#4CAF50",
        text: "#4CAF50",
        status: "良好",
      };
    } else if (level < 60) {
      return {
        bg: "#FFF8E1",
        border: "#FFA726",
        text: "#FFA726",
        status: "注意",
      };
    } else {
      return {
        bg: "#FFEBEE",
        border: "#EF5350",
        text: "#EF5350",
        status: "警告",
      };
    }
  };

  const fatigueColors = getFatigueColors(fatigueLevel ?? 0);

  const fetchData = async () => {
    if (!userId || connectionLoading) return;

    setLoading(true);
    setFatigueLoading(true);
    try {
      // Fetch user data
      const userData = await getUserById(userId);
      setUser(userData);

      // Fetch fatigue from DB
      try {
        const fatigueRecords = await getUserFatigueByUserId(userId);
        if (fatigueRecords.length > 0) {
          // Get the most recent fatigue record
          const latestFatigue = fatigueRecords.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0];
          setFatigueLevel(latestFatigue.fatigueLevel);
        } else {
          setFatigueLevel(null);
        }
      } catch (err) {
        console.error("Failed to fetch fatigue:", err);
        setFatigueLevel(null);
      } finally {
        setFatigueLoading(false);
      }

      // Fetch alerts
      const alerts = await getAlertsByUserId(userId);

      // Fetch alert history to determine read status
      let checkedIds = new Set<string>();
      try {
        const history = await getUserAlertHistory(userId);
        checkedIds = new Set(
          history
            .filter((h: UserAlertHistory) => h.isChecked)
            .map((h: UserAlertHistory) => h.alertId),
        );
        setCheckedAlertIds(checkedIds);
      } catch (err) {
        console.error("Failed to fetch alert history:", err);
      }

      // Filter urgent unread notifications (importance >= 2 and not checked)
      const urgent = alerts
        .filter((alert) => alert.importance >= 2 && !checkedIds.has(alert.id))
        .slice(0, 5); // Show max 5
      setUrgentNotifications(urgent);

      // Fetch today's schedules
      const schedules = await getUserSchedulesByUserId(userId);
      const today = new Date().toISOString().split("T")[0];
      const todaySchedules = schedules.filter((schedule) =>
        schedule.startAt?.startsWith(today),
      );
      setTodayScheduleCount(todaySchedules.length);
    } catch (error) {
      console.error("Failed to fetch helper home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, connectionLoading]);

  const isRead = (alertId: string): boolean => {
    return checkedAlertIds.has(alertId);
  };

  const handleMarkAsRead = async (alertId: string) => {
    if (!userId) return;
    try {
      await markAlertAsCheckedByUser(alertId, userId);
      // Update local state
      setCheckedAlertIds((prev) => new Set(prev).add(alertId));
      // Refresh data to update the list
      await fetchData();
    } catch (error) {
      console.error("Failed to mark alert as read:", error);
    }
  };

  const handleNotificationPress = async (alert: AlertHistory) => {
    router.push("/helper/notifications");
  };

  const unreadHighCount = urgentNotifications.filter(
    (n) => n.importance === 3,
  ).length;
  const unreadMediumCount = urgentNotifications.filter(
    (n) => n.importance === 2,
  ).length;

  // Show "not connected" view when no user is connected
  if (!connectionLoading && !userId) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <UserHomeLayout>
            <View style={styles.pageHeader}>
              <Text style={styles.pageTitle}>ホーム</Text>
              <TouchableOpacity
                style={styles.switchViewButton}
                onPress={() => router.push("/user")}
              >
                <Text style={styles.switchViewButtonText}>
                  ユーザービューに切替
                </Text>
              </TouchableOpacity>
            </View>

            {/* Not Connected Card */}
            <View
              style={[
                styles.userOverviewCard,
                { alignItems: "center", paddingVertical: 40 },
              ]}
            >
              <MaterialIcons name="person-off" size={64} color="#CCCCCC" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#333",
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                ユーザーと連携していません
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#666",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                ユーザーと連携することで、{"\n"}健康状態や予定を確認できます
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF6B6B",
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
                onPress={() => router.push("/helper/requests")}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
                >
                  連携設定へ
                </Text>
              </TouchableOpacity>
            </View>
          </UserHomeLayout>
          <BottomNavigation activeTab="home" />
        </View>
      </>
    );
  }

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
              onPress={() => router.push("/user")}
            >
              <Text style={styles.switchViewButtonText}>
                ユーザービューに切替
              </Text>
            </TouchableOpacity>
          </View>

          {/* User Overview Card */}
          <View style={styles.userOverviewCard}>
            <View style={styles.userInfoSection}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{user?.name?.[0] || "?"}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {user?.name || "読み込み中..."}さん
                </Text>
              </View>
            </View>

            <View style={styles.quickStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {urgentNotifications.length}
                </Text>
                <Text style={styles.statLabel}>要対応</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{todayScheduleCount}</Text>
                <Text style={styles.statLabel}>本日予定</Text>
              </View>
            </View>
          </View>

          {/* Fatigue Level Card */}
          <View
            style={[
              styles.fatigueCard,
              {
                borderLeftColor: fatigueColors.border,
              },
            ]}
          >
            <View style={styles.fatigueHeader}>
              <Text style={styles.fatigueTitle}>疲労度</Text>
              {fatigueLoading ? (
                <ActivityIndicator size="small" color="#FF6B6B" />
              ) : fatigueLevel !== null ? (
                <Text
                  style={[
                    styles.fatigueStatusText,
                    { color: fatigueColors.text },
                  ]}
                >
                  {fatigueColors.status}
                </Text>
              ) : (
                <Text style={[styles.fatigueStatusText, { color: "#999" }]}>
                  データなし
                </Text>
              )}
            </View>
            <View style={styles.fatigueBody}>
              {fatigueLoading ? (
                <Text style={[styles.fatigueValue, { color: "#CCCCCC" }]}>
                  ---%
                </Text>
              ) : fatigueLevel !== null ? (
                <Text
                  style={[styles.fatigueValue, { color: fatigueColors.text }]}
                >
                  {fatigueLevel}%
                </Text>
              ) : (
                <Text style={[styles.fatigueValue, { color: "#CCCCCC" }]}>
                  ---%
                </Text>
              )}
            </View>
            <View style={styles.fatigueProgressContainer}>
              <View style={styles.fatigueProgressBg}>
                <View
                  style={[
                    styles.fatigueProgressBar,
                    {
                      width: fatigueLevel !== null ? `${fatigueLevel}%` : "0%",
                      backgroundColor: fatigueColors.text,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Notification Alert Count */}
          {urgentNotifications.length > 0 && (
            <View style={styles.alertSummaryCard}>
              <View style={styles.alertSummaryHeader}>
                <MaterialIcons
                  name="notifications-active"
                  size={20}
                  color="#FF6B6B"
                />
                <Text style={styles.alertSummaryTitle}>
                  未対応の通知があります
                </Text>
              </View>
              <View style={styles.alertCounts}>
                {unreadHighCount > 0 && (
                  <View
                    style={[
                      styles.alertCountItem,
                      { backgroundColor: "#FFEBEE" },
                    ]}
                  >
                    <Text
                      style={[styles.alertCountNumber, { color: "#FF6B6B" }]}
                    >
                      {unreadHighCount}
                    </Text>
                    <Text
                      style={[styles.alertCountLabel, { color: "#FF6B6B" }]}
                    >
                      緊急
                    </Text>
                  </View>
                )}
                {unreadMediumCount > 0 && (
                  <View
                    style={[
                      styles.alertCountItem,
                      { backgroundColor: "#FCE4EC" },
                    ]}
                  >
                    <Text
                      style={[styles.alertCountNumber, { color: "#FF9ECD" }]}
                    >
                      {unreadMediumCount}
                    </Text>
                    <Text
                      style={[styles.alertCountLabel, { color: "#FF9ECD" }]}
                    >
                      重要
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Important Notifications List */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>重要な通知</Text>
              <TouchableOpacity
                onPress={() => router.push("/helper/notifications")}
              >
                <Text style={styles.sectionLink}>すべて見る</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>読み込み中...</Text>
              </View>
            ) : urgentNotifications.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons name="check-circle" size={48} color="#20C9A6" />
                <Text style={styles.emptyStateTitle}>すべて対応済みです</Text>
                <Text style={styles.emptyStateText}>
                  重要な通知はありません
                </Text>
              </View>
            ) : (
              <View style={styles.notificationsList}>
                {urgentNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    alert={notification}
                    onPress={() => handleNotificationPress(notification)}
                    isRead={isRead(notification.id)}
                    onMarkAsRead={() => handleMarkAsRead(notification.id)}
                  />
                ))}
              </View>
            )}
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />
      </View>
    </>
  );
}

function getFatigueStatus(level: number): string {
  if (level < 30) return "良好";
  if (level < 60) return "注意";
  return "警告";
}
