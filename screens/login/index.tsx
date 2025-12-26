import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { styles, logoStyles } from './styles'; 


const logoImage = require('../../assets/images/logo.png');

// キャッチフレーズのコンポーネント
const Catchphrase = () => {
  return (
    <View style={logoStyles.catchphraseContainer}>
      <Text style={logoStyles.catchphraseLine1}>誰もが快適に。</Text>
      <Text style={logoStyles.catchphraseLine2}>暮らせる社会のために。</Text>
    </View>
  );
};

// ロゴ画像を直接表示するコンポーネント
const MielinkLogo = () => {
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
};

type User = {
  name: string;
  email: string;
  picture: string;
  sub: string;
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    Array.prototype.map
      .call(atob(base64), (c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};


export default function LoginScreen() {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      console.error("No credential returned");
      return;
    }

    // Google Credential を解析
    const profile: User = parseJwt(credentialResponse.credential);
    console.log("Logged in user:", profile);

    try {
      // Backend に Google Credential を送信
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profile.sub,
          name: profile.name,
          mail: profile.email,
          icon: profile.picture,
        }),
        credentials: "include", // ← Cookie を受け取る
      });

      const data = await res.json();
      console.log("Server response:", data);

      // Cookie は自動保存される（HttpOnly Cookie）
      router.replace("/");
    } catch (error) {
      console.error("Failed to register user", error);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <View style={styles.container}>
      
      {/* 新しく追加されたキャッチフレーズ */}
      <Catchphrase />

      {/* ロゴコンポーネントを配置 */}
      <MielinkLogo />

      {/* Googleログインボタン */}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </View>
  );
}