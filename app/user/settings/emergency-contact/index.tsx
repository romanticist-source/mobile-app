import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormSelect, SelectOption } from '@/components/forms';
import { CreateEmergencyContactSchema, CreateEmergencyContact } from '@/_schema/emergency-contact';
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

  const form = useForm<CreateEmergencyContact>({
    resolver: zodResolver(CreateEmergencyContactSchema),
    defaultValues: {
      userId: '', // TODO: Get from auth context
      helperId: '', // TODO: Get from helper selection
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
      address: '',
      isMain: false,
    },
  });

  const handleSave = form.handleSubmit((data) => {
    console.log('Save emergency contact:', data);
    // TODO: API call to create emergency contact
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
          <Text style={styles.headerTitle}>緊急連絡先</Text>
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
                  />
                )}
              />
            </View>
          </Form>
        </ScrollView>
      </View>
    </>
  );
}
