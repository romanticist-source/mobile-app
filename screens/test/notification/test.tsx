import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import * as Device from "expo-device";
import { Link } from "expo-router"; // ページ遷移用

export default function NotificationTest() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("通知の権限がありません。");
    }
  }

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "リマインダー通知",
        body: "1分経ちました⏰",
      },
      trigger: { type: SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 60 },
    });

    setTimeout(() => {
      Alert.alert("リマインダー", "1分経ちました⏰");
    }, 60000);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="1分後に通知 & アラート" onPress={scheduleNotification} />

      {/* トップページへのリンク */}
      <Link href="/" style={{ marginTop: 20 }}>
        トップページに戻る
      </Link>
    </View>
  );
}
