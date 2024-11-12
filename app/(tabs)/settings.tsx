import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemeContext } from "@/context/ThemeContext";
import Setting from "@/components/settings/Setting";
import { GlobeIcon, ThemeIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import { router, Tabs } from "expo-router";
import { Divider } from "@/components/shared/Divider";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const settingsColor = useThemeColor("settings");

  return (
    <ThemedView style={styles.container}>
      <View style={[{ backgroundColor: settingsColor }, styles.settings]}>
        <Setting
          title={t("settings.title.theme")}
          icon={<ThemeIcon />}
          value={t(`settings.theme.${theme}`)}
          onPress={() => {
            router.navigate("/settings/theme-settings");
          }}
        />
        <Divider style={styles.divider} />
        <Setting
          title={t("settings.title.language")}
          icon={<GlobeIcon />}
          value={t(`settings.locale.${i18n.language}`)}
          onPress={() => {
            router.navigate("/settings/locale-settings");
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  settings: {
    borderRadius: 10,
  },
  divider: {
    marginHorizontal: 12,
  },
});
