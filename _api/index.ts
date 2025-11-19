// HAL Backend API Client
// Auto-generated from OpenAPI specification

import type {
  User,
  CreateUser,
  UpdateUser,
  Helper,
  CreateHelper,
  UpdateHelper,
  EmergencyContact,
  CreateEmergencyContact,
  UpdateEmergencyContact,
  UserStatusCard,
  CreateUserStatusCard,
  UpdateUserStatusCard,
  UserStatusCardDisease,
  CreateUserStatusCardDisease,
  UpdateUserStatusCardDisease,
  UserSchedule,
  CreateUserSchedule,
  UpdateUserSchedule,
  UserRepeatSchedule,
  CreateUserRepeatSchedule,
  UpdateUserRepeatSchedule,
  AlertHistory,
  CreateAlertHistory,
  UpdateAlertHistory,
  UserHelpCard,
  CreateUserHelpCard,
  ApiError,
  ApiSuccess,
} from '../_schema';

export interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
  onError?: (error: ApiError) => void;
}

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  private async request<T>(
    method: string,
    path: string,
    options?: {
      body?: unknown;
      query?: Record<string, string | boolean | undefined>;
    }
  ): Promise<T> {
    const url = new URL(path, this.config.baseURL);

    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      this.config.onError?.(error);
      throw new Error(error.error);
    }

    return response.json();
  }

  // Users API
  async getUsers(params?: { includeDeleted?: string }): Promise<User[]> {
    return this.request<User[]>('GET', '/users', { query: params });
  }

  async createUser(data: CreateUser): Promise<User> {
    return this.request<User>('POST', '/users', { body: data });
  }

  async getUserById(id: string): Promise<User> {
    return this.request<User>('GET', `/users/${id}`);
  }

  async updateUser(id: string, data: UpdateUser): Promise<User> {
    return this.request<User>('PUT', `/users/${id}`, { body: data });
  }

  async deleteUser(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>('DELETE', `/users/${id}`);
  }

  async getUserByMail(mail: string): Promise<User> {
    return this.request<User>('GET', `/users/mail/${mail}`);
  }

  async softDeleteUser(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>('PATCH', `/users/${id}/soft-delete`);
  }

  // Helpers API
  async getHelpers(): Promise<Helper[]> {
    return this.request<Helper[]>('GET', '/helpers');
  }

  async createHelper(data: CreateHelper): Promise<Helper> {
    return this.request<Helper>('POST', '/helpers', { body: data });
  }

  async getHelperById(id: string): Promise<Helper> {
    return this.request<Helper>('GET', `/helpers/${id}`);
  }

  async updateHelper(id: string, data: UpdateHelper): Promise<Helper> {
    return this.request<Helper>('PUT', `/helpers/${id}`, { body: data });
  }

  async deleteHelper(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>('DELETE', `/helpers/${id}`);
  }

  async getHelperByEmail(email: string): Promise<Helper> {
    return this.request<Helper>('GET', `/helpers/email/${email}`);
  }

  // Emergency Contacts API
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return this.request<EmergencyContact[]>('GET', '/emergency-contacts');
  }

  async createEmergencyContact(
    data: CreateEmergencyContact
  ): Promise<EmergencyContact> {
    return this.request<EmergencyContact>('POST', '/emergency-contacts', {
      body: data,
    });
  }

  async getEmergencyContactsByUserId(
    userId: string
  ): Promise<EmergencyContact[]> {
    return this.request<EmergencyContact[]>(
      'GET',
      `/emergency-contacts/user/${userId}`
    );
  }

  async getEmergencyContactsByHelperId(
    helperId: string
  ): Promise<EmergencyContact[]> {
    return this.request<EmergencyContact[]>(
      'GET',
      `/emergency-contacts/helper/${helperId}`
    );
  }

  async getEmergencyContact(
    userId: string,
    helperId: string
  ): Promise<EmergencyContact> {
    return this.request<EmergencyContact>(
      'GET',
      `/emergency-contacts/${userId}/${helperId}`
    );
  }

  async updateEmergencyContact(
    userId: string,
    helperId: string,
    data: UpdateEmergencyContact
  ): Promise<EmergencyContact> {
    return this.request<EmergencyContact>(
      'PUT',
      `/emergency-contacts/${userId}/${helperId}`,
      { body: data }
    );
  }

  async deleteEmergencyContact(
    userId: string,
    helperId: string
  ): Promise<ApiSuccess> {
    return this.request<ApiSuccess>(
      'DELETE',
      `/emergency-contacts/${userId}/${helperId}`
    );
  }

  // User Status Cards API
  async getUserStatusCards(): Promise<UserStatusCard[]> {
    return this.request<UserStatusCard[]>(
      'GET',
      '/user-status-cards/status-cards'
    );
  }

  async createUserStatusCard(
    data: CreateUserStatusCard
  ): Promise<UserStatusCard> {
    return this.request<UserStatusCard>(
      'POST',
      '/user-status-cards/status-cards',
      { body: data }
    );
  }

  async getUserStatusCardById(id: string): Promise<UserStatusCard> {
    return this.request<UserStatusCard>(
      'GET',
      `/user-status-cards/status-cards/${id}`
    );
  }

  async updateUserStatusCard(
    id: string,
    data: UpdateUserStatusCard
  ): Promise<UserStatusCard> {
    return this.request<UserStatusCard>(
      'PUT',
      `/user-status-cards/status-cards/${id}`,
      { body: data }
    );
  }

  async deleteUserStatusCard(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>(
      'DELETE',
      `/user-status-cards/status-cards/${id}`
    );
  }

  async getUserStatusCardByUserId(userId: string): Promise<UserStatusCard> {
    return this.request<UserStatusCard>(
      'GET',
      `/user-status-cards/status-cards/user/${userId}`
    );
  }

  // User Status Card Diseases API
  async getUserStatusCardDiseases(): Promise<UserStatusCardDisease[]> {
    return this.request<UserStatusCardDisease[]>(
      'GET',
      '/user-status-cards/diseases'
    );
  }

  async createUserStatusCardDisease(
    data: CreateUserStatusCardDisease
  ): Promise<UserStatusCardDisease> {
    return this.request<UserStatusCardDisease>(
      'POST',
      '/user-status-cards/diseases',
      { body: data }
    );
  }

  async getUserStatusCardDiseaseById(
    id: string
  ): Promise<UserStatusCardDisease> {
    return this.request<UserStatusCardDisease>(
      'GET',
      `/user-status-cards/diseases/${id}`
    );
  }

  async updateUserStatusCardDisease(
    id: string,
    data: UpdateUserStatusCardDisease
  ): Promise<UserStatusCardDisease> {
    return this.request<UserStatusCardDisease>(
      'PUT',
      `/user-status-cards/diseases/${id}`,
      { body: data }
    );
  }

  async deleteUserStatusCardDisease(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>(
      'DELETE',
      `/user-status-cards/diseases/${id}`
    );
  }

  async getUserStatusCardDiseasesByStatusCardId(
    statusCardId: string
  ): Promise<UserStatusCardDisease[]> {
    return this.request<UserStatusCardDisease[]>(
      'GET',
      `/user-status-cards/diseases/status-card/${statusCardId}`
    );
  }

  // User Schedules API
  async getUserSchedules(): Promise<UserSchedule[]> {
    return this.request<UserSchedule[]>('GET', '/user-schedules/schedules');
  }

  async createUserSchedule(data: CreateUserSchedule): Promise<UserSchedule> {
    return this.request<UserSchedule>('POST', '/user-schedules/schedules', {
      body: data,
    });
  }

  async getUserScheduleById(id: string): Promise<UserSchedule> {
    return this.request<UserSchedule>(
      'GET',
      `/user-schedules/schedules/${id}`
    );
  }

  async updateUserSchedule(
    id: string,
    data: UpdateUserSchedule
  ): Promise<UserSchedule> {
    return this.request<UserSchedule>(
      'PUT',
      `/user-schedules/schedules/${id}`,
      { body: data }
    );
  }

  async deleteUserSchedule(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>(
      'DELETE',
      `/user-schedules/schedules/${id}`
    );
  }

  async getUserSchedulesByUserId(userId: string): Promise<UserSchedule[]> {
    return this.request<UserSchedule[]>(
      'GET',
      `/user-schedules/schedules/user/${userId}`
    );
  }

  // User Repeat Schedules API
  async getUserRepeatSchedules(): Promise<UserRepeatSchedule[]> {
    return this.request<UserRepeatSchedule[]>(
      'GET',
      '/user-schedules/repeat-schedules'
    );
  }

  async createUserRepeatSchedule(
    data: CreateUserRepeatSchedule
  ): Promise<UserRepeatSchedule> {
    return this.request<UserRepeatSchedule>(
      'POST',
      '/user-schedules/repeat-schedules',
      { body: data }
    );
  }

  async getUserRepeatScheduleById(id: string): Promise<UserRepeatSchedule> {
    return this.request<UserRepeatSchedule>(
      'GET',
      `/user-schedules/repeat-schedules/${id}`
    );
  }

  async updateUserRepeatSchedule(
    id: string,
    data: UpdateUserRepeatSchedule
  ): Promise<UserRepeatSchedule> {
    return this.request<UserRepeatSchedule>(
      'PUT',
      `/user-schedules/repeat-schedules/${id}`,
      { body: data }
    );
  }

  async deleteUserRepeatSchedule(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>(
      'DELETE',
      `/user-schedules/repeat-schedules/${id}`
    );
  }

  async getUserRepeatSchedulesByUserId(
    userId: string
  ): Promise<UserRepeatSchedule[]> {
    return this.request<UserRepeatSchedule[]>(
      'GET',
      `/user-schedules/repeat-schedules/user/${userId}`
    );
  }

  // Alert History API
  async getAlertHistories(): Promise<AlertHistory[]> {
    return this.request<AlertHistory[]>('GET', '/alerts');
  }

  async createAlertHistory(data: CreateAlertHistory): Promise<AlertHistory> {
    return this.request<AlertHistory>('POST', '/alerts', { body: data });
  }

  async getAlertHistoryById(id: string): Promise<AlertHistory> {
    return this.request<AlertHistory>('GET', `/alerts/${id}`);
  }

  async updateAlertHistory(
    id: string,
    data: UpdateAlertHistory
  ): Promise<AlertHistory> {
    return this.request<AlertHistory>('PUT', `/alerts/${id}`, { body: data });
  }

  async deleteAlertHistory(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>('DELETE', `/alerts/${id}`);
  }

  async getAlertHistoriesByUserId(userId: string): Promise<AlertHistory[]> {
    return this.request<AlertHistory[]>('GET', `/alerts/user/${userId}`);
  }

  // User Help Cards API
  async getUserHelpCards(): Promise<UserHelpCard[]> {
    return this.request<UserHelpCard[]>('GET', '/user-help-cards');
  }

  async createUserHelpCard(data: CreateUserHelpCard): Promise<UserHelpCard> {
    return this.request<UserHelpCard>('POST', '/user-help-cards', {
      body: data,
    });
  }

  async getUserHelpCardById(id: string): Promise<UserHelpCard> {
    return this.request<UserHelpCard>('GET', `/user-help-cards/${id}`);
  }

  async deleteUserHelpCard(id: string): Promise<ApiSuccess> {
    return this.request<ApiSuccess>('DELETE', `/user-help-cards/${id}`);
  }

  async getUserHelpCardByUserId(userId: string): Promise<UserHelpCard> {
    return this.request<UserHelpCard>(
      'GET',
      `/user-help-cards/user/${userId}`
    );
  }
}

// Export a default instance
export const createApiClient = (config: ApiClientConfig): ApiClient => {
  return new ApiClient(config);
};
