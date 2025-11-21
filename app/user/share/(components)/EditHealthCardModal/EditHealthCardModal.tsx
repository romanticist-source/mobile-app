import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTextArea, FormTagInput } from '@/components/forms';
import { editHealthCardFormSchema, EditHealthCardFormData } from './schema';
import { styles } from './styles';

interface HealthCardData {
  healthConditions: string[];
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  disability: string;
  notes: string;
}

interface EditHealthCardModalProps {
  visible: boolean;
  onClose: () => void;
  data: HealthCardData;
  onSave: (data: HealthCardData) => void;
}

export function EditHealthCardModal({ visible, onClose, data, onSave }: EditHealthCardModalProps) {
  const form = useForm<EditHealthCardFormData>({
    resolver: zodResolver(editHealthCardFormSchema),
    defaultValues: {
      healthConditions: [],
      bloodType: '',
      height: '',
      weight: '',
      allergies: '',
      medications: '',
      disability: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (visible) {
      form.reset({
        healthConditions: [...data.healthConditions],
        bloodType: data.bloodType,
        height: data.height,
        weight: data.weight,
        allergies: data.allergies,
        medications: data.medications,
        disability: data.disability,
        notes: data.notes,
      });
    }
  }, [visible, data, form]);

  const handleSave = form.handleSubmit((formData) => {
    onSave({
      healthConditions: formData.healthConditions,
      bloodType: formData.bloodType || '',
      height: formData.height || '',
      weight: formData.weight || '',
      allergies: formData.allergies || '',
      medications: formData.medications || '',
      disability: formData.disability || '',
      notes: formData.notes || '',
    });
    onClose();
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>体調カードを編集</Text>
        </View>

        {/* Modal Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Form form={form} style={styles.modalContent}>
            <FormTagInput
              name="healthConditions"
              label="病状・疾患"
              placeholder="新しい病状を追加..."
            />

            <FormInput
              name="bloodType"
              label="血液型"
              placeholder="A型"
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
              name="allergies"
              label="アレルギー"
              placeholder="ペニシリン、花粉"
            />

            <FormInput
              name="medications"
              label="服用薬"
              placeholder="降圧剤、ビタミンD"
            />

            <FormInput
              name="disability"
              label="障害情報"
              placeholder="軽度の歩行障害"
            />

            <FormTextArea
              name="notes"
              label="注意事項"
              placeholder="長時間の立位は困難、30分ごとに休憩が必要"
              numberOfLines={4}
            />
          </Form>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>キャンセル</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
