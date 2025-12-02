import { View, Text, Button, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  mail: string;
  icon: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/me", {
          credentials: "include", // Cookie を送信
        });

        if (res.status === 401) {
          // 未ログイン
          router.replace("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  if (loading || !user) return null;

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 80 }}>
      <Text style={{ fontSize: 28 }}>ようこそ！</Text>
      <Image
        source={{ uri: user.icon }}
        style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20 }}>{user.name}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>{user.mail}</Text>
      <Button title="ログアウト" onPress={logout} />
    </View>
  );
}
