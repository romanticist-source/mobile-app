/**
 * Notification Helper Utilities
 * Functions to create and manage notifications in the app
 */

import { createAlert } from '@/api/alerts';
import type { CreateAlertHistory } from '@/_schema/alert';
import { sendLocalPushNotification } from './pushNotificationHelper';

export type NotificationType =
  | 'medication'
  | 'appointment'
  | 'health'
  | 'toilet'
  | 'exercise'
  | 'emergency'
  | 'meal'
  | 'rest';

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  description: string;
  importance?: number; // 1-5, default 3
}

/**
 * Create a notification and add it to the user's notification list
 * This will make the notification appear in the notifications screen
 * AND send a push notification to the user
 */
export async function createNotification({
  userId,
  type,
  title,
  description,
  importance = 3,
}: CreateNotificationParams): Promise<void> {
  try {
    const alertData: CreateAlertHistory = {
      userId,
      title,
      description,
      importance,
      alertType: type,
    };

    // Create database alert
    await createAlert(alertData);

    // Send push notification
    await sendLocalPushNotification(title, description, {
      type,
      userId,
      importance,
    });

    console.log(`✅ Notification created with push: ${type} - ${title}`);
  } catch (error) {
    console.error('❌ Failed to create notification:', error);
    throw error;
  }
}

/**
 * Create a toilet timing notification
 */
export async function createToiletNotification(userId: string): Promise<void> {
  await createNotification({
    userId,
    type: 'toilet',
    title: 'トイレのお時間です',
    description: 'トイレタイミングの時間になりました',
    importance: 3,
  });
}

/**
 * Create a medication reminder notification
 */
export async function createMedicationNotification(
  userId: string,
  medicationName?: string
): Promise<void> {
  await createNotification({
    userId,
    type: 'medication',
    title: '服薬時間です',
    description: medicationName
      ? `${medicationName}の服用時間です`
      : '薬の服用時間です',
    importance: 4,
  });
}

/**
 * Create a health alert notification
 */
export async function createHealthAlert(
  userId: string,
  alertMessage: string,
  importance: number = 4
): Promise<void> {
  await createNotification({
    userId,
    type: 'health',
    title: '健康アラート',
    description: alertMessage,
    importance,
  });
}

/**
 * Create an appointment reminder notification
 */
export async function createAppointmentNotification(
  userId: string,
  appointmentTitle: string,
  appointmentTime?: string
): Promise<void> {
  await createNotification({
    userId,
    type: 'appointment',
    title: '予定のリマインダー',
    description: appointmentTime
      ? `${appointmentTime} - ${appointmentTitle}`
      : appointmentTitle,
    importance: 3,
  });
}

/**
 * Create a fatigue alert notification
 */
export async function createFatigueAlert(
  userId: string,
  fatigueLevel: number,
  hp: number
): Promise<void> {
  const importance = fatigueLevel >= 80 ? 5 : 4;
  const message =
    fatigueLevel >= 80
      ? `疲労度が非常に高くなっています（${fatigueLevel}%）。休憩をおすすめします。`
      : `疲労度が上昇しています（${fatigueLevel}%）。体力残量: ${hp}%`;

  await createNotification({
    userId,
    type: 'health',
    title: '疲労度アラート',
    description: message,
    importance,
  });
}

/**
 * Create an emergency help request notification
 */
export async function createEmergencyHelpRequest(
  userId: string,
  userName: string
): Promise<void> {
  await createNotification({
    userId,
    type: 'emergency',
    title: 'ヘルプ要請',
    description: `${userName}さんから緊急のヘルプ要請がありました`,
    importance: 5,
  });
}
