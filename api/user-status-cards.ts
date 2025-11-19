/**
 * User Status Cards API
 * HAL Backend API - User Status Cards and Diseases endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type {
  UserStatusCard,
  CreateUserStatusCard,
  UpdateUserStatusCard,
  UserStatusCardDisease,
  CreateUserStatusCardDisease,
  UpdateUserStatusCardDisease,
} from '@/_schema';

// User Status Cards
export const getUserStatusCards = async (): Promise<UserStatusCard[]> => {
  return apiGet('/user-status-cards/status-cards');
};

export const createUserStatusCard = async (data: CreateUserStatusCard): Promise<UserStatusCard> => {
  return apiPost('/user-status-cards/status-cards', data);
};

export const getUserStatusCardById = async (id: string): Promise<UserStatusCard> => {
  return apiGet(`/user-status-cards/status-cards/${id}`);
};

export const updateUserStatusCard = async (id: string, data: UpdateUserStatusCard): Promise<UserStatusCard> => {
  return apiPut(`/user-status-cards/status-cards/${id}`, data);
};

export const deleteUserStatusCard = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/user-status-cards/status-cards/${id}`);
};

export const getUserStatusCardByUserId = async (userId: string): Promise<UserStatusCard> => {
  return apiGet(`/user-status-cards/status-cards/user/${userId}`);
};

// User Status Card Diseases
export const getUserStatusCardDiseases = async (): Promise<UserStatusCardDisease[]> => {
  return apiGet('/user-status-cards/diseases');
};

export const createUserStatusCardDisease = async (data: CreateUserStatusCardDisease): Promise<UserStatusCardDisease> => {
  return apiPost('/user-status-cards/diseases', data);
};

export const getUserStatusCardDiseaseById = async (id: string): Promise<UserStatusCardDisease> => {
  return apiGet(`/user-status-cards/diseases/${id}`);
};

export const updateUserStatusCardDisease = async (
  id: string,
  data: UpdateUserStatusCardDisease
): Promise<UserStatusCardDisease> => {
  return apiPut(`/user-status-cards/diseases/${id}`, data);
};

export const deleteUserStatusCardDisease = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/user-status-cards/diseases/${id}`);
};

export const getUserStatusCardDiseasesByStatusCardId = async (statusCardId: string): Promise<UserStatusCardDisease[]> => {
  return apiGet(`/user-status-cards/diseases/status-card/${statusCardId}`);
};
