import { useTranslation } from "react-i18next";
import { router, Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet } from "react-native";
import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";

export default function LoginScreen() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: t("screens.login"),
          headerBackVisible: false,
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerTitle: "",
          gestureEnabled: false,
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <LoginForm setIsLoading={setIsLoading} />
        {isLoading && <LoadingOverlay />}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
