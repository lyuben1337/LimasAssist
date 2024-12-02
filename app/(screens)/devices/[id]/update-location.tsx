import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function UpdateLocationScreen() {
  const { id } = useLocalSearchParams();

  alert(id);
  return (
    <ThemedView variant="background">
      <ThemedText></ThemedText>
    </ThemedView>
  );
}
