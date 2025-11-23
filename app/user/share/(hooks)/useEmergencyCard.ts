import { useState, useCallback, useEffect } from 'react';
import { getEmergencyContactsByUserId, updateEmergencyContact } from '@/api/emergency-contacts';
import { getUserHelpCardByUserId, updateUserHelpCard } from '@/api/user-help-cards';
import type { EmergencyContact, UserHelpCard } from '@/_schema';
import type { HealthCardData } from './useHealthCard';

export interface EmergencyCardData {
  name: string;
  condition: string;
  bloodType: string;
  emergencyNotes: string[];
  medications: string[];
  allergies: string;
  caregiverName: string;
  caregiverRelation: string;
  caregiverPhone: string;
  hospitalName: string;
  hospitalPhone: string;
}

// Default values when API returns null
const DEFAULT_VALUES = {
  name: '',
  condition: '',
  bloodType: '',
  emergencyNotes: [],
  medications: [],
  allergies: '',
  caregiverName: '',
  caregiverRelation: '',
  caregiverPhone: '',
  hospitalName: '',
  hospitalPhone: '',
};

export function useEmergencyCard(userId?: string, healthCardData?: HealthCardData) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // API data
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [helpCard, setHelpCard] = useState<UserHelpCard | null>(null);

  // Emergency card data states
  const [name, setName] = useState(DEFAULT_VALUES.name);
  const [condition, setCondition] = useState(DEFAULT_VALUES.condition);
  const [bloodType, setBloodType] = useState(DEFAULT_VALUES.bloodType);
  const [emergencyNotes, setEmergencyNotes] = useState<string[]>(DEFAULT_VALUES.emergencyNotes);
  const [medications, setMedications] = useState<string[]>(DEFAULT_VALUES.medications);
  const [allergies, setAllergies] = useState(DEFAULT_VALUES.allergies);
  const [caregiverName, setCaregiverName] = useState(DEFAULT_VALUES.caregiverName);
  const [caregiverRelation, setCaregiverRelation] = useState(DEFAULT_VALUES.caregiverRelation);
  const [caregiverPhone, setCaregiverPhone] = useState(DEFAULT_VALUES.caregiverPhone);
  const [hospitalName, setHospitalName] = useState(DEFAULT_VALUES.hospitalName);
  const [hospitalPhone, setHospitalPhone] = useState(DEFAULT_VALUES.hospitalPhone);

  // Sync data from health card
  useEffect(() => {
    if (healthCardData) {
      setBloodType(healthCardData.bloodType || DEFAULT_VALUES.bloodType);
      setAllergies(healthCardData.allergies || DEFAULT_VALUES.allergies);
      setEmergencyNotes(healthCardData.healthConditions || DEFAULT_VALUES.emergencyNotes);
      // Convert medications string to array
      const medsArray = healthCardData.medications
        ? healthCardData.medications.split('、').map((s) => s.trim()).filter(Boolean)
        : DEFAULT_VALUES.medications;
      setMedications(medsArray);
      // Set condition from disability
      setCondition(healthCardData.disability || DEFAULT_VALUES.condition);
    }
  }, [healthCardData]);

  // Fetch emergency contacts and help card from API
  const fetchEmergencyContacts = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch emergency contacts
      const contacts = await getEmergencyContactsByUserId(userId);
      setEmergencyContacts(contacts);

      // Find main caregiver contact
      const mainContact = contacts.find((c) => c.isMain) || contacts[0];
      if (mainContact) {
        setCaregiverName(mainContact.name);
        setCaregiverRelation(mainContact.relationship);
        setCaregiverPhone(mainContact.phoneNumber);
      }

      // Fetch help card for hospital info
      try {
        const card = await getUserHelpCardByUserId(userId);
        setHelpCard(card);
        setHospitalName(card.hospitalName || DEFAULT_VALUES.hospitalName);
        setHospitalPhone(card.hospitalPhone || DEFAULT_VALUES.hospitalPhone);
      } catch {
        // Help card might not exist, keep defaults
      }
    } catch (err) {
      setError(err as Error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Load data on mount
  useEffect(() => {
    fetchEmergencyContacts();
  }, [fetchEmergencyContacts]);

  const handleSave = useCallback(
    async (data: EmergencyCardData) => {
      // Update local state immediately
      setName(data.name);
      setCondition(data.condition);
      setBloodType(data.bloodType);
      setEmergencyNotes(data.emergencyNotes);
      setMedications(data.medications);
      setAllergies(data.allergies);
      setCaregiverName(data.caregiverName);
      setCaregiverRelation(data.caregiverRelation);
      setCaregiverPhone(data.caregiverPhone);
      setHospitalName(data.hospitalName);
      setHospitalPhone(data.hospitalPhone);

      // Persist caregiver info to API
      if (userId && emergencyContacts.length > 0) {
        try {
          const mainContact = emergencyContacts.find((c) => c.isMain) || emergencyContacts[0];
          if (mainContact) {
            await updateEmergencyContact(userId, mainContact.helperId, {
              name: data.caregiverName,
              relationship: data.caregiverRelation,
              phoneNumber: data.caregiverPhone,
            });
          }
        } catch (err) {
          console.error('Failed to save emergency contact:', err);
        }
      }

      // Persist hospital info to help card
      if (helpCard?.id) {
        try {
          await updateUserHelpCard(helpCard.id, {
            hospitalName: data.hospitalName || null,
            hospitalPhone: data.hospitalPhone || null,
          });
        } catch (err) {
          console.error('Failed to save help card:', err);
        }
      }
    },
    [userId, emergencyContacts, helpCard]
  );

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  return {
    isModalVisible,
    openModal,
    closeModal,
    loading,
    error,
    data: {
      name,
      condition,
      bloodType,
      emergencyNotes,
      medications,
      allergies,
      caregiverName,
      caregiverRelation,
      caregiverPhone,
      hospitalName,
      hospitalPhone,
    },
    handleSave,
    refetch: fetchEmergencyContacts,
  };
}
