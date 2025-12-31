/**
 * Notification Helper Utilities
 * Functions to create and manage notifications in the app
 */

import { createAlert } from '@/api/alerts';
import type { CreateAlertHistory } from '@/_schema/alert';

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

    await createAlert(alertData);
    console.log(`✅ Notification created: ${type} - ${title}`);
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
