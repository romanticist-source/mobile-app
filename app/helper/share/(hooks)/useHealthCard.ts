import { useState, useCallback, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import {
  getUserStatusCardByUserId,
  updateUserStatusCard,
  createUserStatusCard,
  getUserStatusCardDiseasesByStatusCardId,
} from '@/api/user-status-cards';
import type { UpdateUserStatusCard, CreateUserStatusCard } from '@/_schema';

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

export function useHealthCard() {
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [statusCardId, setStatusCardId] = useState<string | null>(null);

  // Health card data states
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [bloodType, setBloodType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [disability, setDisability] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch health card data from API
  const fetchHealthCard = useCallback(async () => {
    if (!selectedUserId || isUserLoading) return;

    try {
      setLoading(true);
      setError(null);

      const statusCard = await getUserStatusCardByUserId(selectedUserId);
      setStatusCardId(statusCard.id);

      // Set basic info
      setBloodType(statusCard.bloodType || '');
      setHeight(statusCard.height || '');
      setWeight(statusCard.weight || '');
      setDisability(statusCard.disability || '');

      // Parse allergies from JSON string
      if (statusCard.allergy) {
        try {
          const allergyArray = JSON.parse(statusCard.allergy);
          setAllergies(Array.isArray(allergyArray) ? allergyArray.join('、') : statusCard.allergy);
        } catch {
          setAllergies(statusCard.allergy);
        }
      } else {
        setAllergies('');
      }

      // Parse medications from JSON string
      if (statusCard.medicine) {
        try {
          const medicineArray = JSON.parse(statusCard.medicine);
          if (Array.isArray(medicineArray)) {
            setMedications(medicineArray.map((m: { name: string }) => m.name).join('、'));
          } else {
            setMedications(statusCard.medicine);
          }
        } catch {
          setMedications(statusCard.medicine);
        }
      } else {
        setMedications('');
      }

      // Parse notes
      if (statusCard.notes) {
        try {
          const notesObj = JSON.parse(statusCard.notes);
          setNotes(notesObj.otherNotes || '');
        } catch {
          setNotes(statusCard.notes);
        }
      } else {
        setNotes('');
      }

      // Fetch diseases for health conditions
      try {
        const diseases = await getUserStatusCardDiseasesByStatusCardId(statusCard.id);
        setHealthConditions(diseases.map(d => d.name));
      } catch {
        setHealthConditions([]);
      }
    } catch (err) {
      setError(err as Error);
      // Reset to empty values if no status card exists
      setHealthConditions([]);
      setBloodType('');
      setHeight('');
      setWeight('');
      setAllergies('');
      setMedications('');
      setDisability('');
      setNotes('');
    } finally {
      setLoading(false);
    }
  }, [selectedUserId, isUserLoading]);

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
    return '-';
  }, [height, weight]);

  const handleSave = useCallback(async (data: HealthCardData) => {
    if (!selectedUserId) return;

    try {
      // Prepare API data
      const apiData: UpdateUserStatusCard | CreateUserStatusCard = {
        bloodType: data.bloodType || null,
        height: data.height || null,
        weight: data.weight || null,
        allergy: data.allergies ? JSON.stringify(data.allergies.split('、').filter(Boolean)) : null,
        medicine: data.medications ? JSON.stringify(data.medications.split('、').filter(Boolean).map(name => ({ name }))) : null,
        disability: data.disability || null,
        notes: data.notes ? JSON.stringify({ otherNotes: data.notes }) : null,
      };

      if (statusCardId) {
        await updateUserStatusCard(statusCardId, apiData);
      } else {
        const newCard = await createUserStatusCard({
          userId: selectedUserId,
          ...apiData,
        });
        setStatusCardId(newCard.id);
      }

      // Update local state
      setHealthConditions(data.healthConditions);
      setBloodType(data.bloodType);
      setHeight(data.height);
      setWeight(data.weight);
      setAllergies(data.allergies);
      setMedications(data.medications);
      setDisability(data.disability);
      setNotes(data.notes);
    } catch (err) {
      console.error('Failed to save health card:', err);
      throw err;
    }
  }, [selectedUserId, statusCardId]);

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  return {
    isModalVisible,
    openModal,
    closeModal,
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
    loading,
    error,
    calculateBMI,
    handleSave,
    refetch: fetchHealthCard,
  };
}
