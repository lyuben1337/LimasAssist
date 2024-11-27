import { Keyboard, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { useCameraPermissions } from "expo-camera";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BarcodeReader from "@/components/home/BarcodeReader";
import { ThemedText } from "@/components/shared/ThemedText";
import DeviceModal from "@/components/home/DeviceModal";
import ManuallyEnterModal from "@/components/home/ManuallyEnterModal";
import { Device } from "@/models/Device";
import { getItem } from "@/api/limas/items";
import { useLoading } from "@/hooks/useLoading";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const { t } = useTranslation();
  const [device, setDevice] = useState<Device | undefined>();
  const [deviceModalVisible, setDeviceModalVisible] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const { isLoading, setLoading } = useLoading();

  const onSubmit = async (data: string) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const device = await getItem(data);
      setDevice(device);
    } catch (error: any) {
      setDevice(undefined);
      error.response.status !== 404 && alert(t("Network Error"));
    } finally {
      setLoading(false);
      setDeviceModalVisible(true);
    }
  };

  if (!permission) {
    return (
      <ThemedView variant="background" style={styles.container}></ThemedView>
    );
  }

  if (!permission.granted) {
    return (
      <ThemedView variant="background" style={styles.container}>
        <ThemedText>{t("home.permission-required")}</ThemedText>
        <ThemedButton
          onPress={requestPermission}
          label={t("home.grant-permission")}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} variant="background">
      {!isLoading && !deviceModalVisible ? (
        <BarcodeReader onBarcodeScanned={onSubmit} />
      ) : (
        <View style={{ flex: 8 }} />
      )}
      <View style={styles.tools}>
        <ThemedButton
          label={t("home.enter-manually")}
          onPress={() => setManualMode(true)}
        />
      </View>
      <DeviceModal
        device={device}
        isVisible={deviceModalVisible}
        onClose={() => setDeviceModalVisible(false)}
      />
      <ManuallyEnterModal
        onClose={() => setManualMode(false)}
        onSubmit={onSubmit}
        isVisible={manualMode}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
