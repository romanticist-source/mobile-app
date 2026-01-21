import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles, logoStyles } from './styles';
import { useAuth } from '@/contexts/AuthContext';

const logoImage = require('../../assets/images/mielink_logo2.png');

// キャッチフレーズのコンポーネント
function Catchphrase() {
  return (
    <View style={logoStyles.catchphraseContainer}>
      <Text style={logoStyles.catchphraseLine1}>誰もが快適に。</Text>
      <Text style={logoStyles.catchphraseLine2}>暮らせる社会のために。</Text>
    </View>
  );
}

// ロゴ画像を直接表示するコンポーネント
function MielinkLogo() {
  return (
    <View style={logoStyles.logoContainer}>
      <Image
        source={logoImage}
        style={logoStyles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }

    setIsLoading(true);
    try {
      await login({ mail: email, password });
      // ログイン成功後、ルートにリダイレクト（roleに応じて自動遷移）
      router.replace('/');
    } catch (error: any) {
      Alert.alert('ログイン失敗', error.message || 'メールアドレスまたはパスワードが正しくありません');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/role-select");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* キャッチフレーズ */}
          <Catchphrase />

          {/* ロゴ */}
          <MielinkLogo />

          {/* ログインフォーム */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="メールアドレス"
              placeholderTextColor="#AAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextInput
              style={styles.input}
              placeholder="パスワード"
              placeholderTextColor="#AAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />

            {/* ログインボタン */}
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>ログイン</Text>
              )}
            </TouchableOpacity>

            {/* 新規登録ボタン */}
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerButton}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>新規登録</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
