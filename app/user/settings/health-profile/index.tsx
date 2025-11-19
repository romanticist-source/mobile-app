import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, FormTextArea } from '@/components/forms';
import { UpdateUserStatusCardSchema, UpdateUserStatusCard } from '@/_schema/user-status-card';
import { styles } from './styles';

export default function HealthProfileScreen() {
  const router = useRouter();

  const form = useForm<UpdateUserStatusCard>({
    resolver: zodResolver(UpdateUserStatusCardSchema),
    defaultValues: {
      bloodType: '',
      allergy: '',
      medicine: '',
    },
  });

  const handleSave = form.handleSubmit((data) => {
    console.log('Save health profile:', data);
    // TODO: API call to update user status card
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
          <Text style={styles.headerTitle}>健康プロフィール</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          <Form form={form} onSubmit={handleSave}>
            <FormInput
              name="bloodType"
              label="血液型"
              placeholder="A型、B型、O型、AB型"
            />

            <FormTextArea
              name="allergy"
              label="アレルギー"
              placeholder="食物アレルギー、薬物アレルギーなど..."
              numberOfLines={3}
            />

            <FormTextArea
              name="medicine"
              label="服薬情報"
              placeholder="現在服用中の薬、服薬スケジュールなど..."
              numberOfLines={4}
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ※ 緊急時に医療従事者が参照する可能性があります。正確な情報を入力してください。
              </Text>
            </View>
          </Form>
        </ScrollView>
      </View>
    </>
  );
}
