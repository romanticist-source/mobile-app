import React from "react";
import { GestureResponderEvent } from "react-native";
import { Button as TamaguiButton, Text } from "tamagui";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = "primary" }) => {
  return (
    <TamaguiButton
      backgroundColor={variant === "primary" ? "$primary" : "$colorSecondary"}
      paddingVertical="$2.5"
      paddingHorizontal="$5"
      borderRadius="$2"
      onPress={onPress}
      pressStyle={{ opacity: 0.8 }}
    >
      <Text color="white" fontSize={16} textAlign="center">
        {title}
      </Text>
    </TamaguiButton>
  );
};

