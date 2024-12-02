import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

type DeviceActionsParams = {
  deviceId: string;
  onCloseModal: () => void;
};

export default function DeviceActions({
  deviceId,
  onCloseModal,
}: DeviceActionsParams) {
  const { t } = useTranslation();

  return (
    <ThemedView variant="background" style={styles.group}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="tools" size={28} color="#4CAF50" />
        <ThemedText variant="semibold" size="medium" style={styles.title}>
          {t("home.actions")}
        </ThemedText>
      </View>
      <View style={{ gap: 8 }}>
        <ThemedButton
          label={t("devices.actions.update-location")}
          onPress={() => {
            router.navigate(`/devices/${deviceId}/update-location`);
            onCloseModal();
          }}
        />
        <ThemedButton
          label={t("devices.actions.report")}
          onPress={() => {
            router.navigate(`/devices/${deviceId}/report`);
            onCloseModal();
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
  },
});
