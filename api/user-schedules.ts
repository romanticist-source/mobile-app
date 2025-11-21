/**
 * User Schedules API
 * HAL Backend API - User Schedules and Repeat Schedules endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type {
  UserSchedule,
  CreateUserSchedule,
  UpdateUserSchedule,
  UserRepeatSchedule,
  CreateUserRepeatSchedule,
  UpdateUserRepeatSchedule,
} from '@/_schema';

// User Schedules
export const getUserSchedules = async (): Promise<UserSchedule[]> => {
  return apiGet('/user-schedules/schedules');
};

export const createUserSchedule = async (data: CreateUserSchedule): Promise<UserSchedule> => {
  return apiPost('/user-schedules/schedules', data);
};

export const getUserScheduleById = async (id: string): Promise<UserSchedule> => {
  return apiGet(`/user-schedules/schedules/${id}`);
};

export const updateUserSchedule = async (id: string, data: UpdateUserSchedule): Promise<UserSchedule> => {
  return apiPut(`/user-schedules/schedules/${id}`, data);
};

export const deleteUserSchedule = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/user-schedules/schedules/${id}`);
};

export const getUserSchedulesByUserId = async (userId: string): Promise<UserSchedule[]> => {
  return apiGet(`/user-schedules/schedules/user/${userId}`);
};

// User Repeat Schedules
export const getUserRepeatSchedules = async (): Promise<UserRepeatSchedule[]> => {
  return apiGet('/user-schedules/repeat-schedules');
};

export const createUserRepeatSchedule = async (data: CreateUserRepeatSchedule): Promise<UserRepeatSchedule> => {
  return apiPost('/user-schedules/repeat-schedules', data);
};

export const getUserRepeatScheduleById = async (id: string): Promise<UserRepeatSchedule> => {
  return apiGet(`/user-schedules/repeat-schedules/${id}`);
};

export const updateUserRepeatSchedule = async (
  id: string,
  data: UpdateUserRepeatSchedule
): Promise<UserRepeatSchedule> => {
  return apiPut(`/user-schedules/repeat-schedules/${id}`, data);
};

export const deleteUserRepeatSchedule = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/user-schedules/repeat-schedules/${id}`);
};

export const getUserRepeatSchedulesByUserId = async (userId: string): Promise<UserRepeatSchedule[]> => {
  return apiGet(`/user-schedules/repeat-schedules/user/${userId}`);
};
