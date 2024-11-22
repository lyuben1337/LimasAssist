import ThemedModal from "@/components/shared/ThemedModal";
import { useTranslation } from "react-i18next";
import ThemedInput from "@/components/shared/ThemedInput";
import { useState } from "react";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { StyleSheet, View } from "react-native";

type ManuallyEnterModalProps = {
  onSubmit: (inventoryNumber: string) => void;
  onClose: () => void;
  isVisible: boolean;
};

export default function ManuallyEnterModal({
  isVisible,
  onSubmit,
  onClose,
}: ManuallyEnterModalProps) {
  const { t } = useTranslation();
  const [inventoryNumber, setInventoryNumber] = useState("");

  return (
    <ThemedModal
      title={t("home.enter-manually")}
      isVisible={isVisible}
      onClose={onClose}
      variant="small"
    >
      <View style={styles.container}>
        <ThemedInput
          onChangeText={(text) => setInventoryNumber(text)}
          placeholder={t("shared.inventory-number")}
        />
        <ThemedButton
          label={t("shared.search")}
          onPress={() => onSubmit(inventoryNumber)}
        />
      </View>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    gap: 8,
  },
});
