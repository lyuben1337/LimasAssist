import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { Theme, ThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Options } from "@/components/settings/Options";

export default function ThemeSettingsScreen() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const themes: Array<{ key: Theme; title: string }> = [
    { key: "light", title: t("settings.theme.light") },
    { key: "dark", title: t("settings.theme.dark") },
    { key: "system", title: t("settings.theme.system") },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: t("settings.title.theme"),
          headerTitleStyle: { color: useThemeColor("text") },
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerBackTitle: t("screens.settings"),
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <Options<Theme>
          collection={themes}
          selected={(key) => key === theme}
          onSelect={(key) => toggleTheme(key)}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
