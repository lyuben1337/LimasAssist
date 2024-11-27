import { StyleSheet, View } from "react-native";
import { CameraView } from "expo-camera";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LeftBound, RightBound } from "@/components/shared/Icons";
import { useIsFocused } from "@react-navigation/core";
import * as ScreenOrientation from "expo-screen-orientation";

type BarcodeReaderProps = {
  onBarcodeScanned: (data: string) => void;
};

export default function BarcodeReader({
  onBarcodeScanned,
}: BarcodeReaderProps) {
  const boundsColor = useThemeColor("view");
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  if (!isFocused) return null;

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
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
