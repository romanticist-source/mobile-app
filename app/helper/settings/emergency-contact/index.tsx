import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Modal, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Form, FormInput, FormSelect, FormButtonGroup, SelectOption } from '@/components/forms';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { LoadingState } from '@/components/layouts/LoadingState/LoadingState';
import { ErrorState } from '@/components/layouts/ErrorState/ErrorState';
import { EmergencyContactCard } from '@/components/features/settings/emergency-contact/EmergencyContactCard/EmergencyContactCard';
import { CreateEmergencyContactSchema, CreateEmergencyContact, EmergencyContact, UpdateEmergencyContact } from '@/_schema/emergency-contact';
import { getEmergencyContactsByUserId, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from '@/api/emergency-contacts';
import { useHelperUserConnection } from '@/hooks/useHelperUserConnection';
import { styles } from './styles';

const relationshipOptions: SelectOption[] = [
  { label: '配偶者', value: '配偶者' },
  { label: '父', value: '父' },
  { label: '母', value: '母' },
  { label: '息子', value: '息子' },
  { label: '娘', value: '娘' },
  { label: '兄弟', value: '兄弟' },
  { label: '姉妹', value: '姉妹' },
  { label: '友人', value: '友人' },
  { label: 'その他', value: 'その他' },
];

export default function HelperEmergencyContactScreen() {
  const { userId, loading: connectionLoading } = useHelperUserConnection();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  // Debug: Log userId changes
  useEffect(() => {
    console.log('[EmergencyContact Screen] userId changed:', userId);
  }, [userId]);

  const form = useForm<CreateEmergencyContact>({
    resolver: zodResolver(CreateEmergencyContactSchema),
    defaultValues: {
      userId: userId || '',
      helperId: '',
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
      address: '',
      isMain: false,
    },
  });

  // Fetch emergency contacts
  const fetchContacts = useCallback(async () => {
    if (!userId || connectionLoading) {
      console.log('[EmergencyContact] ⏸️ Waiting for userId...', { userId, connectionLoading });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('========================================');
      console.log('[EmergencyContact] 📞 緊急連絡先を取得中...');
      console.log('[EmergencyContact] 使用するuserId:', userId);
      console.log('[EmergencyContact] APIエンドポイント: /emergency-contacts/user/' + userId);

      // Use userId from helper-user connection
      const data = await getEmergencyContactsByUserId(userId);

      console.log('[EmergencyContact] ✅ APIレスポンス受信');
      console.log('[EmergencyContact] 取得件数:', data.length);
      console.log('[EmergencyContact] 連絡先一覧:', data.map(c => ({
        名前: c.name,
        userId: c.userId,
        helperId: c.helperId,
        続柄: c.relationship,
      })));
      console.log('========================================');

      setContacts(data);
    } catch (err) {
      console.error('[EmergencyContact] ❌ エラー発生:', err);
      setError('緊急連絡先の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [userId, connectionLoading]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Open modal for adding new contact
  const handleAdd = () => {
    if (!userId) return;

    setEditingContact(null);
    form.reset({
      userId: userId,
      helperId: `helper-${Date.now()}`, // Generate temporary ID
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
      address: '',
      isMain: false,
    });
    setModalVisible(true);
  };

  // Open modal for editing existing contact
  const handleEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    form.reset({
      userId: contact.userId,
      helperId: contact.helperId,
      name: contact.name,
      relationship: contact.relationship,
      phoneNumber: contact.phoneNumber,
      email: contact.email || '',
      address: contact.address || '',
      isMain: contact.isMain,
    });
    setModalVisible(true);
  };

  // Delete contact
  const handleDelete = (contact: EmergencyContact) => {
    Alert.alert(
      '削除の確認',
      `${contact.name}を削除しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEmergencyContact(contact.userId, contact.helperId);
              await fetchContacts();
            } catch (err) {
              console.error('Failed to delete emergency contact:', err);
              Alert.alert('エラー', '削除に失敗しました');
            }
          },
        },
      ]
    );
  };

  // Save contact (create or update)
  const handleSave = form.handleSubmit(async (data) => {
    try {
      setSaving(true);
      if (editingContact) {
        // Update existing contact
        const updateData: UpdateEmergencyContact = {
          name: data.name,
          relationship: data.relationship,
          phoneNumber: data.phoneNumber,
          email: data.email || undefined,
          address: data.address || undefined,
          isMain: data.isMain,
        };
        await updateEmergencyContact(editingContact.userId, editingContact.helperId, updateData);
      } else {
        // Create new contact
        const createData: CreateEmergencyContact = {
          userId: data.userId,
          helperId: data.helperId,
          name: data.name,
          relationship: data.relationship,
          phoneNumber: data.phoneNumber,
          email: data.email || undefined,
          address: data.address || undefined,
          isMain: data.isMain,
        };
        await createEmergencyContact(createData);
      }
      setModalVisible(false);
      await fetchContacts();
    } catch (err) {
      console.error('Failed to save emergency contact:', err);
      Alert.alert('エラー', '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  });

  const closeModal = () => {
    setModalVisible(false);
    setEditingContact(null);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader
          title="緊急連絡先"
          rightAction={{
            label: '+',
            onPress: handleAdd,
          }}
        />

        {/* Content */}
        <ScrollView style={styles.content}>
          {loading ? (
            <LoadingState color="#FF6B6B" />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchContacts} retryButtonText="再試行" />
          ) : contacts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="contact-phone" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>緊急連絡先が登録されていません</Text>
              <TouchableOpacity style={styles.emptyAddButton} onPress={handleAdd}>
                <Text style={styles.emptyAddButtonText}>追加する</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contactList}>
              {contacts.map((contact) => (
                <EmergencyContactCard
                  key={`${contact.userId}-${contact.helperId}`}
                  contact={contact}
                  onPress={() => handleEdit(contact)}
                  onDelete={() => handleDelete(contact)}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* Add/Edit Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editingContact ? '緊急連絡先を編集' : '緊急連絡先を追加'}
                </Text>
                <TouchableOpacity onPress={closeModal}>
                  <MaterialIcons name="close" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <Form form={form}>
                  <FormInput
                    name="name"
                    label="名前"
                    required
                    placeholder="山田 花子"
                  />

                  <FormSelect
                    name="relationship"
                    label="続柄"
                    required
                    options={relationshipOptions}
                    placeholder="続柄を選択"
                  />

                  <FormInput
                    name="phoneNumber"
                    label="電話番号"
                    required
                    placeholder="090-1234-5678"
                    keyboardType="phone-pad"
                  />

                  <FormInput
                    name="email"
                    label="メールアドレス"
                    placeholder="example@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <FormInput
                    name="address"
                    label="住所"
                    placeholder="東京都渋谷区..."
                  />

                  <View style={styles.switchField}>
                    <Text style={styles.switchLabel}>メイン連絡先</Text>
                    <Controller
                      name="isMain"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          value={value}
                          onValueChange={onChange}
                          trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                          thumbColor={value ? '#FF6B6B' : '#F3F4F6'}
                        />
                      )}
                    />
                  </View>
                </Form>
              </ScrollView>

              <FormButtonGroup
                onCancel={closeModal}
                onSave={handleSave}
                loading={saving}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
