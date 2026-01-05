import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // ログイン済みの場合は /user へ、未ログインなら /login へ
      if (user) {
        router.replace('/user');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, user]);

  // ローディング中の表示
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF3366" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
