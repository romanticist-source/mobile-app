/**
 * Helper Connect API
 * HAL Backend API - Helper-User connection endpoints
 */

import { apiGet } from '@/_util/apiClient';

export interface HelperUserConnectionResponse {
  helperId: string;
  userIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HelperUserConnection {
  helperId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get User ID by Helper ID
 * @param helperId - The helper's ID
 * @returns The user ID connected to this helper
 */
export const getUserIdByHelperId = async (helperId: string): Promise<string> => {
  const response = await apiGet<HelperUserConnectionResponse>(`/helper-connect/${helperId}`);
  // APIはuserIds配列を返すので、最初の要素を取得
  return response.userIds[0];
};

/**
 * Get full connection data by Helper ID
 * @param helperId - The helper's ID
 * @returns Full connection data including helperId, userId, timestamps
 */
export const getHelperUserConnection = async (helperId: string): Promise<HelperUserConnection> => {
  const response = await apiGet<HelperUserConnectionResponse>(`/helper-connect/${helperId}`);
  // APIレスポンスをHelperUserConnection型に変換
  return {
    helperId: response.helperId,
    userId: response.userIds[0], // 配列の最初の要素を使用
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};
