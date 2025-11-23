import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { CaregiverPermissionModal } from './(components)/CaregiverPermissionModal/CaregiverPermissionModal';
import { styles } from './styles';

interface CaregiverPermissions {
  location: boolean;
  health: boolean;
  alerts: boolean;
  emergencyContact: boolean;
}

interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'pending';
  role: string;
  email: string;
  phone: string;
  permissions: CaregiverPermissions;
}

const initialCaregivers: Caregiver[] = [
  {
    id: '1',
    name: '山田 花子',
    avatar: '山',
    status: 'active',
    role: '訪問看護師',
    email: 'hanako@example.com',
    phone: '090-8765-4321',
    permissions: {
      location: true,
      health: true,
      alerts: true,
      emergencyContact: true,
    },
  },
  {
    id: '2',
    name: '佐藤 健介',
    avatar: '佐',
    status: 'active',
    role: '訪問看護師',
    email: 'sato@nursing.com',
    phone: '080-1234-5678',
    permissions: {
      location: true,
      health: true,
      alerts: true,
      emergencyContact: false,
    },
  },
];

export default function CaregiverManagementScreen() {
  const router = useRouter();
  const [caregivers, setCaregivers] = useState<Caregiver[]>(initialCaregivers);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInviteCaregiver = () => {
    console.log('Invite caregiver');
    // TODO: Implement invite caregiver functionality
  };

  const handleTogglePermission = (caregiverId: string, permission: keyof CaregiverPermissions) => {
    setCaregivers((prev) =>
      prev.map((caregiver) =>
        caregiver.id === caregiverId
          ? {
              ...caregiver,
              permissions: {
                ...caregiver.permissions,
                [permission]: !caregiver.permissions[permission],
              },
            }
          : caregiver
      )
    );
  };

  const handleCaregiverMenu = (caregiverId: string) => {
    const caregiver = caregivers.find((c) => c.id === caregiverId);
    if (caregiver) {
      setSelectedCaregiver(caregiver);
      setModalVisible(true);
    }
  };

  const handleSavePermissions = (permissions: CaregiverPermissions) => {
    if (selectedCaregiver) {
      setCaregivers((prev) =>
        prev.map((caregiver) =>
          caregiver.id === selectedCaregiver.id
            ? { ...caregiver, permissions }
            : caregiver
        )
      );
    }
  };

  const handleDeleteCaregiver = () => {
    if (selectedCaregiver) {
      setCaregivers((prev) => prev.filter((c) => c.id !== selectedCaregiver.id));
      setModalVisible(false);
      setSelectedCaregiver(null);
    }
  };

  const handleSave = () => {
    console.log('Save caregiver settings:', caregivers);
    // TODO: API call to update caregiver permissions
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
          <Text style={styles.headerTitle}>介助者管理</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Header Section with Count and Invite Button */}
            <View style={styles.topSection}>
              <Text style={styles.caregiverCount}>
                登録介助者: {caregivers.length}名
              </Text>
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={handleInviteCaregiver}
              >
                <Text style={styles.inviteIcon}>👥</Text>
                <Text style={styles.inviteButtonText}>介助者を招待</Text>
              </TouchableOpacity>
            </View>

            {/* Caregiver List */}
            {caregivers.map((caregiver) => (
              <View key={caregiver.id} style={styles.caregiverCard}>
                {/* Avatar and Basic Info */}
                <View style={styles.caregiverHeader}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>{caregiver.avatar}</Text>
                    </View>
                  </View>

                  <View style={styles.caregiverInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.caregiverName}>{caregiver.name}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          caregiver.status === 'active'
                            ? styles.statusBadgeActive
                            : styles.statusBadgePending,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            caregiver.status === 'active'
                              ? styles.statusBadgeTextActive
                              : styles.statusBadgeTextPending,
                          ]}
                        >
                          {caregiver.status === 'active' ? 'アクティブ' : '承認待ち'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.caregiverRole}>{caregiver.role}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => handleCaregiverMenu(caregiver.id)}
                  >
                    <Text style={styles.menuIcon}>⋮</Text>
                  </TouchableOpacity>
                </View>

                {/* Contact Information */}
                <View style={styles.contactInfo}>
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIcon}>✉️</Text>
                    <Text style={styles.contactText}>{caregiver.email}</Text>
                  </View>
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIcon}>📞</Text>
                    <Text style={styles.contactText}>{caregiver.phone}</Text>
                  </View>
                </View>

                {/* Permission Buttons */}
                <View style={styles.permissionButtons}>
                  <TouchableOpacity
                    style={[
                      styles.permissionButton,
                      caregiver.permissions.location && styles.permissionButtonActive,
                    ]}
                    onPress={() => handleTogglePermission(caregiver.id, 'location')}
                  >
                    <Text
                      style={[
                        styles.permissionIcon,
                        caregiver.permissions.location && styles.permissionIconActive,
                      ]}
                    >
                      📍
                    </Text>
                    <Text
                      style={[
                        styles.permissionButtonText,
                        caregiver.permissions.location && styles.permissionButtonTextActive,
                      ]}
                    >
                      位置情報
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.permissionButton,
                      caregiver.permissions.health && styles.permissionButtonActive,
                    ]}
                    onPress={() => handleTogglePermission(caregiver.id, 'health')}
                  >
                    <Text
                      style={[
                        styles.permissionIcon,
                        caregiver.permissions.health && styles.permissionIconActive,
                      ]}
                    >
                      💚
                    </Text>
                    <Text
                      style={[
                        styles.permissionButtonText,
                        caregiver.permissions.health && styles.permissionButtonTextActive,
                      ]}
                    >
                      健康情報
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.permissionButton,
                      caregiver.permissions.alerts && styles.permissionButtonActive,
                    ]}
                    onPress={() => handleTogglePermission(caregiver.id, 'alerts')}
                  >
                    <Text
                      style={[
                        styles.permissionIcon,
                        caregiver.permissions.alerts && styles.permissionIconActive,
                      ]}
                    >
                      🚨
                    </Text>
                    <Text
                      style={[
                        styles.permissionButtonText,
                        caregiver.permissions.alerts && styles.permissionButtonTextActive,
                      ]}
                    >
                      アラート
                    </Text>
                  </TouchableOpacity>
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

        {/* Caregiver Permission Modal */}
        {selectedCaregiver && (
          <CaregiverPermissionModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              setSelectedCaregiver(null);
            }}
            caregiverName={selectedCaregiver.name}
            initialPermissions={selectedCaregiver.permissions}
            onSave={handleSavePermissions}
            onDelete={handleDeleteCaregiver}
          />
        )}
      </View>
    </>
  );
}
