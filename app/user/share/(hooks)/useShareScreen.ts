import { useState } from 'react';
import { useHealthCard } from './useHealthCard';
import { useEmergencyCard } from './useEmergencyCard';
import { useCaregivers } from './useCaregivers';

export type { HealthCardData } from './useHealthCard';
export type { EmergencyCardData } from './useEmergencyCard';
export type { CaregiverDisplay } from './useCaregivers';

export type TabType = 'health' | 'emergency';

// TODO: Replace with actual user ID from auth context
const TEMP_USER_ID = 'user-1';

export function useShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');

  // Health card hooks with API connection
  const healthCard = useHealthCard(TEMP_USER_ID);

  // Emergency card hooks - receives shared data from health card
  const emergencyCard = useEmergencyCard(TEMP_USER_ID, healthCard.data);

  // Caregivers list
  const caregivers = useCaregivers();

  return {
    // Tab state
    activeTab,
    setActiveTab,

    // Health card
    isHealthModalVisible: healthCard.isModalVisible,
    openHealthModal: healthCard.openModal,
    closeHealthModal: healthCard.closeModal,
    healthCardData: healthCard.data,
    healthCardLoading: healthCard.loading,
    healthCardError: healthCard.error,
    calculateBMI: healthCard.calculateBMI,
    handleHealthCardSave: healthCard.handleSave,

    // Emergency card
    isEmergencyModalVisible: emergencyCard.isModalVisible,
    openEmergencyModal: emergencyCard.openModal,
    closeEmergencyModal: emergencyCard.closeModal,
    emergencyCardData: emergencyCard.data,
    emergencyCardLoading: emergencyCard.loading,
    emergencyCardError: emergencyCard.error,
    handleEmergencyCardSave: emergencyCard.handleSave,

    // Caregivers
    caregivers: caregivers.caregivers,
    caregiversLoading: caregivers.loading,
    caregiversError: caregivers.error,
  };
}
