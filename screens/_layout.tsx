import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider } from "tamagui";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useColorScheme } from '@/hooks/useColorScheme';
import config from '@/tamagui.config';
import { UserProvider } from '@/contexts/UserContext';
import { HelperProvider } from '@/contexts/HelperContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GoogleOAuthProvider clientId="930288803331-blb6ioahmitg389u2il3odce01pim34g.apps.googleusercontent.com">
        <UserProvider>
          <HelperProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </HelperProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </TamaguiProvider>
  );
}
