/**
 * HelperConnect API
 * HAL Backend API - HelperConnect endpoints
 */

import { apiGet, apiPost, apiPatch, apiDelete } from '@/_util/apiClient';
import type {
  HelperConnect,
  CreateHelperConnectRequest,
  HelperConnectWithDetails,
} from '@/_schema';

/**
 * Send connection request from User to Helper
 * Backend returns { success: boolean, message: string }
 */
export const sendHelperConnectRequest = async (
  data: CreateHelperConnectRequest
): Promise<{ success: boolean; message: string }> => {
  return apiPost('/helper-connect/request', data);
};

/**
 * Get pending connection requests (for Helper)
 * Backend returns { connections: [...] }
 */
export const getPendingRequests = async (): Promise<HelperConnectWithDetails[]> => {
  const response = await apiGet<{ connections: HelperConnectWithDetails[] }>('/helper-connect/pending');
  return response.connections;
};

/**
 * Approve connection request (Helper approves User's request)
 * Backend returns { success: boolean, message: string }
 */
export const approveHelperConnectRequest = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiPatch(`/helper-connect/${id}/approve`);
};

/**
 * Reject connection request (Helper rejects User's request)
 * Backend returns { success: boolean, message: string }
 */
export const rejectHelperConnectRequest = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiPatch(`/helper-connect/${id}/reject`);
};

/**
 * Get approved connections (for both User and Helper)
 * Backend returns { connections: [...] }
 */
export const getConnections = async (): Promise<HelperConnectWithDetails[]> => {
  const response = await apiGet<{ connections: HelperConnectWithDetails[] }>('/helper-connect/connections');
  return response.connections;
};

/**
 * Delete connection (soft delete)
 */
export const deleteHelperConnect = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/helper-connect/${id}`);
};
