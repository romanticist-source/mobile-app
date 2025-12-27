import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { UserProvider } from '@/contexts/UserContext';
import { HelperProvider } from '@/contexts/HelperContext';

export default function RootLayout() {
  return (
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
  );
}
