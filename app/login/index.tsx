import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

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
      const res = await fetch("http://localhost:3000/users/google", {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Google Login</Text>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </View>
  );
}
