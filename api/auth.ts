/**
 * Authentication API
 * HAL Backend API - Authentication endpoints
 */

import { apiPost, apiGet } from '@/_util/apiClient';
import type { User } from '@/_schema';

export interface LoginRequest {
  mail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  mail: string;
  password: string;
  age: number;
  address?: string;
  comment?: string;
}

/**
 * ログイン
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return apiPost('/auth/login', data);
};

/**
 * 現在のユーザー情報取得
 */
export const getCurrentUser = async (): Promise<User> => {
  return apiGet('/auth/me');
};

/**
 * ログアウト
 */
export const logout = async (): Promise<{ success: boolean }> => {
  return apiPost('/auth/logout');
};

/**
 * 新規ユーザー登録
 */
export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  return apiPost('/auth/register', data);
};
