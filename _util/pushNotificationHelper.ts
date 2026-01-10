/**
 * Push Notification Helper
 * ローカルプッシュ通知を送信するヘルパー関数
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 通知の表示方法を設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * 通知権限をリクエスト
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * ローカルプッシュ通知を送信
 */
export async function sendLocalPushNotification(
  title: string,
  body: string,
  data?: Record<string, any>
): Promise<void> {
  try {
    const hasPermission = await requestNotificationPermissions();

    if (!hasPermission) {
      console.warn('[PushNotification] Permission not granted');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: true,
      },
      trigger: null, // 即座に送信
    });

    console.log('[PushNotification] Notification sent:', title);
  } catch (error) {
    console.error('[PushNotification] Failed to send notification:', error);
  }
}

/**
 * 疲労度アラートのプッシュ通知を送信
 */
export async function sendFatigueAlertPush(
  fatigueLevel: number,
  hp: number
): Promise<void> {
  const title = '疲労度アラート';
  const body =
    fatigueLevel >= 80
      ? `疲労度が非常に高くなっています（${fatigueLevel}%）。休憩をおすすめします。`
      : `疲労度が上昇しています（${fatigueLevel}%）。体力残量: ${hp}%`;

  await sendLocalPushNotification(title, body, {
    type: 'fatigue_alert',
    fatigueLevel,
    hp,
  });
}
