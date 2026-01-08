import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterHelperScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // バリデーション
    if (!name || !nickname || !email || !password || !phoneNumber || !relationship) {
      Alert.alert('エラー', '必須項目を入力してください');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません');
      return;
    }

    if (password.length < 8) {
      Alert.alert('エラー', 'パスワードは8文字以上で入力してください');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Helper登録データ:', {
        role: 'helper',
        name,
        nickname,
        email,
        phoneNumber,
        relationship,
      });

      await register({
        role: 'helper',
        name,
        mail: email,
        password,
        nickname,
        phoneNumber,
        relationship,
      });

      console.log('Helper登録成功');
      router.replace('/helper');
    } catch (error: any) {
      console.error('Helper登録エラー:', error);
      Alert.alert('登録失敗', error.message || '登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.title}>介助者アカウント登録</Text>
          <Text style={styles.subtitle}>介護をサポートする方のアカウントを作成します</Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                名前 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="山田 太郎"
                placeholderTextColor="#AAA"
                autoCapitalize="words"
              />
            </View>

            {/* Nickname */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                ニックネーム <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="太郎さん"
                placeholderTextColor="#AAA"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                メールアドレス <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="example@example.com"
                placeholderTextColor="#AAA"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                電話番号 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="090-1234-5678"
                placeholderTextColor="#AAA"
                keyboardType="phone-pad"
              />
            </View>

            {/* Relationship */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                続柄 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={relationship}
                onChangeText={setRelationship}
                placeholder="例：娘、息子、友人など"
                placeholderTextColor="#AAA"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                パスワード <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="8文字以上"
                placeholderTextColor="#AAA"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                パスワード（確認） <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="パスワードを再入力"
                placeholderTextColor="#AAA"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.registerButtonText}>登録する</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
