import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedLink } from "@/components/shared/ThemedLink";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/hooks/useAuth";

export default function NotFoundScreen() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: t("screens.not-found"),
          headerTitleStyle: { color: useThemeColor("text") },
          headerStyle: { backgroundColor: useThemeColor("background") },
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <ThemedText>{t("not-found.screen-not-exist")}</ThemedText>
        <ThemedLink
          href={isAuthenticated ? "/(tabs)/settings" : "/auth/login"}
          label={t("not-found.home-page")}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
