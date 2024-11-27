import ThemedModal from "@/components/shared/ThemedModal";
import { Device } from "@/models/Device";
import { ThemedText } from "@/components/shared/ThemedText";
import React from "react";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import DeviceOverview from "@/components/home/DeviceOverview";
import { ThemedView } from "@/components/shared/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type DeviceModalProps = {
  device?: Device;
  isVisible: boolean;
  onClose: () => void;
};

export default function DeviceModal({
  device,
  onClose,
  isVisible,
}: DeviceModalProps) {
  const { t } = useTranslation();

  return (
    <ThemedModal
      title={!device ? "" : device.inventory_number}
      isVisible={isVisible}
      onClose={onClose}
    >
      {!device ? (
        <View style={styles.notFoundContainer}>
          <ThemedText
            variant="bold"
            size="large"
            style={{ opacity: 0.5, paddingBottom: 40 }}
          >
            {t("home.device-not-found")}
          </ThemedText>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <DeviceOverview device={device} />
          <ThemedView variant="background" style={styles.group}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="tools" size={28} color="#4CAF50" />
              <ThemedText variant="semibold" size="medium" style={styles.title}>
                Actions
              </ThemedText>
            </View>
            <View style={{ gap: 8 }}>
              <ThemedButton label="Update Information" />
              <ThemedButton label="Report" />
            </View>
          </ThemedView>
        </ScrollView>
      )}
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingBottom: 10,
  },
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
    marginBottom: 16,
  },
  title: {
    marginLeft: 8,
  },
});
