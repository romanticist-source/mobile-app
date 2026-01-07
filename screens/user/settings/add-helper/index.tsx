import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SettingsHeader } from '@/components/layouts/SettingsHeader/SettingsHeader';
import { useAddHelper } from './(hooks)/useAddHelper';
import { styles } from './styles';

export default function AddHelperScreen() {
  const router = useRouter();
  const { loading, error, sendRequest } = useAddHelper();
  const [helperEmail, setHelperEmail] = useState('');

  const handleSendRequest = async () => {
    if (!helperEmail.trim()) {
      Alert.alert('エラー', '介助者のメールアドレスを入力してください');
      return;
    }

    // 簡易的なメールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(helperEmail)) {
      Alert.alert('エラー', '有効なメールアドレスを入力してください');
      return;
    }

    const success = await sendRequest(helperEmail);

    if (success) {
      Alert.alert(
        '送信完了',
        `${helperEmail} にリクエストを送信しました。\n介助者が承認するまでお待ちください。`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      Alert.alert('エラー', error || 'リクエストの送信に失敗しました');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <SettingsHeader title="介助者を追加" />

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <MaterialIcons name="person-add" size={64} color="#FF6B6B" />
          </View>

          {/* Description */}
          <Text style={styles.description}>
            介助者として登録したい方のメールアドレスを入力してください。
            {'\n'}
            相手が承認すると、情報を共有できるようになります。
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>介助者のメールアドレス</Text>
            <TextInput
              style={styles.input}
              value={helperEmail}
              onChangeText={setHelperEmail}
              placeholder="example@example.com"
              placeholderTextColor="#AAA"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color="#FF3366" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Send Button */}
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={handleSendRequest}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <MaterialIcons name="send" size={20} color="#FFFFFF" />
                <Text style={styles.sendButtonText}>リクエストを送信</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <MaterialIcons name="info-outline" size={20} color="#666666" />
            <Text style={styles.infoText}>
              リクエストは相手のアプリに通知されます。承認されるまで情報は共有されません。
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
