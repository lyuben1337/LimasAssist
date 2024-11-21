import { StyleSheet, View } from "react-native";
import { CameraView } from "expo-camera";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LeftBound, RightBound } from "@/components/shared/Icons";

type BarcodeReaderProps = {
  onBarcodeScanned: (data: string) => void;
};

export default function BarcodeReader({
  onBarcodeScanned,
}: BarcodeReaderProps) {
  const boundsColor = useThemeColor("view");

  return (
    <CameraView
      barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
      onBarcodeScanned={({ data }) => onBarcodeScanned(data)}
      style={styles.barcodeReader}
      facing="back"
    >
      <View style={styles.bounds}>
        <LeftBound color={boundsColor} size={24} />
        <RightBound color={boundsColor} size={24} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  barcodeReader: {
    flex: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bounds: {
    paddingHorizontal: 64,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
