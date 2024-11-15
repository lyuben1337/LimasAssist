import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: "background" | "view";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = "view",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(variant, {
    light: lightColor,
    dark: darkColor,
  });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
