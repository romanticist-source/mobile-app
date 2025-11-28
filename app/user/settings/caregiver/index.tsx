import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { LoadingState } from '@/components/layouts/LoadingState/LoadingState';
import { ErrorState } from '@/components/layouts/ErrorState/ErrorState';
import { CaregiverCard } from './(components)/CaregiverCard/CaregiverCard';
import { styles } from './styles';
import { useHelperManagement, HelperDisplay } from './(hooks)/useHelperManagement';
import { HelperForm } from './(components)/HelperForm/HelperForm';
import type { CreateHelper } from '@/_schema';

export default function CaregiverManagementScreen() {
  const { helpers, loading, error, addHelper, editHelper, removeHelper, refetch } = useHelperManagement();

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
          <SettingsHeader title="介助者管理" />
          <LoadingState />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <SettingsHeader title="介助者管理" />
          <ErrorState onRetry={refetch} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="介助者管理" />

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
              <CaregiverCard
                key={helper.id}
                helper={helper}
                onMenuPress={handleHelperMenu}
              />
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
