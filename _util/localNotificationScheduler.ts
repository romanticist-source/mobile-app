/**
 * Local Notification Scheduler
 * Handles scheduling and managing local push notifications
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { createToiletNotification } from './notificationHelper';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 * Must be called before scheduling notifications
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Notification permission not granted');
    return false;
  }

  // Android specific channel setup
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF6B6B',
    });
  }

  return true;
}

/**
 * Schedule repeating toilet timing notifications
 * @param intervalHours - Interval in hours (e.g., 4 for every 4 hours)
 * @param userId - User ID for creating notification history
 */
export async function scheduleToiletNotifications(
  intervalHours: number,
  userId: string
): Promise<string> {
  // Cancel all existing toilet notifications
  await cancelToiletNotifications();

  // Schedule repeating notification
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'トイレのお時間です 🚽',
      body: 'トイレタイミングの時間になりました',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: {
        type: 'toilet',
        userId,
      },
    },
    trigger: {
      seconds: intervalHours * 3600, // Convert hours to seconds
      repeats: true,
    },
  });

  console.log(`✅ Toilet notifications scheduled (ID: ${notificationId}, interval: ${intervalHours}h)`);
  return notificationId;
}

/**
 * Cancel all toilet timing notifications
 */
export async function cancelToiletNotifications(): Promise<void> {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

  // Filter toilet notifications
  const toiletNotificationIds = scheduledNotifications
    .filter((notification) => notification.content.data?.type === 'toilet')
    .map((notification) => notification.identifier);

  // Cancel each toilet notification
  for (const id of toiletNotificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  console.log(`✅ Cancelled ${toiletNotificationIds.length} toilet notifications`);
}

/**
 * Get all scheduled toilet notifications
 */
export async function getScheduledToiletNotifications(): Promise<Notifications.NotificationRequest[]> {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  return scheduledNotifications.filter(
    (notification) => notification.content.data?.type === 'toilet'
  );
}

/**
 * Setup notification listener to save to database when notification is received
 * Call this in your app's root component (e.g., _layout.tsx)
 */
export function setupNotificationListener(onNotificationReceived?: (notification: Notifications.Notification) => void) {
  // Listen for notifications received while app is foregrounded
  const foregroundSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
    console.log('📬 Notification received:', notification);

    const { type, userId } = notification.request.content.data || {};

    // Save toilet notification to database
    if (type === 'toilet' && userId) {
      try {
        await createToiletNotification(userId as string);
        console.log('✅ Toilet notification saved to database');
      } catch (error) {
        console.error('❌ Failed to save notification to database:', error);
      }
    }

    // Custom callback
    if (onNotificationReceived) {
      onNotificationReceived(notification);
    }
  });

  // Listen for user tapping on notification
  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('👆 Notification tapped:', response);
    // You can navigate to specific screen here if needed
  });

  // Return cleanup function
  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}

/**
 * Schedule a test notification (fires after 10 seconds)
 * Useful for testing notification setup
 */
export async function scheduleTestNotification(): Promise<string> {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'テスト通知 🔔',
      body: '通知システムが正常に動作しています',
      sound: true,
      data: { type: 'test' },
    },
    trigger: {
      seconds: 10,
    },
  });

  console.log(`✅ Test notification scheduled (fires in 10 seconds)`);
  return notificationId;
}
