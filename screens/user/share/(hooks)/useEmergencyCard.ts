import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { getEmergencyContactsByUserId, updateEmergencyContact, createEmergencyContact } from '@/api/emergency-contacts';
import { getUserStatusCardByUserId, updateUserStatusCard, createUserStatusCard } from '@/api/user-status-cards';
import { getUserHelpCardByUserId, updateUserHelpCard, createUserHelpCard } from '@/api/user-help-cards';
import { useUser } from '@/contexts/UserContext';
import type { EmergencyContact } from '@/_schema/emergency-contact';

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
  const { selectedUserId } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // IDs for updating
  const [statusCardId, setStatusCardId] = useState<string | null>(null);
  const [helpCardId, setHelpCardId] = useState<string | null>(null);
  const [mainEmergencyContact, setMainEmergencyContact] = useState<EmergencyContact | null>(null);

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
    if (!selectedUserId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [statusCard, emergencyContacts, helpCard] = await Promise.all([
          getUserStatusCardByUserId(selectedUserId).catch(() => null),
          getEmergencyContactsByUserId(selectedUserId).catch(() => []),
          getUserHelpCardByUserId(selectedUserId).catch(() => null),
        ]);

        // Set status card data
        if (statusCard) {
          setStatusCardId(statusCard.id);
          setBloodType(statusCard.bloodType || '');
          setCondition(statusCard.disability || '');

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
                setMedications(medicineArray.map((m: { name: string }) => m.name));
              } else {
                setMedications([]);
              }
            } catch {
              // Fallback: treat as comma-separated string
              setMedications(statusCard.medicine.split('、').map((m: string) => m.trim()));
            }
          } else {
            setMedications([]);
          }

          // Parse notes from JSON string
          if (statusCard.notes) {
            try {
              const notesObj = JSON.parse(statusCard.notes);
              const notesText = notesObj.otherNotes || '';
              setEmergencyNotes(notesText.split('\n').filter((n: string) => n.trim()));
            } catch {
              // Fallback: treat as plain text
              setEmergencyNotes(statusCard.notes.split('。').filter((n: string) => n.trim()));
            }
          } else {
            setEmergencyNotes([]);
          }
        }

        // Set main emergency contact data
        const mainContact = emergencyContacts.find(c => c.isMain) || emergencyContacts[0];
        if (mainContact) {
          setMainEmergencyContact(mainContact);
          setCaregiverName(mainContact.name);
          setCaregiverRelation(mainContact.relationship);
          setCaregiverPhone(mainContact.phoneNumber);
          setCaregiverEmail(mainContact.email || '');
          setCaregiverAddress(mainContact.address || '');
        }

        // Set help card data
        if (helpCard) {
          setHelpCardId(helpCard.id);
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
  }, [selectedUserId]);

  const handleSave = useCallback(async (data: EmergencyCardData) => {
    console.log('🔵 handleSave called with data:', data);
    console.log('🔵 selectedUserId:', selectedUserId);
    console.log('🔵 statusCardId:', statusCardId);
    console.log('🔵 helpCardId:', helpCardId);
    console.log('🔵 mainEmergencyContact:', mainEmergencyContact);

    if (!selectedUserId) {
      console.log('🔴 No selectedUserId, showing error alert');
      Alert.alert('エラー', 'ユーザーIDが見つかりません');
      return;
    }

    try {
      setLoading(true);
      console.log('🟢 Starting update process...');

      // 1. Update or Create User Status Card
      // Format medications as JSON array
      const medicationsJson = JSON.stringify(
        data.medications.map(med => ({ name: med }))
      );

      // Format notes as JSON object
      const notesJson = JSON.stringify({
        otherNotes: data.emergencyNotes.join('\n')
      });

      const statusCardPayload = {
        bloodType: data.bloodType || null,
        allergy: data.allergies || null,
        medicine: medicationsJson || null,
        disability: data.condition || null,
        notes: notesJson || null,
      };

      if (statusCardId) {
        console.log('🟡 Updating User Status Card...');
        console.log('🟡 Status card update payload:', statusCardPayload);

        await updateUserStatusCard(statusCardId, statusCardPayload);
        console.log('✅ User Status Card updated successfully');
      } else {
        console.log('🟡 Creating new User Status Card...');
        const newStatusCard = await createUserStatusCard({
          userId: selectedUserId,
          ...statusCardPayload,
        });
        setStatusCardId(newStatusCard.id);
        console.log('✅ User Status Card created successfully:', newStatusCard.id);
      }

      // 2. Update or Create Emergency Contact
      if (mainEmergencyContact && data.caregiverPhone) {
        console.log('🟡 Updating Emergency Contact...');
        console.log('🟡 Emergency contact update payload:', {
          name: data.caregiverName,
          relationship: data.caregiverRelation,
          phoneNumber: data.caregiverPhone,
          email: data.caregiverEmail || null,
          address: data.caregiverAddress || null,
        });

        // Update existing contact
        await updateEmergencyContact(
          mainEmergencyContact.userId,
          mainEmergencyContact.helperId,
          {
            name: data.caregiverName,
            relationship: data.caregiverRelation,
            phoneNumber: data.caregiverPhone,
            email: data.caregiverEmail || null,
            address: data.caregiverAddress || null,
          }
        );
        console.log('✅ Emergency Contact updated successfully');
      } else {
        console.log('⚠️ No mainEmergencyContact or caregiverPhone, skipping emergency contact update');
      }

      // 3. Update or Create Help Card (if hospital info is provided)
      if (data.hospitalName || data.hospitalPhone) {
        if (helpCardId) {
          console.log('🟡 Updating Help Card...');
          console.log('🟡 Help card update payload:', {
            hospitalName: data.hospitalName || null,
            hospitalPhone: data.hospitalPhone || null,
          });

          await updateUserHelpCard(helpCardId, {
            hospitalName: data.hospitalName || null,
            hospitalPhone: data.hospitalPhone || null,
          });
          console.log('✅ Help Card updated successfully');
        } else {
          console.log('🟡 Creating new Help Card...');
          const newHelpCard = await createUserHelpCard({
            userId: selectedUserId,
            hospitalName: data.hospitalName || null,
            hospitalPhone: data.hospitalPhone || null,
          });
          setHelpCardId(newHelpCard.id);
          console.log('✅ Help Card created successfully:', newHelpCard.id);
        }
      } else {
        console.log('⚠️ No hospital info provided, skipping help card update');
      }

      // Update local state
      console.log('🟢 Updating local state...');
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

      console.log('✅ All updates completed successfully, showing success alert');
      Alert.alert('成功', '緊急カードを更新しました');
      closeModal();
    } catch (err) {
      console.error('🔴 Failed to update emergency card:', err);
      Alert.alert('エラー', '緊急カードの更新に失敗しました');
    } finally {
      setLoading(false);
      console.log('🔵 handleSave completed');
    }
  }, [selectedUserId, statusCardId, helpCardId, mainEmergencyContact]);

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

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
