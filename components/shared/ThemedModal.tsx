import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import Portal from "@/components/shared/Portal";
import { CrossIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedModalProps = PropsWithChildren<{
  isVisible: boolean;
  title: string;
  onClose: () => void;
  variant?: "full" | "small";
}>;

export default function ThemedModal({
  isVisible,
  title,
  onClose,
  children,
  variant = "full",
}: ThemedModalProps) {
  return (
    <Portal name="modal">
      <Modal animationType="slide" transparent visible={isVisible}>
        <ThemedView style={[styles[variant], styles.modalContent]}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText variant="semibold" size="medium">
              {title}
            </ThemedText>
            <Pressable onPress={onClose}>
              <CrossIcon size={16} color={useThemeColor("text")} />
            </Pressable>
          </ThemedView>
          {children}
        </ThemedView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  full: {
    height: "90%",
  },
  small: {
    height: "25%",
  },
  modalContent: {
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "10%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
