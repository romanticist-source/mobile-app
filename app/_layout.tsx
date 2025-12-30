import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { UserProvider } from '@/contexts/UserContext';
import { HelperProvider } from '@/contexts/HelperContext';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <UserProvider>
        <HelperProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login/index" />
            <Stack.Screen name="user/index" />
            <Stack.Screen name="helper/index" />
          </Stack>
        </HelperProvider>
      </UserProvider>
    </TamaguiProvider>
  );
}
