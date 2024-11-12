import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops! Not Found",
          headerTitleStyle: { color: useThemeColor("text") },
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerBackTitleVisible: false,
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText>This screen doesn't exist.</ThemedText>
        <Link href="/(tabs)/settings">Settings</Link>
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
