import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { UserProvider } from '@/contexts/UserContext';
import { HelperProvider } from '@/contexts/HelperContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { setupNotificationListener } from '@/_util/localNotificationScheduler';

export default function RootLayout() {
  // Setup notification listeners
  useEffect(() => {
    const cleanup = setupNotificationListener();
    return cleanup;
  }, []);

  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <UserProvider>
          <HelperProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login/index" />
              <Stack.Screen name="register/index" />
              <Stack.Screen name="user/index" />
              <Stack.Screen name="helper/index" />
            </Stack>
          </HelperProvider>
        </UserProvider>
      </AuthProvider>
    </TamaguiProvider>
  );
}
