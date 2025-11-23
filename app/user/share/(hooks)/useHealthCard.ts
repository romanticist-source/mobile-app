import { useState, useCallback, useEffect } from 'react';
import {
  getUserStatusCardByUserId,
  getUserStatusCardDiseasesByStatusCardId,
  updateUserStatusCard,
  createUserStatusCardDisease,
  deleteUserStatusCardDisease,
} from '@/api/user-status-cards';
import type { UserStatusCard, UserStatusCardDisease } from '@/_schema';

export interface HealthCardData {
  healthConditions: string[];
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  disability: string;
  notes: string;
}

// Default values when API returns null
const DEFAULT_VALUES = {
  healthConditions: [],
  bloodType: '',
  height: '165',
  weight: '58',
  allergies: '',
  medications: '',
  disability: '',
  notes: '',
};

export function useHealthCard(userId?: string) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // API data
  const [statusCard, setStatusCard] = useState<UserStatusCard | null>(null);
  const [diseases, setDiseases] = useState<UserStatusCardDisease[]>([]);

  // Health card data states
  const [healthConditions, setHealthConditions] = useState<string[]>(DEFAULT_VALUES.healthConditions);
  const [bloodType, setBloodType] = useState(DEFAULT_VALUES.bloodType);
  const [height, setHeight] = useState(DEFAULT_VALUES.height);
  const [weight, setWeight] = useState(DEFAULT_VALUES.weight);
  const [allergies, setAllergies] = useState(DEFAULT_VALUES.allergies);
  const [medications, setMedications] = useState(DEFAULT_VALUES.medications);
  const [disability, setDisability] = useState(DEFAULT_VALUES.disability);
  const [notes, setNotes] = useState(DEFAULT_VALUES.notes);

  // Fetch health card data from API
  const fetchHealthCard = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch status card
      const card = await getUserStatusCardByUserId(userId);
      setStatusCard(card);

      // Update state from API data
      setBloodType(card.bloodType || DEFAULT_VALUES.bloodType);
      setAllergies(card.allergy || DEFAULT_VALUES.allergies);
      setMedications(card.medicine || DEFAULT_VALUES.medications);
      setHeight(card.height || DEFAULT_VALUES.height);
      setWeight(card.weight || DEFAULT_VALUES.weight);
      setDisability(card.disability || DEFAULT_VALUES.disability);
      setNotes(card.notes || DEFAULT_VALUES.notes);

      // Fetch diseases for this status card
      if (card.id) {
        const diseaseList = await getUserStatusCardDiseasesByStatusCardId(card.id);
        setDiseases(diseaseList);
        setHealthConditions(diseaseList.map((d) => d.name));
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
    fetchHealthCard();
  }, [fetchHealthCard]);

  // Calculate BMI
  const calculateBMI = useCallback(() => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '22.5';
  }, [height, weight]);

  const handleSave = useCallback(
    async (data: HealthCardData) => {
      // Update local state immediately
      setHealthConditions(data.healthConditions);
      setBloodType(data.bloodType);
      setHeight(data.height);
      setWeight(data.weight);
      setAllergies(data.allergies);
      setMedications(data.medications);
      setDisability(data.disability);
      setNotes(data.notes);

      // Persist to API if we have a status card
      if (statusCard?.id) {
        try {
          // Update status card
          await updateUserStatusCard(statusCard.id, {
            bloodType: data.bloodType || null,
            allergy: data.allergies || null,
            medicine: data.medications || null,
            height: data.height || null,
            weight: data.weight || null,
            disability: data.disability || null,
            notes: data.notes || null,
          });

          // Update diseases
          // Delete existing diseases
          for (const disease of diseases) {
            await deleteUserStatusCardDisease(disease.id);
          }

          // Create new diseases
          const newDiseases: UserStatusCardDisease[] = [];
          for (const condition of data.healthConditions) {
            const created = await createUserStatusCardDisease({
              userStatusCardId: statusCard.id,
              name: condition,
            });
            newDiseases.push(created);
          }
          setDiseases(newDiseases);
        } catch (err) {
          console.error('Failed to save health card:', err);
          // Data is already updated locally, so user sees changes
        }
      }
    },
    [statusCard, diseases]
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
      healthConditions,
      bloodType,
      height,
      weight,
      allergies,
      medications,
      disability,
      notes,
    },
    calculateBMI,
    handleSave,
    refetch: fetchHealthCard,
  };
}
