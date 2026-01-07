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
 */
export const sendHelperConnectRequest = async (
  data: CreateHelperConnectRequest
): Promise<HelperConnect> => {
  return apiPost('/helper-connect/request', data);
};

/**
 * Get pending connection requests (for Helper)
 */
export const getPendingRequests = async (): Promise<HelperConnectWithDetails[]> => {
  return apiGet('/helper-connect/pending');
};

/**
 * Approve connection request (Helper approves User's request)
 */
export const approveHelperConnectRequest = async (id: string): Promise<HelperConnect> => {
  return apiPatch(`/helper-connect/${id}/approve`);
};

/**
 * Reject connection request (Helper rejects User's request)
 */
export const rejectHelperConnectRequest = async (id: string): Promise<HelperConnect> => {
  return apiPatch(`/helper-connect/${id}/reject`);
};

/**
 * Get approved connections (for both User and Helper)
 */
export const getConnections = async (): Promise<HelperConnectWithDetails[]> => {
  return apiGet('/helper-connect/connections');
};

/**
 * Delete connection (soft delete)
 */
export const deleteHelperConnect = async (id: string): Promise<{ success: boolean }> => {
  return apiDelete(`/helper-connect/${id}`);
};
