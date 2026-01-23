/**
 * User Fatigue API
 * HAL Backend API - User fatigue endpoints (疲労度同期)
 */

import { apiPost, apiGet } from '@/_util/apiClient';

export interface UserFatigue {
  id: string;
  userId: string;
  fatigueLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserFatigue {
  userId: string;
  fatigueLevel: number;
}

/**
 * 疲労度レコードを作成
 */
export const createUserFatigue = async (data: CreateUserFatigue): Promise<UserFatigue> => {
  return apiPost('/user-fatigue', data);
};

/**
 * ユーザーの疲労度履歴を取得
 */
export const getUserFatigueByUserId = async (userId: string): Promise<UserFatigue[]> => {
  return apiGet(`/user-fatigue/user/${userId}`);
};

/**
 * 疲労度レコードをIDで取得
 */
export const getUserFatigueById = async (id: string): Promise<UserFatigue> => {
  return apiGet(`/user-fatigue/${id}`);
};

/**
 * 全疲労度レコードを取得
 */
export const getAllUserFatigue = async (): Promise<UserFatigue[]> => {
  return apiGet('/user-fatigue');
};
