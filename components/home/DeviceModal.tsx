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
import DeviceActions from "@/components/home/DeviceActions";

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
          <DeviceActions />
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
});
