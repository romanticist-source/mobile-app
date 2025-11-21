/**
 * Alert History API
 * HAL Backend API - Alert History endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type { AlertHistory, CreateAlertHistory, UpdateAlertHistory } from '@/_schema';

export const getAlerts = async (): Promise<AlertHistory[]> => {
  return apiGet('/alerts');
};

export const createAlert = async (data: CreateAlertHistory): Promise<AlertHistory> => {
  return apiPost('/alerts', data);
};

export const getAlertById = async (id: string): Promise<AlertHistory> => {
  return apiGet(`/alerts/${id}`);
};

export const updateAlert = async (id: string, data: UpdateAlertHistory): Promise<AlertHistory> => {
  return apiPut(`/alerts/${id}`, data);
};

export const deleteAlert = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/alerts/${id}`);
};

export const getAlertsByUserId = async (userId: string): Promise<AlertHistory[]> => {
  return apiGet(`/alerts/user/${userId}`);
};

// User alert history (read/unread tracking)
export interface UserAlertHistory {
  userId: string;
  alertId: string;
  isChecked: boolean;
}

export const getUserAlertHistory = async (userId: string): Promise<UserAlertHistory[]> => {
  return apiGet(`/alerts/user-history/${userId}`);
};

export const markAlertAsCheckedByUser = async (alertHistoryId: string, userId: string): Promise<{ message: string }> => {
  return apiPost(`/alerts/${alertHistoryId}/check-by-user/${userId}`, {});
};
