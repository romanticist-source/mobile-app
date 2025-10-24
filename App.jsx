import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Button, View, Alert } from "react-native";
import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
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
  }

  const scheduleNotification = async () => {
    // 通知バーに出るローカル通知
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "リマインダー通知",
        body: "1分経ちました⏰",
      },
      trigger: { seconds: 60 },
    });

    // 1分後にアラートを表示
    setTimeout(() => {
      Alert.alert("リマインダー", "1分経ちました⏰");
    }, 60000); // 60秒後
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="1分後に通知 & アラート" onPress={scheduleNotification} />
    </View>
  );
}
