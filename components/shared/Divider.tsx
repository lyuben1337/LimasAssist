import { useThemeColor } from "@/hooks/useThemeColor";
import { View, ViewStyle } from "react-native";
import React from "react";

type DividerProps = {
  style?: ViewStyle;
};

export function Divider({ style }: DividerProps) {
  const dividerColor = useThemeColor("divider");

  return <View style={[{ backgroundColor: dividerColor, height: 1 }, style]} />;
}
