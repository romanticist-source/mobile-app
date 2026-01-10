import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Form, FormInput, FormTextArea, FormSelect, FormTagInput, FormSaveButton, type SelectOption } from '@/components/forms';
import { getUserStatusCardByUserId, updateUserStatusCard, createUserStatusCard } from '@/api/user-status-cards';
import type { UpdateUserStatusCard, CreateUserStatusCard, UserStatusCard } from '@/_schema';
import { useUser } from '@/contexts/UserContext';
import { setUserWeight, setUserAge, getUserAge, setWakeUpTime, getWakeUpTime } from '@/_util/userSettingsHelper';
import { styles } from './styles';

const bloodTypeOptions: SelectOption[] = [
  { label: 'A型', value: 'A' },
  { label: 'B型', value: 'B' },
  { label: 'O型', value: 'O' },
  { label: 'AB型', value: 'AB' },
];

interface Medication {
  name: string;
  frequency: string;
  dosageTime: string;
}

interface HealthProfileFormData {
  bloodType: string;
  height: string;
  weight: string;
  age: string;
  wakeUpTime: string;
  allergies: string[];
  medicalHistory: string[];
  disabilities: string;
  otherNotes: string;
}

export default function HealthProfileScreen() {
  const router = useRouter();
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusCardId, setStatusCardId] = useState<string | null>(null);

  const form = useForm<HealthProfileFormData>({
    defaultValues: {
      bloodType: '',
      height: '',
      weight: '',
      age: '',
      wakeUpTime: '',
      allergies: [],
      medicalHistory: [],
      disabilities: '',
      otherNotes: '',
    },
  });

  const formValues = form.watch();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [savedMedications, setSavedMedications] = useState<Medication[]>([]);

  const [newMedication, setNewMedication] = useState<Medication>({
    name: '',
    frequency: '',
    dosageTime: '',
  });

  // Fetch health profile data on mount
  useEffect(() => {
    if (!selectedUserId || isUserLoading) return;

    const fetchHealthProfile = async () => {
      try {
        setIsLoading(true);
        const statusCard = await getUserStatusCardByUserId(selectedUserId);
        setStatusCardId(statusCard.id);

        // Parse JSON strings back to arrays
        const allergies = statusCard.allergy ? JSON.parse(statusCard.allergy) : [];
        const medicalHistory = statusCard.notes ? JSON.parse(statusCard.notes).medicalHistory || [] : [];
        const meds = statusCard.medicine ? JSON.parse(statusCard.medicine) : [];

        // Get age and wake-up time from AsyncStorage for fatigue calculation
        const [asyncAge, asyncWakeUpTime] = await Promise.all([
          getUserAge(),
          getWakeUpTime(),
        ]);

        form.reset({
          bloodType: statusCard.bloodType || '',
          height: statusCard.height || '',
          weight: statusCard.weight || '',
          age: asyncAge.toString(),
          wakeUpTime: asyncWakeUpTime.toString(),
          allergies,
          medicalHistory,
          disabilities: statusCard.disability || '',
          otherNotes: statusCard.notes ? JSON.parse(statusCard.notes).otherNotes || '' : '',
        });

        setMedications(meds);
        setSavedMedications(meds);
      } catch (error) {
        // No existing status card, keep defaults
        console.log('No existing health profile found, creating new one');
        // Still load age and wake-up time from AsyncStorage
        const [asyncAge, asyncWakeUpTime] = await Promise.all([
          getUserAge(),
          getWakeUpTime(),
        ]);
        form.reset({
          ...form.getValues(),
          age: asyncAge.toString(),
          wakeUpTime: asyncWakeUpTime.toString(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthProfile();
  }, [selectedUserId, isUserLoading]);

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      setMedications([...medications, newMedication]);
      setNewMedication({ name: '', frequency: '', dosageTime: '' });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSave = form.handleSubmit(async (data) => {
    if (!selectedUserId) return;

    try {
      setIsSaving(true);

      // Save weight, age, and wake-up time to AsyncStorage for fatigue calculation
      await Promise.all([
        data.weight ? setUserWeight(parseFloat(data.weight)) : Promise.resolve(),
        data.age ? setUserAge(parseInt(data.age, 10)) : Promise.resolve(),
        data.wakeUpTime ? setWakeUpTime(parseInt(data.wakeUpTime, 10)) : Promise.resolve(),
      ]);

      // Prepare data for API
      const apiData: UpdateUserStatusCard | CreateUserStatusCard = {
        bloodType: data.bloodType || null,
        height: data.height || null,
        weight: data.weight || null,
        allergy: data.allergies.length > 0 ? JSON.stringify(data.allergies) : null,
        medicine: medications.length > 0 ? JSON.stringify(medications) : null,
        disability: data.disabilities || null,
        notes: JSON.stringify({
          medicalHistory: data.medicalHistory,
          otherNotes: data.otherNotes,
        }),
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

      setSavedMedications(medications);
      setIsEditing(false);
      console.log('[HealthProfile] Settings saved and synced to AsyncStorage for fatigue calculation');
    } catch (error) {
      console.error('Failed to save health profile:', error);
    } finally {
      setIsSaving(false);
    }
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      // Cancel editing - reset form to saved values
      form.reset();
      setMedications(savedMedications);
    }
    setIsEditing(!isEditing);
  };

  const getBloodTypeLabel = (value: string) => {
    const option = bloodTypeOptions.find(opt => opt.value === value);
    return option ? option.label : '未設定';
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>健康プロフィール</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleToggleEdit}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'キャンセル' : '編集'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Important Notice */}
            <View style={styles.noticeBox}>
              <Text style={styles.noticeIcon}>ℹ️</Text>
              <View style={styles.noticeTextContainer}>
                <Text style={styles.noticeTitle}>重要な医療情報</Text>
                <Text style={styles.noticeText}>
                  この情報は緊急時に医療従事者が参照します。正確な情報を入力してください。
                </Text>
                <Text style={styles.noticeText}>
                  ※体重・年齢・起床時間は疲労度計算にも使用されます。
                </Text>
              </View>
            </View>

            {/* Basic Health Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>基本健康情報</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormSelect
                    name="bloodType"
                    label="血液型"
                    options={bloodTypeOptions}
                    placeholder="選択してください"
                  />

                  <FormInput
                    name="height"
                    label="身長 (cm)"
                    placeholder="170"
                    keyboardType="numeric"
                  />

                  <FormInput
                    name="weight"
                    label="体重 (kg)"
                    placeholder="65"
                    keyboardType="numeric"
                  />

                  <FormInput
                    name="age"
                    label="年齢"
                    placeholder="30"
                    keyboardType="numeric"
                  />

                  <FormInput
                    name="wakeUpTime"
                    label="起床時間（時）"
                    placeholder="7"
                    keyboardType="numeric"
                  />
                </Form>
              ) : (
                <View>
                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>血液型</Text>
                    <Text style={styles.displayValue}>{getBloodTypeLabel(formValues.bloodType)}</Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>身長</Text>
                    <Text style={styles.displayValue}>
                      {formValues.height ? `${formValues.height} cm` : '未設定'}
                    </Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>体重</Text>
                    <Text style={styles.displayValue}>
                      {formValues.weight ? `${formValues.weight} kg` : '未設定'}
                    </Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>年齢</Text>
                    <Text style={styles.displayValue}>
                      {formValues.age ? `${formValues.age}歳` : '未設定'}
                    </Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>起床時間</Text>
                    <Text style={styles.displayValue}>
                      {formValues.wakeUpTime ? `${formValues.wakeUpTime}時` : '未設定'}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Allergies */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>アレルギー</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormTagInput
                    name="allergies"
                    placeholder="アレルギーを追加"
                    addButtonText="+"
                  />
                </Form>
              ) : (
                <View style={styles.displayField}>
                  <Text style={styles.displayValue}>
                    {formValues.allergies.length > 0
                      ? formValues.allergies.join('、')
                      : '未設定'}
                  </Text>
                </View>
              )}
            </View>

            {/* Medication Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>服薬情報</Text>

              {medications.length > 0 ? (
                medications.map((medication, index) => (
                  <View key={index} style={styles.medicationCard}>
                    <View style={styles.medicationHeader}>
                      <Text style={styles.medicationName}>{medication.name}</Text>
                      {isEditing && (
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemoveMedication(index)}
                        >
                          <Text style={styles.removeButtonText}>×</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text style={styles.medicationDetail}>{medication.frequency}</Text>
                    {medication.dosageTime && (
                      <>
                        <Text style={styles.medicationDetail}>服薬時間</Text>
                        <Text style={styles.medicationTime}>{medication.dosageTime}</Text>
                      </>
                    )}
                  </View>
                ))
              ) : (
                !isEditing && (
                  <View style={styles.displayField}>
                    <Text style={styles.displayValue}>未設定</Text>
                  </View>
                )
              )}

              {/* Add New Medication - Only in edit mode */}
              {isEditing && (
                <View style={styles.addMedicationContainer}>
                  <TextInput
                    style={styles.medicationInput}
                    placeholder="薬剤名"
                    placeholderTextColor="#999999"
                    value={newMedication.name}
                    onChangeText={(text) =>
                      setNewMedication({ ...newMedication, name: text })
                    }
                  />
                  <TextInput
                    style={styles.medicationInput}
                    placeholder="用法・用量（例：1日1回 朝食後）"
                    placeholderTextColor="#999999"
                    value={newMedication.frequency}
                    onChangeText={(text) =>
                      setNewMedication({ ...newMedication, frequency: text })
                    }
                  />
                  <TouchableOpacity
                    style={styles.addMedicationButton}
                    onPress={handleAddMedication}
                  >
                    <Text style={styles.addMedicationIcon}>+</Text>
                    <Text style={styles.addMedicationText}>服薬を追加</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Medical History */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>既往歴</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormTagInput
                    name="medicalHistory"
                    placeholder="既往歴を追加"
                    addButtonText="+"
                  />
                </Form>
              ) : (
                <View style={styles.displayField}>
                  <Text style={styles.displayValue}>
                    {formValues.medicalHistory.length > 0
                      ? formValues.medicalHistory.join('、')
                      : '未設定'}
                  </Text>
                </View>
              )}
            </View>

            {/* Disability Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>障害情報</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormTextArea
                    name="disabilities"
                    label="障害の種類・程度"
                    placeholder="軽度の歩行障害"
                    numberOfLines={3}
                  />
                </Form>
              ) : (
                <View style={styles.displayField}>
                  <Text style={styles.displayLabel}>障害の種類・程度</Text>
                  <Text style={styles.displayValue}>
                    {formValues.disabilities || '未設定'}
                  </Text>
                </View>
              )}
            </View>

            {/* Other Notes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>その他の注意事項</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormTextArea
                    name="otherNotes"
                    label="医療従事者への伝達事項"
                    placeholder="特記事項や注意が必要なことなどを入力してください"
                    numberOfLines={4}
                  />
                </Form>
              ) : (
                <View style={styles.displayField}>
                  <Text style={styles.displayLabel}>医療従事者への伝達事項</Text>
                  <Text style={styles.displayValue}>
                    {formValues.otherNotes || '未設定'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Save Button - Only show in edit mode */}
        {isEditing && <FormSaveButton onSave={handleSave} loading={isSaving} />}
      </View>
    </>
  );
}
