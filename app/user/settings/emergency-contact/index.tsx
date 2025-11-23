import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styles } from './styles';

interface EmergencyContact {
  id: string;
  name: string;
  avatar: string;
  relationship: string;
  phoneNumber: string;
  isPrimary: boolean;
  isFavorite: boolean;
}

export default function EmergencyContactScreen() {
  const router = useRouter();

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: '山田花子',
      avatar: '山',
      relationship: '娘',
      phoneNumber: '090-XXXX-XXXX',
      isPrimary: true,
      isFavorite: true,
    },
    {
      id: '2',
      name: '佐藤健太',
      avatar: '佐',
      relationship: '息子',
      phoneNumber: '090-YYYY-YYYY',
      isPrimary: false,
      isFavorite: false,
    },
    {
      id: '3',
      name: 'サンプル病院',
      avatar: 'サ',
      relationship: 'かかりつけ病院',
      phoneNumber: '03-XXXX-XXXX',
      isPrimary: false,
      isFavorite: false,
    },
  ]);

  const handleAddContact = () => {
    console.log('Add contact');
    // TODO: Navigate to add contact screen
  };

  const handleCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  const handleToggleFavorite = (contactId: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  const handleEdit = (contactId: string) => {
    console.log('Edit contact:', contactId);
    // TODO: Navigate to edit contact screen
  };

  const handleDelete = (contactId: string) => {
    console.log('Delete contact:', contactId);
    // TODO: Show confirmation dialog and delete
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleSave = () => {
    console.log('Save emergency contacts:', contacts);
    // TODO: API call to update emergency contacts
    router.back();
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
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>緊急連絡先</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Section Header with Add Button */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Text style={styles.sectionIcon}>📞</Text>
                <Text style={styles.sectionTitle}>緊急連絡先</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddContact}
              >
                <Text style={styles.addButtonIcon}>+</Text>
                <Text style={styles.addButtonText}>追加</Text>
              </TouchableOpacity>
            </View>

            {/* Contact Cards */}
            {contacts.map((contact) => (
              <View
                key={contact.id}
                style={[
                  styles.contactCard,
                  contact.isPrimary && styles.contactCardPrimary,
                ]}
              >
                {/* Avatar and Info */}
                <View style={styles.contactHeader}>
                  <View style={styles.avatarContainer}>
                    <View
                      style={[
                        styles.avatarCircle,
                        contact.isPrimary && styles.avatarCirclePrimary,
                      ]}
                    >
                      <Text
                        style={[
                          styles.avatarText,
                          contact.isPrimary && styles.avatarTextPrimary,
                        ]}
                      >
                        {contact.avatar}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.contactInfo}>
                    <View style={styles.nameRow}>
                      <Text
                        style={[
                          styles.contactName,
                          contact.isPrimary && styles.contactNamePrimary,
                        ]}
                      >
                        {contact.name}
                      </Text>
                      {contact.isPrimary && (
                        <Text style={styles.primaryStar}>⭐</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.contactRelationship,
                        contact.isPrimary && styles.contactRelationshipPrimary,
                      ]}
                    >
                      {contact.relationship}
                    </Text>
                    <Text
                      style={[
                        styles.contactPhone,
                        contact.isPrimary && styles.contactPhonePrimary,
                      ]}
                    >
                      {contact.phoneNumber}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  {/* Call Button */}
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCall(contact.phoneNumber)}
                  >
                    <Text style={styles.callButtonIcon}>📞</Text>
                    <Text style={styles.callButtonText}>電話をかける</Text>
                  </TouchableOpacity>

                  {/* Icon Buttons */}
                  <View style={styles.iconButtons}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleToggleFavorite(contact.id)}
                    >
                      <Text style={styles.iconButtonText}>
                        {contact.isFavorite ? '⭐' : '☆'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleEdit(contact.id)}
                    >
                      <Text style={styles.iconButtonText}>✏️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleDelete(contact.id)}
                    >
                      <Text style={styles.iconButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonIcon}>💾</Text>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
