import { useState, useCallback } from 'react';

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

export function useEmergencyCard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Emergency card data states
  const [name, setName] = useState('山田太郎');
  const [condition, setCondition] = useState('軽度の身体障害');
  const [bloodType, setBloodType] = useState('A型');
  const [emergencyNotes, setEmergencyNotes] = useState(['心臓病', '低血圧']);
  const [medications, setMedications] = useState(['サンプル薬A', 'サンプル薬B']);
  const [allergies, setAllergies] = useState('なし');
  const [caregiverName, setCaregiverName] = useState('山田花子');
  const [caregiverRelation, setCaregiverRelation] = useState('娘');
  const [caregiverPhone, setCaregiverPhone] = useState('090-YYYY-YYYY');
  const [hospitalName, setHospitalName] = useState('サンプル病院');
  const [hospitalPhone, setHospitalPhone] = useState('03-XXXX-XXXX');

  const handleSave = useCallback((data: EmergencyCardData) => {
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
  }, []);

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  return {
    isModalVisible,
    openModal,
    closeModal,
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
  };
}
