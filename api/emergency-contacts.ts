/**
 * Emergency Contacts API
 * HAL Backend API - Emergency Contacts endpoints
 */

import { apiGet, apiPost, apiPut, apiDelete } from '@/_util/apiClient';
import type {
  EmergencyContact,
  CreateEmergencyContact,
  UpdateEmergencyContact,
} from '@/_schema';

export const getEmergencyContacts = async (): Promise<EmergencyContact[]> => {
  return apiGet('/emergency-contacts');
};

export const createEmergencyContact = async (data: CreateEmergencyContact): Promise<EmergencyContact> => {
  return apiPost('/emergency-contacts', data);
};

export const getEmergencyContactsByUserId = async (userId: string): Promise<EmergencyContact[]> => {
  return apiGet(`/emergency-contacts/user/${userId}`);
};

export const getEmergencyContactsByHelperId = async (helperId: string): Promise<EmergencyContact[]> => {
  return apiGet(`/emergency-contacts/helper/${helperId}`);
};

export const getEmergencyContact = async (userId: string, helperId: string): Promise<EmergencyContact> => {
  return apiGet(`/emergency-contacts/${userId}/${helperId}`);
};

export const updateEmergencyContact = async (
  userId: string,
  helperId: string,
  data: UpdateEmergencyContact
): Promise<EmergencyContact> => {
  return apiPut(`/emergency-contacts/${userId}/${helperId}`, data);
};

export const deleteEmergencyContact = async (userId: string, helperId: string): Promise<{ success: boolean }> => {
  return apiDelete(`/emergency-contacts/${userId}/${helperId}`);
};
