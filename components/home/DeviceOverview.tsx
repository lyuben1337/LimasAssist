import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { MaterialIcons } from "@expo/vector-icons"; // Icons from @expo/vector-icons
import { Device } from "@/models/Device";
import { ThemedView } from "@/components/shared/ThemedView";
import { PrimaryColor } from "@/constants/Colors";
import { ManufacturerIcon, TagIcon } from "@/components/shared/Icons";
import { useTranslation } from "react-i18next";

type DeviceOverviewProps = {
  device: Device;
};

export default function DeviceOverview({ device }: DeviceOverviewProps) {
  const { t } = useTranslation();

  return (
    <ThemedView variant="background" style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="devices" size={28} color="#4CAF50" />
        <ThemedText
          numberOfLines={1}
          variant="semibold"
          size="medium"
          style={styles.title}
        >
          {t("home.device-overview")}
        </ThemedText>
      </View>
      <View>
        <View style={styles.detailRow}>
          <MaterialIcons name="category" size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.product-type")}:{" "}
            {device.product.product_type}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ManufacturerIcon size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.manufacturer")}:{" "}
            {device.product.manufacturer}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="label" size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.name")}: {device.product.name}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <TagIcon size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.serial-number")}:{" "}
            {device.serial_number}
          </ThemedText>
        </View>
        {device.client_name && (
          <View style={styles.detailRow}>
            <MaterialIcons name="person" size={20} color={PrimaryColor} />
            <ThemedText numberOfLines={1} style={styles.detailText}>
              {t("shared.device-attributes.client-name")}: {device.client_name}
            </ThemedText>
          </View>
        )}
        {device.school && (
          <View style={styles.detailRow}>
            <MaterialIcons name="school" size={20} color={PrimaryColor} />
            <ThemedText numberOfLines={1} style={styles.detailText}>
              {t("shared.device-attributes.school")}: {device.school}
            </ThemedText>
          </View>
        )}
        <View style={styles.detailRow}>
          <MaterialIcons name="apartment" size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.location")}: {device.location.building}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="meeting-room" size={20} color={PrimaryColor} />
          <ThemedText numberOfLines={1} style={styles.detailText}>
            {t("shared.device-attributes.room")}: {device.location.room_type}{" "}
            {device.location.room_number}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    flex: 1,
    marginLeft: 8,
  },
});
