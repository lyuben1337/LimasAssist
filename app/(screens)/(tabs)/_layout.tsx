import { Tabs } from "expo-router";
import { GlobeIcon, SettingsIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import React from "react";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: useThemeColor("tabIconSelected"),
        tabBarStyle: {
          backgroundColor: useThemeColor("background"),
          paddingTop: 4,
        },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTitleStyle: { color: useThemeColor("text") },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "LimasAssist",
          tabBarIcon: ({ color }) => <GlobeIcon size={30} color={color} />,
        }}
      />
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
