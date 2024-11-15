import {
  Text,
  type TextProps,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { NeutralColor, PrimaryColor } from "@/constants/Colors";
import { ThemedText } from "@/components/shared/ThemedText";

type ThemedButtonProps = {
  label: string;
  onPress?: () => void;
  size?: "default";
  variant?: "default";
  style?: ViewStyle;
};

export function ThemedButton({
  label,
  onPress,
  size = "default",
  variant = "default",
  style,
}: ThemedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[sizeStyles[size], variantStyles[variant], style]}
    >
      <ThemedText
        size={size}
        variant="semibold"
        lightColor="#fff"
        darkColor="#fff"
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const sizeStyles = StyleSheet.create({
  default: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: PrimaryColor,
  },
});
