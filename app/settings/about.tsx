import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet } from "react-native";
import { nativeApplicationVersion } from "expo-application";
import { ThemedText } from "@/components/shared/ThemedText";

export default function AboutScreen() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          title: t("settings.title.about"),
          headerTitleStyle: { color: useThemeColor("text") },
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerBackTitle: t("screens.settings"),
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText>{nativeApplicationVersion}</ThemedText>
        <ThemedText>Created by Vladyslav Liubchyk</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
