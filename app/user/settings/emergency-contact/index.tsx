import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Modal, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Form, FormInput, FormSelect, FormButtonGroup, SelectOption } from '@/components/forms';
import { CreateEmergencyContactSchema, CreateEmergencyContact, EmergencyContact, UpdateEmergencyContact } from '@/_schema/emergency-contact';
import { getEmergencyContactsByUserId, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from '@/api/emergency-contacts';
import { useUser } from '@/contexts/UserContext';
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

export default function EmergencyContactScreen() {
  const router = useRouter();
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  const form = useForm<CreateEmergencyContact>({
    resolver: zodResolver(CreateEmergencyContactSchema),
    defaultValues: {
      userId: selectedUserId || '',
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
    if (!selectedUserId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getEmergencyContactsByUserId(selectedUserId);
      setContacts(data);
    } catch (err) {
      console.error('Failed to fetch emergency contacts:', err);
      setError('緊急連絡先の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [selectedUserId]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Open modal for adding new contact
  const handleAdd = () => {
    if (!selectedUserId) return;

    setEditingContact(null);
    form.reset({
      userId: selectedUserId,
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>緊急連絡先</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
          >
            <MaterialIcons name="add" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchContacts}>
                <Text style={styles.retryButtonText}>再試行</Text>
              </TouchableOpacity>
            </View>
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
                <View key={`${contact.userId}-${contact.helperId}`} style={styles.contactCard}>
                  <TouchableOpacity
                    style={styles.contactContent}
                    onPress={() => handleEdit(contact)}
                  >
                    <View style={styles.contactHeader}>
                      <View style={styles.contactInfo}>
                        <View style={styles.nameRow}>
                          <Text style={styles.contactName}>{contact.name}</Text>
                          {contact.isMain && (
                            <View style={styles.mainBadge}>
                              <Text style={styles.mainBadgeText}>メイン</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(contact)}
                      >
                        <MaterialIcons name="delete" size={20} color="#FF6B6B" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.contactDetails}>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="phone" size={16} color="#666666" />
                        <Text style={styles.detailText}>{contact.phoneNumber}</Text>
                      </View>
                      {contact.email && (
                        <View style={styles.detailRow}>
                          <MaterialIcons name="email" size={16} color="#666666" />
                          <Text style={styles.detailText}>{contact.email}</Text>
                        </View>
                      )}
                      {contact.address && (
                        <View style={styles.detailRow}>
                          <MaterialIcons name="location-on" size={16} color="#666666" />
                          <Text style={styles.detailText}>{contact.address}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
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
