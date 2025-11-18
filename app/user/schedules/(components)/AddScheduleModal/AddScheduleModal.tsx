import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddScheduleModal({ visible, onClose }: AddScheduleModalProps) {
  const [title, setTitle] = useState('');
  const [startTime] = useState('');
  const [endTime] = useState('');
  const [memo, setMemo] = useState('');

  const handleSave = () => {
    console.log('Save schedule:', { title, startTime, endTime, memo });
    onClose();
  };

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
        <View style={styles.modalContent}>
          {/* Title Field */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>タイトル</Text>
            <TextInput
              style={styles.fieldInput}
              value={title}
              onChangeText={setTitle}
              placeholder=""
              placeholderTextColor="#CCCCCC"
            />
          </View>

          {/* Start Time Field */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>開始</Text>
            <TouchableOpacity style={styles.fieldInput}>
              <Text style={styles.fieldPlaceholder}>{startTime || ''}</Text>
            </TouchableOpacity>
          </View>

          {/* End Time Field */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>終了</Text>
            <TouchableOpacity style={styles.fieldInput}>
              <Text style={styles.fieldPlaceholder}>{endTime || ''}</Text>
            </TouchableOpacity>
          </View>

          {/* Repeat Field */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>繰り返し</Text>
            <TouchableOpacity style={styles.fieldSelector}>
              <Text style={styles.fieldSelectorText}>しない</Text>
              <Text style={styles.fieldSelectorArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Memo Field */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>メモ</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldTextArea]}
              value={memo}
              onChangeText={setMemo}
              placeholder="備考や注意事項を入力..."
              placeholderTextColor="#CCCCCC"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

