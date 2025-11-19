import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTextArea } from '@/components/forms';
import { UpdateUserSchema, UpdateUser } from '@/_schema/user';
import { styles } from './styles';

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const form = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: '',
      age: undefined,
      mail: '',
      address: '',
      comment: '',
    },
  });

  const handleSave = form.handleSubmit((data) => {
    console.log('Save profile:', data);
    // TODO: API call to update user profile
    router.back();
  });

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
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          <Form form={form}>
            <FormInput
              name="name"
              label="名前"
              placeholder="山田 太郎"
            />

            <FormInput
              name="age"
              label="年齢"
              placeholder="25"
              keyboardType="numeric"
            />

            <FormInput
              name="mail"
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

            <FormTextArea
              name="comment"
              label="コメント"
              placeholder="自己紹介や備考を入力..."
              numberOfLines={4}
            />
          </Form>
        </ScrollView>
      </View>
    </>
  );
}
