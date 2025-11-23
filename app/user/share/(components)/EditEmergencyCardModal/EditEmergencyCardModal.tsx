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
import { Form, FormInput, FormTagInput } from '@/components/forms';
import { editEmergencyCardFormSchema, EditEmergencyCardFormData } from './schema';
import { styles } from './styles';

interface EmergencyCardData {
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

interface EditEmergencyCardModalProps {
  visible: boolean;
  onClose: () => void;
  data: EmergencyCardData;
  onSave: (data: EmergencyCardData) => void;
}

export function EditEmergencyCardModal({ visible, onClose, data, onSave }: EditEmergencyCardModalProps) {
  const form = useForm<EditEmergencyCardFormData>({
    resolver: zodResolver(editEmergencyCardFormSchema),
    defaultValues: {
      name: '',
      condition: '',
      bloodType: '',
      emergencyNotes: [],
      medications: [],
      allergies: '',
      caregiverName: '',
      caregiverRelation: '',
      caregiverPhone: '',
      hospitalName: '',
      hospitalPhone: '',
    },
  });

  useEffect(() => {
    if (visible) {
      form.reset({
        name: data.name,
        condition: data.condition,
        bloodType: data.bloodType,
        emergencyNotes: [...data.emergencyNotes],
        medications: [...data.medications],
        allergies: data.allergies,
        caregiverName: data.caregiverName,
        caregiverRelation: data.caregiverRelation,
        caregiverPhone: data.caregiverPhone,
        hospitalName: data.hospitalName,
        hospitalPhone: data.hospitalPhone,
      });
    }
  }, [visible, data, form]);

  const handleSave = form.handleSubmit((formData) => {
    onSave({
      name: formData.name,
      condition: formData.condition || '',
      bloodType: formData.bloodType || '',
      emergencyNotes: formData.emergencyNotes,
      medications: formData.medications,
      allergies: formData.allergies || '',
      caregiverName: formData.caregiverName || '',
      caregiverRelation: formData.caregiverRelation || '',
      caregiverPhone: formData.caregiverPhone || '',
      hospitalName: formData.hospitalName || '',
      hospitalPhone: formData.hospitalPhone || '',
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
          <Text style={styles.modalTitle}>緊急ヘルプカードを編集</Text>
        </View>

        {/* Modal Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Form form={form} style={styles.modalContent}>
            {/* Basic Info Section */}
            <Text style={styles.sectionTitle}>基本情報</Text>

            <FormInput
              name="name"
              label="お名前"
              required
            />

            <FormInput
              name="condition"
              label="状態・役職"
            />

            <FormInput
              name="bloodType"
              label="血液型"
            />

            <FormTagInput
              name="emergencyNotes"
              label="緊急時注意事項"
            />

            <FormTagInput
              name="medications"
              label="服用薬"
            />

            <FormInput
              name="allergies"
              label="アレルギー"
            />

            {/* Emergency Contacts Section */}
            <Text style={styles.sectionTitle}>緊急連絡先</Text>

            <FormInput
              name="caregiverName"
              label="介助者名"
            />

            <FormInput
              name="caregiverRelation"
              label="続柄"
            />

            <FormInput
              name="caregiverPhone"
              label="介助者電話番号"
              placeholder="090-YYYY-YYYY"
            />

            <FormInput
              name="hospitalName"
              label="かかりつけ病院"
            />

            <FormInput
              name="hospitalPhone"
              label="病院電話番号"
              keyboardType="phone-pad"
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
