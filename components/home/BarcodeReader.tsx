import { StyleSheet, View } from "react-native";
import { CameraView } from "expo-camera";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LeftBound, RightBound } from "@/components/shared/Icons";
import { useIsFocused } from "@react-navigation/core";

type BarcodeReaderProps = {
  onBarcodeScanned: (data: string) => void;
};

export default function BarcodeReader({
  onBarcodeScanned,
}: BarcodeReaderProps) {
  const boundsColor = useThemeColor("view");
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned && isFocused) {
      setScanned(true);
      setTimeout(() => {
        onBarcodeScanned(data);
        setScanned(false);
      }, 500);
    }
  };

  return (
    <CameraView
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={handleBarCodeScanned}
      style={styles.barcodeReader}
      active={isFocused}
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
