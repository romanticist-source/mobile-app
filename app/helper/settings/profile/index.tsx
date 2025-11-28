import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Form, FormInput, FormSaveButton } from '@/components/forms';
import { getUserById, updateUser } from '@/api/users';
import type { UpdateUser } from '@/_schema';
import { useUser } from '@/contexts/UserContext';
import { styles } from './styles';

interface ProfileFormData {
  name: string;
  age: number;
  mail: string;
  address: string;
}

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { selectedUserId, isLoading: isUserLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      age: null,
      mail: '',
      address: '',
    },
  });

  const formValues = form.watch();

  // Fetch user data on mount
  useEffect(() => {
    if (!selectedUserId || isUserLoading) return;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getUserById(selectedUserId);
        form.reset({
          name: user.name,
          age: user.age,
          mail: user.mail,
          address: user.address || '',
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [selectedUserId, isUserLoading]);

  const handleSave = form.handleSubmit(async (data) => {
    if (!selectedUserId) return;

    try {
      setIsSaving(true);
      const updateData: UpdateUser = {
        name: data.name,
        age: data.age,
        mail: data.mail,
        address: data.address || undefined,
      };
      await updateUser(selectedUserId, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsSaving(false);
    }
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      // Cancel editing - reset form to saved values
      form.reset();
    }
    setIsEditing(!isEditing);
  };

  const handleProfilePhotoChange = () => {
    if (!isEditing) return;
    // TODO: Implement profile photo picker
    console.log('Change profile photo');
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" />
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
          <Text style={styles.headerTitle}>プロフィール設定</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleToggleEdit}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'キャンセル' : '編集'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Profile Photo Section */}
            <View style={styles.photoSection}>
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={handleProfilePhotoChange}
                disabled={!isEditing}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{formValues.name.slice(0, 1)}</Text>
                  {isEditing && (
                    <View style={styles.cameraIconContainer}>
                      <Text style={styles.cameraIcon}>📷</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.photoInfo}>
                <Text style={styles.photoName}>{formValues.name || '山田 太郎'}</Text>
                {isEditing && (
                  <Text style={styles.photoAction}>プロフィール写真を変更</Text>
                )}
              </View>
            </View>

            {/* Basic Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>基本情報</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormInput
                    name="name"
                    label="氏名"
                    placeholder="山田 太郎"
                  />

                  <FormInput
                    name="age"
                    label="年齢"
                    placeholder="30"
                    keyboardType="numeric"
                  />
                </Form>
              ) : (
                <View>
                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>氏名</Text>
                    <Text style={styles.displayValue}>{formValues.name}</Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>年齢</Text>
                    <Text style={styles.displayValue}>{formValues.age}歳</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Contact Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>連絡先情報</Text>

              {isEditing ? (
                <Form form={form}>
                  <FormInput
                    name="mail"
                    label="メールアドレス"
                    placeholder="taro.yamada@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <FormInput
                    name="address"
                    label="住所"
                    placeholder="東京都渋谷区渋谷1-1-1"
                  />
                </Form>
              ) : (
                <View>
                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>メールアドレス</Text>
                    <Text style={styles.displayValue}>{formValues.mail}</Text>
                  </View>

                  <View style={styles.displayField}>
                    <Text style={styles.displayLabel}>住所</Text>
                    <Text style={styles.displayValue}>{formValues.address || '未設定'}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Save Button - Only show in edit mode */}
        {isEditing && <FormSaveButton onSave={handleSave} />}
      </View>
    </>
  );
}
