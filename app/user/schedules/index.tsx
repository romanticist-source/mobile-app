import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { UserHomeLayout } from '@/components/layouts/UserHomeLayout';
import { BottomNavigation } from '@/components/layouts/BottomNavigation';
import { ScheduleCard, Schedule } from './(components)/ScheduleCard';
import { NextScheduleCard } from './(components)/NextScheduleCard';

export default function SchedulesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data
  const schedules: Schedule[] = [
    {
      id: '1',
      category: '予定',
      time: '10:00',
      title: '通院',
      description: '定期検診',
    },
    {
      id: '2',
      category: '休息',
      time: '14:00',
      title: '休息タイム',
      description: '30分の休憩',
    },
    {
      id: '3',
      category: 'トイレ',
      time: '16:00',
      title: 'トイレタイミング',
    },
  ];

  const handleEdit = (scheduleId: string) => {
    console.log('Edit schedule:', scheduleId);
    setShowAddModal(true);
  };

  const handleDelete = (scheduleId: string) => {
    console.log('Delete schedule:', scheduleId);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <UserHomeLayout>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.appIcon}>
                <Text style={styles.appIconText}>❤️</Text>
              </View>
              <View>
                <Text style={styles.appTitle}>みまもりケア</Text>
                <Text style={styles.appSubtitle}>あなたの健康をサポート</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.userIconContainer}>
                <Text style={styles.userIcon}>👤</Text>
              </View>
              <Text style={styles.userName}>ユーザー名</Text>
            </View>
          </View>

          {/* Page Title and Add Button */}
          <View style={styles.pageHeader}>
            <View style={styles.titleSection}>
              <View style={styles.titleRow}>
                <Text style={styles.pageIcon}>📅</Text>
                <Text style={styles.pageTitle}>スケジュール管理</Text>
              </View>
              <Text style={styles.pageDate}>2025年11月14日金曜日</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ 追加</Text>
            </TouchableOpacity>
          </View>

          {/* Next Schedule Card */}
          <View style={styles.section}>
            <NextScheduleCard
              title="午後のリハビリテーション"
              time="14:00 - 15:00"
            />
          </View>

          {/* Search Bar */}
          <View style={styles.section}>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="スケジュールを検索..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Schedule List */}
          <View style={styles.section}>
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onEdit={() => handleEdit(schedule.id)}
                onDelete={() => handleDelete(schedule.id)}
              />
            ))}
          </View>
        </UserHomeLayout>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="schedule" />

        {/* Add Schedule Modal */}
        <AddScheduleModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </View>
    </>
  );
}

// Add Schedule Modal Component
interface AddScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

function AddScheduleModal({ visible, onClose }: AddScheduleModalProps) {
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
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  userName: {
    fontSize: 14,
    color: '#333333',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  titleSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  pageIcon: {
    fontSize: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  pageDate: {
    fontSize: 14,
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  // Modal Styles
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
