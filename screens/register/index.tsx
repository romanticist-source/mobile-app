import { useRouter } from "expo-router";
import { useState } from "react";
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
} from "react-native";
import { styles } from "./styles";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // バリデーション
    if (!name || !email || !password || !age) {
      Alert.alert("エラー", "必須項目を入力してください");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("エラー", "パスワードが一致しません");
      return;
    }

    if (password.length < 8) {
      Alert.alert("エラー", "パスワードは8文字以上で入力してください");
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert("エラー", "年齢は正しい数値を入力してください");
      return;
    }

    setIsLoading(true);
    try {
      console.log('登録データ:', {
        name,
        mail: email,
        password: '***',
        age: ageNumber,
        address,
        comment,
      });

      await register({
        role: 'user',
        name,
        mail: email,
        password,
        age: ageNumber,
        address: address || undefined,
        comment: comment || undefined,
      });

      console.log('登録成功');
      router.replace("/user");
    } catch (error: any) {
      console.error('登録エラー:', error);
      console.error('エラーメッセージ:', error.message);
      console.error('エラーコード:', error.errorCode);

      Alert.alert(
        "登録失敗",
        error.message || "登録に失敗しました。もう一度お試しください"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>新規登録</Text>

          <View style={styles.formContainer}>
            {/* 必須項目 */}
            <Text style={styles.sectionTitle}>必須項目</Text>

            <Text style={styles.label}>
              名前 <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="田中 太郎"
              placeholderTextColor="#AAA"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text style={styles.label}>
              メールアドレス <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              placeholderTextColor="#AAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Text style={styles.label}>
              パスワード <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="8文字以上"
              placeholderTextColor="#AAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Text style={styles.label}>
              パスワード（確認） <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="パスワードを再入力"
              placeholderTextColor="#AAA"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Text style={styles.label}>
              年齢 <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="65"
              placeholderTextColor="#AAA"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />

            {/* 任意項目 */}
            <Text style={styles.sectionTitle}>任意項目</Text>

            <Text style={styles.label}>住所</Text>
            <TextInput
              style={styles.input}
              placeholder="東京都渋谷区..."
              placeholderTextColor="#AAA"
              value={address}
              onChangeText={setAddress}
              autoCapitalize="words"
            />

            <Text style={styles.label}>備考・特記事項</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="特記事項があれば入力してください"
              placeholderTextColor="#AAA"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* 登録ボタン */}
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.registerButtonText}>登録する</Text>
              )}
            </TouchableOpacity>

            {/* 戻るボタン */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              disabled={isLoading}
            >
              <Text style={styles.backButtonText}>ログイン画面に戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
