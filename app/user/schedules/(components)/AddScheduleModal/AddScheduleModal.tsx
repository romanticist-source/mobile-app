import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTextArea, FormDateTimePicker } from '@/components/forms';
import { addScheduleFormSchema, AddScheduleFormData } from './schema';
import { styles } from './styles';

interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddScheduleModal({ visible, onClose }: AddScheduleModalProps) {
  const form = useForm<AddScheduleFormData>({
    resolver: zodResolver(addScheduleFormSchema),
    defaultValues: {
      title: '',
      scheduleType: '予定',
      isRepeat: false,
      memo: '',
    },
  });

  const handleSave = form.handleSubmit((data) => {
    console.log('Save schedule:', data);
    // TODO: API call to save schedule
    form.reset();
    onClose();
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>新規スケジュール</Text>
          <TouchableOpacity onPress={handleSave} style={styles.modalSaveButton}>
            <Text style={styles.modalSaveIcon}>✓</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Content */}
        <Form form={form} onSubmit={handleSave} style={styles.modalContent}>
          <FormInput
            name="title"
            label="タイトル"
            required
            placeholder="スケジュールのタイトルを入力"
          />

          <FormDateTimePicker
            name="startTime"
            label="開始"
            required
            mode="time"
          />

          <FormDateTimePicker
            name="endTime"
            label="終了"
            required
            mode="time"
          />

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>繰り返し</Text>
            <TouchableOpacity style={styles.fieldSelector}>
              <Text style={styles.fieldSelectorText}>しない</Text>
              <Text style={styles.fieldSelectorArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <FormTextArea
            name="memo"
            label="メモ"
            placeholder="備考や注意事項を入力..."
            numberOfLines={4}
          />
        </Form>
      </View>
    </Modal>
  );
}

