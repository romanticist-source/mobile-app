import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalSaveButton: {
    padding: 8,
  },
  modalSaveIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formField: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  fieldInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
  },
  fieldPlaceholder: {
    color: '#CCCCCC',
  },
  fieldTextArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  fieldSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldSelectorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  fieldSelectorArrow: {
    fontSize: 20,
    color: '#CCCCCC',
  },
});
