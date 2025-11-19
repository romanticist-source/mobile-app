import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTextArea, FormDateTimePicker, FormSelect, SelectOption } from '@/components/forms';
import { addScheduleFormSchema, AddScheduleFormData } from './schema';
import { styles } from './styles';

const scheduleTypeOptions: SelectOption[] = [
  { label: '予定', value: '予定' },
  { label: '休息', value: '休息' },
  { label: 'トイレ', value: 'トイレ' },
  { label: '服薬', value: '服薬' },
  { label: '食事', value: '食事' },
  { label: '運動', value: '運動' },
  { label: 'その他', value: 'その他' },
];

const repeatOptions: SelectOption[] = [
  { label: 'しない', value: 'none' },
  { label: '毎日', value: 'daily' },
  { label: '毎週', value: 'weekly' },
  { label: '毎月', value: 'monthly' },
];

interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddScheduleModal({ visible, onClose }: AddScheduleModalProps) {
  // デフォルトの開始時刻（現在時刻から1時間後）
  const getDefaultStartTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  };

  // デフォルトの終了時刻（開始時刻から1時間後）
  const getDefaultEndTime = () => {
    const start = getDefaultStartTime();
    start.setHours(start.getHours() + 1);
    return start;
  };

  const form = useForm<AddScheduleFormData>({
    resolver: zodResolver(addScheduleFormSchema),
    defaultValues: {
      title: '',
      scheduleType: '',
      startTime: getDefaultStartTime(),
      endTime: getDefaultEndTime(),
      repeatPattern: 'none',
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
        <Form form={form} style={styles.modalContent}>
          <FormInput
            name="title"
            label="タイトル"
            required
            placeholder="スケジュールのタイトルを入力"
          />

          <FormSelect
            name="scheduleType"
            label="カテゴリ"
            required
            options={scheduleTypeOptions}
            placeholder="カテゴリを選択"
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

          <FormSelect
            name="repeatPattern"
            label="繰り返し"
            options={repeatOptions}
            placeholder="繰り返しパターンを選択"
          />

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

