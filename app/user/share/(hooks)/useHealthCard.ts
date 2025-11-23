import { useState, useCallback } from 'react';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [bloodType, setBloodType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [disability, setDisability] = useState('');
  const [notes, setNotes] = useState('');

  // Calculate BMI
  const calculateBMI = useCallback(() => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '22.5';
  }, [height, weight]);

  const handleSave = useCallback((data: HealthCardData) => {
    setHealthConditions(data.healthConditions);
    setBloodType(data.bloodType);
    setHeight(data.height);
    setWeight(data.weight);
    setAllergies(data.allergies);
    setMedications(data.medications);
    setDisability(data.disability);
    setNotes(data.notes);
  }, []);

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
    calculateBMI,
    handleSave,
  };
}
