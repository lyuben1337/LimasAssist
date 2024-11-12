import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: "default";
  variant?: "default";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  size = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor("text", { light: lightColor, dark: darkColor });

  return (
    <Text
      style={[
        { color },
        size === "default" ? styles.default : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
});
