import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, Platform } from "react-native";
import { styles, logoStyles } from './styles';
import AuthComponent from "./login";


const logoImage = require('../../assets/images/logo.png');

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
      {/* 実際に提供されたPNG画像を表示 */}
      <Image
        source={logoImage}
        style={logoStyles.logoImage}
        resizeMode="contain"
      />
      {/* 画像に「ミエリンク」のテキストが含まれているため、ここではテキストは不要です。 */}
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // 一時的にログインをスキップ（開発用）
    router.replace("/user");
  };

  return (
    <View style={styles.container}>

      {/* 新しく追加されたキャッチフレーズ */}
      <Catchphrase />

      {/* ロゴコンポーネントを配置 */}
      <MielinkLogo />

      {/* 開発用ログインボタン (iOS/Android用) */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#4285F4',
          paddingHorizontal: 32,
          paddingVertical: 14,
          borderRadius: 8,
          marginTop: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          ログイン (開発用)
        </Text>

      </TouchableOpacity>

        <AuthComponent />
      <Text style={{ marginTop: 16, fontSize: 12, color: '#999999' }}>
        {Platform.OS === 'web' ? 'Web版' : `${Platform.OS.toUpperCase()}版 - Google認証は未実装`}
      </Text>
    </View>
  );
}
