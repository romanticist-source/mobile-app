import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Form, FormInput, FormSelect, FormDateTimePicker, type SelectOption } from '@/components/forms';
import { styles } from './styles';

const genderOptions: SelectOption[] = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
  { label: '回答しない', value: 'other' },
];

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      furigana: '',
      birthdate: undefined,
      gender: '',
      phone: '',
      mail: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactAddress: '',
    },
  });

  const handleSave = form.handleSubmit((data) => {
    console.log('Save profile:', data);
    // TODO: API call to update user profile
    router.back();
  });

  const handleProfilePhotoChange = () => {
    // TODO: Implement profile photo picker
    console.log('Change profile photo');
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
          <Text style={styles.headerTitle}>プロフィール設定</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Profile Photo Section */}
            <View style={styles.photoSection}>
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={handleProfilePhotoChange}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>山</Text>
                  <View style={styles.cameraIconContainer}>
                    <Text style={styles.cameraIcon}>📷</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.photoInfo}>
                <Text style={styles.photoName}>山田 太郎</Text>
                <Text style={styles.photoAction}>プロフィール写真を変更</Text>
              </View>
            </View>

            {/* Basic Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>基本情報</Text>

              <Form form={form}>
                <FormInput
                  name="name"
                  label="氏名"
                  placeholder="山田 太郎"
                />

                <FormInput
                  name="furigana"
                  label="ふりがな"
                  placeholder="やまだ たろう"
                />

                <FormDateTimePicker
                  name="birthdate"
                  label="生年月日"
                  mode="date"
                />

                <FormSelect
                  name="gender"
                  label="性別"
                  options={genderOptions}
                  placeholder="選択してください"
                />
              </Form>
            </View>

            {/* Contact Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>連絡先情報</Text>

              <Form form={form}>
                <FormInput
                  name="phone"
                  label="電話番号"
                  placeholder="090-1234-5678"
                  keyboardType="phone-pad"
                />

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
            </View>
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
