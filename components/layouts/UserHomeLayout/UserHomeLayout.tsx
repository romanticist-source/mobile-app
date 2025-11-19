import React, { ReactNode } from 'react';
import { YStack, ScrollView } from 'tamagui';

interface UserHomeLayoutProps {
  children?: ReactNode;
}

export function UserHomeLayout({ children }: UserHomeLayoutProps) {
  return (
    <YStack flex={1} backgroundColor="$backgroundSecondary">
      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: 100 }}>
        {children}
      </ScrollView>
    </YStack>
  );
}

