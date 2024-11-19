import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
