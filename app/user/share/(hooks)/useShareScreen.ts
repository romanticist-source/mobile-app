import { useState } from 'react';
import { useHealthCard } from './useHealthCard';
import { useEmergencyCard } from './useEmergencyCard';
import { useCaregivers } from './useCaregivers';

export type { HealthCardData } from './useHealthCard';
export type { EmergencyCardData } from './useEmergencyCard';
export type { CaregiverDisplay } from './useCaregivers';

export type TabType = 'health' | 'emergency';

export function useShareScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('health');

  const healthCard = useHealthCard();
  const emergencyCard = useEmergencyCard();
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
    calculateBMI: healthCard.calculateBMI,
    handleHealthCardSave: healthCard.handleSave,

    // Emergency card
    isEmergencyModalVisible: emergencyCard.isModalVisible,
    openEmergencyModal: emergencyCard.openModal,
    closeEmergencyModal: emergencyCard.closeModal,
    emergencyCardData: emergencyCard.data,
    handleEmergencyCardSave: emergencyCard.handleSave,

    // Caregivers
    caregivers: caregivers.caregivers,
    caregiversLoading: caregivers.loading,
    caregiversError: caregivers.error,
  };
}
