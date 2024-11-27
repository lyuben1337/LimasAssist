import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { MaterialIcons } from "@expo/vector-icons"; // Icons from @expo/vector-icons
import { Device } from "@/models/Device";
import { ThemedView } from "@/components/shared/ThemedView";
import { PrimaryColor } from "@/constants/Colors";
import { ManufacturerIcon } from "@/components/shared/Icons";

type DeviceOverviewProps = {
  device: Device;
};

export default function DeviceOverview({ device }: DeviceOverviewProps) {
  return (
    <ThemedView variant="background" style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="devices" size={28} color="#4CAF50" />
        <ThemedText variant="semibold" size="medium" style={styles.title}>
          Device Overview
        </ThemedText>
      </View>
      <View>
        <View style={styles.detailRow}>
          <MaterialIcons name="category" size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Product Type: {device.product.product_type}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ManufacturerIcon size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Manufacturer: {device.product.manufacturer}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="label" size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Name: {device.product.name}
          </ThemedText>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="qr-code" size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Serial Number: {device.serial_number}
          </ThemedText>
        </View>
        {device.client_name && (
          <View style={styles.detailRow}>
            <MaterialIcons name="person" size={20} color={PrimaryColor} />
            <ThemedText style={styles.detailText}>
              Client Name: {device.client_name}
            </ThemedText>
          </View>
        )}
        <View style={styles.detailRow}>
          <MaterialIcons name="meeting-room" size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Room: {device.location.room_type} {device.location.room_number}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <MaterialIcons name="apartment" size={20} color={PrimaryColor} />
          <ThemedText style={styles.detailText}>
            Building: {device.location.building}
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
    marginBottom: 16,
  },
  title: {
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
  },
});
