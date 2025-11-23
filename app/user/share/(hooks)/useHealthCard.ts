import { mockHealthCardData } from '@/api/__mock__/share';
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

  // Health card data states - initialized from mock data
  const [healthConditions, setHealthConditions] = useState(mockHealthCardData.healthConditions);
  const [bloodType, setBloodType] = useState(mockHealthCardData.bloodType);
  const [height, setHeight] = useState(mockHealthCardData.height);
  const [weight, setWeight] = useState(mockHealthCardData.weight);
  const [allergies, setAllergies] = useState(mockHealthCardData.allergies);
  const [medications, setMedications] = useState(mockHealthCardData.medications);
  const [disability, setDisability] = useState(mockHealthCardData.disability);
  const [notes, setNotes] = useState(mockHealthCardData.notes);

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
