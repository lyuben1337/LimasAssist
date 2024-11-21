import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { useCameraPermissions } from "expo-camera";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BarcodeReader from "@/components/home/BarcodeReader";
import { ThemedText } from "@/components/shared/ThemedText";
import DeviceModal from "@/components/home/DeviceModal";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const { t } = useTranslation();
  const [inventoryNumber, setInventoryNumber] = useState("zxc");

  const onBarcodeScanned = (data: string) => {
    setInventoryNumber(data);
  };

  if (!permission) {
    return (
      <ThemedView variant="background" style={styles.container}></ThemedView>
    );
  }

  if (!permission.granted) {
    return (
      <ThemedView variant="background" style={styles.container}>
        <ThemedText>
          We need your camera permission to scan inventory number
        </ThemedText>
        <ThemedButton onPress={requestPermission} label="Grant Permission" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} variant="background">
      {!inventoryNumber && (
        <BarcodeReader onBarcodeScanned={onBarcodeScanned} />
      )}
      <View style={styles.tools}>
        <ThemedButton label={t("home.enter-manually")} />
      </View>
      <DeviceModal
        inventoryNumber={inventoryNumber}
        onClose={() => setInventoryNumber("")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
    gap: 16,
    padding: 16,
  },
  tools: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
