import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user, helper, role, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // ログイン済みの場合はroleに応じてリダイレクト
      if (role === 'user' && user) {
        router.replace('/user');
      } else if (role === 'helper' && helper) {
        router.replace('/helper');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, user, helper, role]);

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
