import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from './styles';
import { useHelperManagement, HelperDisplay } from './(hooks)/useHelperManagement';
import { HelperForm } from './(components)/HelperForm/HelperForm';
import type { CreateHelper } from '@/_schema';

export default function CaregiverManagementScreen() {
  const router = useRouter();
  const { helpers, loading, error, saving, addHelper, editHelper, removeHelper, refetch } = useHelperManagement();

  const [formVisible, setFormVisible] = useState(false);
  const [editingHelper, setEditingHelper] = useState<HelperDisplay | undefined>(undefined);

  const handleAddHelper = () => {
    setEditingHelper(undefined);
    setFormVisible(true);
  };

  const handleEditHelper = (helper: HelperDisplay) => {
    setEditingHelper(helper);
    setFormVisible(true);
  };

  const handleFormSubmit = async (data: CreateHelper) => {
    if (editingHelper) {
      await editHelper(editingHelper.id, data);
    } else {
      await addHelper(data);
    }
  };

  const handleDeleteHelper = (helper: HelperDisplay) => {
    Alert.alert(
      '介助者を削除',
      `${helper.name}さんを削除しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeHelper(helper.id);
            } catch (err) {
              Alert.alert('エラー', '削除に失敗しました');
            }
          },
        },
      ]
    );
  };

  const handleHelperMenu = (helper: HelperDisplay) => {
    Alert.alert(
      helper.name,
      '操作を選択してください',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '編集', onPress: () => handleEditHelper(helper) },
        { text: '削除', style: 'destructive', onPress: () => handleDeleteHelper(helper) },
      ]
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
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
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>読み込み中...</Text>
          </View>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
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
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={48} color="#F44336" />
            <Text style={styles.errorText}>読み込みに失敗しました</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>再読み込み</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

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
            {/* Header Section with Count and Add Button */}
            <View style={styles.topSection}>
              <Text style={styles.caregiverCount}>
                登録介助者: {helpers.length}名
              </Text>
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={handleAddHelper}
              >
                <MaterialIcons name="person-add" size={18} color="#FFFFFF" />
                <Text style={styles.inviteButtonText}>介助者を追加</Text>
              </TouchableOpacity>
            </View>

            {/* Empty State */}
            {helpers.length === 0 && (
              <View style={styles.emptyState}>
                <MaterialIcons name="people-outline" size={48} color="#CCCCCC" />
                <Text style={styles.emptyStateText}>登録された介助者がいません</Text>
                <Text style={styles.emptyStateSubtext}>
                  「介助者を追加」ボタンから追加してください
                </Text>
              </View>
            )}

            {/* Helper List */}
            {helpers.map((helper) => (
              <View key={helper.id} style={styles.caregiverCard}>
                {/* Avatar and Basic Info */}
                <View style={styles.caregiverHeader}>
                  <View style={styles.avatarContainer}>
                    <View style={[styles.avatarCircle, { backgroundColor: helper.avatarColor }]}>
                      <Text style={styles.avatarText}>{helper.avatar}</Text>
                    </View>
                  </View>

                  <View style={styles.caregiverInfo}>
                    <Text style={styles.caregiverName}>{helper.name}</Text>
                    <Text style={styles.caregiverRole}>{helper.nickname}</Text>
                    <Text style={styles.caregiverRelation}>{helper.relationship}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => handleHelperMenu(helper)}
                  >
                    <MaterialIcons name="more-vert" size={20} color="#666666" />
                  </TouchableOpacity>
                </View>

                {/* Contact Information */}
                <View style={styles.contactInfo}>
                  <View style={styles.contactRow}>
                    <MaterialIcons name="email" size={16} color="#666666" style={styles.contactIcon} />
                    <Text style={styles.contactText}>{helper.email}</Text>
                  </View>
                  <View style={styles.contactRow}>
                    <MaterialIcons name="phone" size={16} color="#666666" style={styles.contactIcon} />
                    <Text style={styles.contactText}>{helper.phoneNumber}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Helper Form Modal */}
        <HelperForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
          onSubmit={handleFormSubmit}
          initialData={editingHelper}
          isEditing={!!editingHelper}
        />
      </View>
    </>
  );
}
