/**
 * Authentication API
 * HAL Backend API - Authentication endpoints
 */

import { apiPost, apiGet } from '@/_util/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Helper,
  AuthRole,
} from '@/_schema';

/**
 * ログイン
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return apiPost('/auth/login', data);
};

/**
 * 現在の認証情報取得（User or Helper）
 * Backend returns user info with role field
 */
export const getCurrentAuth = async (): Promise<{
  id: string;
  role: AuthRole;
  name: string;
  mail: string;
  age: number | null;
  icon: string | null;
  address: string | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}> => {
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
