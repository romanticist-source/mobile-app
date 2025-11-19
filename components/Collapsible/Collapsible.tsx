import { PropsWithChildren, useState } from 'react';
import { XStack } from 'tamagui';

import { ThemedText } from '@/components/ThemedText/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <XStack
        alignItems="center"
        gap="$1.5"
        pressStyle={{ opacity: 0.8 }}
        onPress={() => setIsOpen((value) => !value)}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </XStack>
      {isOpen && <ThemedView marginTop="$1.5" marginLeft={24}>{children}</ThemedView>}
    </ThemedView>
  );
}

