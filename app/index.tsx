import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";
import LoginForm from "@/components/login/LoginForm";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { StyleSheet } from "react-native";

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <ThemedView variant="background" style={styles.container}>
          <LoadingOverlay />
        </ThemedView>
      </>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)/settings" : "/login"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
