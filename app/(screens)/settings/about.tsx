import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet } from "react-native";
import { nativeApplicationVersion } from "expo-application";
import { ThemedText } from "@/components/shared/ThemedText";

export default function AboutScreen() {
  return (
    <ThemedView variant="background" style={styles.container}>
      <ThemedText>LimasAssist {nativeApplicationVersion}</ThemedText>
    </ThemedView>
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
