import { Stack, Tabs } from "expo-router";
import { SettingsIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: useThemeColor("tabIconSelected"),
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
          paddingTop: 8,
        },
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerShadowVisible: false,
        headerTitleStyle: { color: useThemeColor("text") },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: t("screens.settings"),
          tabBarIcon: ({ color }) => <SettingsIcon size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
