import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemedView variant="background" style={styles.container}></ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
