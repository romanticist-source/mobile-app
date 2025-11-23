/**
 * User Help Cards API
 * HAL Backend API - User Help Cards endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type { UserHelpCard, CreateUserHelpCard, UpdateUserHelpCard } from '@/_schema';

export const getUserHelpCards = async (): Promise<UserHelpCard[]> => {
  return apiGet('/user-help-cards');
};

export const createUserHelpCard = async (data: CreateUserHelpCard): Promise<UserHelpCard> => {
  return apiPost('/user-help-cards', data);
};

export const getUserHelpCardById = async (id: string): Promise<UserHelpCard> => {
  return apiGet(`/user-help-cards/${id}`);
};

export const updateUserHelpCard = async (id: string, data: UpdateUserHelpCard): Promise<UserHelpCard> => {
  return apiPut(`/user-help-cards/${id}`, data);
};

export const deleteUserHelpCard = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/user-help-cards/${id}`);
};

export const getUserHelpCardByUserId = async (userId: string): Promise<UserHelpCard> => {
  return apiGet(`/user-help-cards/user/${userId}`);
};
