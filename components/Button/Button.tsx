import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import { styles } from './styles';

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.secondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

