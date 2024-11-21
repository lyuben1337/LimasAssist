import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet } from "react-native";
import LoginForm from "@/components/login/LoginForm";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerTitle: "",
          gestureEnabled: false,
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <LoginForm />
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
