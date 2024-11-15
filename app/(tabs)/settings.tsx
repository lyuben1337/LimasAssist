import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemeContext } from "@/context/ThemeContext";
import Setting from "@/components/settings/Setting";
import { GlobeIcon, InfoIcon, ThemeIcon } from "@/components/shared/Icons";
import { useTranslation } from "react-i18next";
import { router, Tabs } from "expo-router";
import { Divider } from "@/components/shared/Divider";
import { SettingsIconColor } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.navigate("/auth/login");
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <ThemedView style={styles.settings}>
        <Setting
          title={t("settings.title.language")}
          icon={<GlobeIcon />}
          iconColor={SettingsIconColor.language}
          value={t(`settings.locale.${i18n.language}`)}
          onPress={() => {
            router.navigate("/settings/locale-settings");
          }}
        />
        <Divider style={styles.divider} />
        <Setting
          title={t("settings.title.theme")}
          icon={<ThemeIcon />}
          iconColor={SettingsIconColor.theme}
          value={t(`settings.theme.${theme}`)}
          onPress={() => {
            router.navigate("/settings/theme-settings");
          }}
        />
        <Divider style={styles.divider} />
        <Setting
          title={t("settings.title.about")}
          icon={<InfoIcon />}
          iconColor={SettingsIconColor.about}
          onPress={() => {
            router.navigate("/settings/about");
          }}
        />
        <Divider style={styles.divider} />
        <Setting
          title={t("settings.title.logout")}
          icon={<InfoIcon />}
          iconColor={SettingsIconColor.about}
          onPress={handleLogout}
        />
      </ThemedView>
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
