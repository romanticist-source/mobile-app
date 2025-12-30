import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTagInput, FormButtonGroup } from '@/components/forms';
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
  caregiverEmail: string;
  caregiverAddress: string;
  hospitalName: string;
  hospitalPhone: string;
}

interface EditEmergencyCardModalProps {
  visible: boolean;
  onClose: () => void;
  data: EmergencyCardData;
  onSave: (data: EmergencyCardData) => void;
  userName?: string;
}

export function EditEmergencyCardModal({ visible, onClose, data, onSave, userName }: EditEmergencyCardModalProps) {
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
      caregiverEmail: '',
      caregiverAddress: '',
      hospitalName: '',
      hospitalPhone: '',
    },
  });

  useEffect(() => {
    if (visible) {
      form.reset({
        name: userName || data.name,
        condition: data.condition,
        bloodType: data.bloodType,
        emergencyNotes: [...data.emergencyNotes],
        medications: [...data.medications],
        allergies: data.allergies,
        caregiverName: data.caregiverName,
        caregiverRelation: data.caregiverRelation,
        caregiverPhone: data.caregiverPhone,
        caregiverEmail: data.caregiverEmail,
        caregiverAddress: data.caregiverAddress,
        hospitalName: data.hospitalName,
        hospitalPhone: data.hospitalPhone,
      });
    }
  }, [visible, data, form, userName]);

  const handleSave = () => {
    console.log('🟣 handleSave button clicked!');
    console.log('🟣 Form values:', form.getValues());
    console.log('🟣 Form errors:', form.formState.errors);

    form.handleSubmit(async (formData) => {
      console.log('🟣 Form validation passed, formData:', formData);

      try {
        console.log('🟣 Calling onSave...');
        await onSave({
          name: formData.name || userName || data.name,
          condition: formData.condition || '',
          bloodType: formData.bloodType || '',
          emergencyNotes: formData.emergencyNotes,
          medications: formData.medications,
          allergies: formData.allergies || '',
          caregiverName: formData.caregiverName || '',
          caregiverRelation: formData.caregiverRelation || '',
          caregiverPhone: formData.caregiverPhone || '',
          caregiverEmail: formData.caregiverEmail || '',
          caregiverAddress: formData.caregiverAddress || '',
          hospitalName: formData.hospitalName || '',
          hospitalPhone: formData.hospitalPhone || '',
        });
        console.log('🟣 onSave completed successfully');
        // onSaveが成功したらモーダルを閉じる（handleSave内でcloseModalを呼んでいるので不要）
        // onClose();
      } catch (error) {
        console.error('🔴 Modal handleSave error:', error);
        // エラーは handleSave 内で Alert 表示されるので、ここでは何もしない
      }
    }, (errors) => {
      console.log('🔴 Form validation failed, errors:', errors);
    })();
  };

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

            <View style={styles.readOnlyField}>
              <Text style={styles.readOnlyLabel}>お名前</Text>
              <Text style={styles.readOnlyValue}>{userName || data.name}</Text>
            </View>

            <FormInput
              name="condition"
              label="状態・役職"
              placeholder="軽度の身体障害"
            />

            <FormInput
              name="bloodType"
              label="血液型"
              placeholder="A型"
            />

            <FormTagInput
              name="emergencyNotes"
              label="緊急時注意事項"
              placeholder="新しい注意事項を追加..."
            />

            <FormTagInput
              name="medications"
              label="服用薬"
              placeholder="新しい薬を追加..."
            />

            <FormInput
              name="allergies"
              label="アレルギー"
              placeholder="なし"
            />

            {/* Emergency Contacts Section */}
            <Text style={styles.sectionTitle}>緊急連絡先</Text>

            <FormInput
              name="caregiverName"
              label="介助者名"
              placeholder="山田花子"
            />

            <FormInput
              name="caregiverRelation"
              label="続柄"
              placeholder="娘"
            />

            <FormInput
              name="caregiverPhone"
              label="介助者電話番号"
              placeholder="090-YYYY-YYYY"
              keyboardType="phone-pad"
            />

            <FormInput
              name="caregiverEmail"
              label="介助者メールアドレス"
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              name="caregiverAddress"
              label="介助者住所"
              placeholder="東京都渋谷区1-2-3"
            />

            <FormInput
              name="hospitalName"
              label="かかりつけ病院"
              placeholder="サンプル病院"
            />

            <FormInput
              name="hospitalPhone"
              label="病院電話番号"
              placeholder="03-XXXX-XXXX"
              keyboardType="phone-pad"
            />
          </Form>
        </ScrollView>

        {/* Bottom Buttons */}
        <FormButtonGroup onCancel={onClose} onSave={handleSave} />
      </KeyboardAvoidingView>
    </Modal>
  );
}
