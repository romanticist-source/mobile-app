/**
 * Helpers API
 * HAL Backend API - Helpers endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type { Helper, CreateHelper, UpdateHelper } from '@/_schema';

export const getHelpers = async (): Promise<Helper[]> => {
  return apiGet('/helpers');
};

export const createHelper = async (data: CreateHelper): Promise<Helper> => {
  return apiPost('/helpers', data);
};

export const getHelperById = async (id: string): Promise<Helper> => {
  return apiGet(`/helpers/${id}`);
};

export const updateHelper = async (id: string, data: UpdateHelper): Promise<Helper> => {
  return apiPut(`/helpers/${id}`, data);
};

export const deleteHelper = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/helpers/${id}`);
};

export const getHelperByEmail = async (email: string): Promise<Helper> => {
  return apiGet(`/helpers/email/${email}`);
};
