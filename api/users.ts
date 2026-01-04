/**
 * Users API
 * HAL Backend API - Users endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from '@/_util/apiClient';
import type { User, CreateUser, UpdateUser, CreateUserGoogle } from '@/_schema';

export const getUsers = async (includeDeleted?: string): Promise<User[]> => {
  const params = includeDeleted ? `?includeDeleted=${includeDeleted}` : '';
  return apiGet(`/users${params}`);
};

export const createUser = async (data: CreateUser): Promise<User> => {
  return apiPost('/users', data);
};

export const getUserById = async (id: string): Promise<User> => {
  return apiGet(`/users/${id}`);
};

export const updateUser = async (id: string, data: UpdateUser): Promise<User> => {
  return apiPut(`/users/${id}`, data);
};

export const deleteUser = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/users/${id}`);
};

export const getUserByEmail = async (email: string): Promise<User> => {
  return apiGet(`/users/mail/${email}`);
};

export const softDeleteUser = async (id: string): Promise<{ success: boolean }> => {
  return apiPatch(`/users/${id}/soft-delete`);
};

export const createUserGoogle = async (data: CreateUserGoogle): Promise<User> => {
  return apiPost('/google', data);
};