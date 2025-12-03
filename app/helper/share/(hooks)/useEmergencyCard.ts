import { useState, useCallback, useEffect } from 'react';
import { getEmergencyContactsByUserId } from '@/api/emergency-contacts';
import { getUserStatusCardByUserId } from '@/api/user-status-cards';
import { getUserHelpCardByUserId } from '@/api/user-help-cards';
import { useHelperUserConnection } from '@/hooks/useHelperUserConnection';

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
  caregiverEmail: string;
  caregiverAddress: string;
  hospitalName: string;
  hospitalPhone: string;
}

export function useEmergencyCard() {
  const { userId, loading: connectionLoading } = useHelperUserConnection();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Emergency card data states
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [emergencyNotes, setEmergencyNotes] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [caregiverName, setCaregiverName] = useState('');
  const [caregiverRelation, setCaregiverRelation] = useState('');
  const [caregiverPhone, setCaregiverPhone] = useState('');
  const [caregiverEmail, setCaregiverEmail] = useState('');
  const [caregiverAddress, setCaregiverAddress] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalPhone, setHospitalPhone] = useState('');

  // Fetch data from API
  useEffect(() => {
    if (!userId || connectionLoading) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use userId from helper-user connection
        // Fetch all data in parallel
        const [statusCard, emergencyContacts, helpCard] = await Promise.all([
          getUserStatusCardByUserId(userId).catch(() => null),
          getEmergencyContactsByUserId(userId).catch(() => []),
          getUserHelpCardByUserId(userId).catch(() => null),
        ]);

        // Set status card data
        if (statusCard) {
          setBloodType(statusCard.bloodType || '');
          setAllergies(statusCard.allergy || '');
          setCondition(statusCard.disability || '');

          // Parse medications (comma-separated string to array)
          if (statusCard.medicine) {
            setMedications(statusCard.medicine.split('、').map((m: string) => m.trim()));
          }

          // Parse notes for emergency notes
          if (statusCard.notes) {
            setEmergencyNotes(statusCard.notes.split('。').filter((n: string) => n.trim()));
          }
        }

        // Set main emergency contact data
        const mainContact = emergencyContacts.find(c => c.isMain) || emergencyContacts[0];
        if (mainContact) {
          setCaregiverName(mainContact.name);
          setCaregiverRelation(mainContact.relationship);
          setCaregiverPhone(mainContact.phoneNumber);
          setCaregiverEmail(mainContact.email || '');
          setCaregiverAddress(mainContact.address || '');
        }

        // Set help card data
        if (helpCard) {
          setHospitalName(helpCard.hospitalName || '');
          setHospitalPhone(helpCard.hospitalPhone || '');
        }

      } catch (err) {
        console.error('Failed to fetch emergency card data:', err);
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, connectionLoading]);

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
    setCaregiverEmail(data.caregiverEmail);
    setCaregiverAddress(data.caregiverAddress);
    setHospitalName(data.hospitalName);
    setHospitalPhone(data.hospitalPhone);

    // TODO: API call to update data
  }, []);

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
      caregiverEmail,
      caregiverAddress,
      hospitalName,
      hospitalPhone,
    },
    handleSave,
  };
}
