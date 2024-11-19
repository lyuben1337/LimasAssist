import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";

export default function Index() {
  return (
    <ThemedView variant="background" style={styles.container}></ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
