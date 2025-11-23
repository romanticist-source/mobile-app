import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Form, FormInput, FormTextArea, FormSelect, FormTagInput, FormSaveButton, type SelectOption } from '@/components/forms';
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

export default function HealthProfileScreen() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      bloodType: '',
      height: '',
      weight: '',
      allergies: [] as string[],
      medicalHistory: [] as string[],
      disabilities: '',
      otherNotes: '',
    },
  });

  const [medications, setMedications] = useState<Medication[]>([
    { name: '降圧剤', frequency: '1日1回 朝食後', dosageTime: '08:00' },
    { name: 'ビタミンD', frequency: '1日1回 夕食後', dosageTime: '19:00' },
  ]);

  const [newMedication, setNewMedication] = useState<Medication>({
    name: '',
    frequency: '',
    dosageTime: '',
  });

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      setMedications([...medications, newMedication]);
      setNewMedication({ name: '', frequency: '', dosageTime: '' });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSave = form.handleSubmit((data) => {
    const saveData = {
      ...data,
      medications,
    };
    console.log('Save health profile:', saveData);
    // TODO: API call to update user status card
    router.back();
  });

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
          <View style={styles.headerRight} />
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
              </View>
            </View>

            <Form form={form}>
              {/* Basic Health Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>基本健康情報</Text>

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
              </View>

              {/* Allergies */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>アレルギー</Text>
                <FormTagInput
                  name="allergies"
                  placeholder="アレルギーを追加"
                  addButtonText="+"
                />
              </View>

              {/* Medication Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>服薬情報</Text>

                {medications.map((medication, index) => (
                  <View key={index} style={styles.medicationCard}>
                    <View style={styles.medicationHeader}>
                      <Text style={styles.medicationName}>{medication.name}</Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveMedication(index)}
                      >
                        <Text style={styles.removeButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.medicationDetail}>{medication.frequency}</Text>
                    <Text style={styles.medicationDetail}>服薬時間</Text>
                    <Text style={styles.medicationTime}>{medication.dosageTime}</Text>
                  </View>
                ))}

                {/* Add New Medication */}
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
              </View>

              {/* Medical History */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>既往歴</Text>
                <FormTagInput
                  name="medicalHistory"
                  placeholder="既往歴を追加"
                  addButtonText="+"
                />
              </View>

              {/* Disability Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>障害情報</Text>
                <FormTextArea
                  name="disabilities"
                  label="障害の種類・程度"
                  placeholder="軽度の歩行障害"
                  numberOfLines={3}
                />
              </View>

              {/* Other Notes */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>その他の注意事項</Text>
                <FormTextArea
                  name="otherNotes"
                  label="医療従事者への伝達事項"
                  placeholder="特記事項や注意が必要なことなどを入力してください"
                  numberOfLines={4}
                />
              </View>
            </Form>
          </View>
        </ScrollView>

        {/* Save Button */}
        <FormSaveButton onSave={handleSave} />
      </View>
    </>
  );
}
