import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { CrossIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as ScreenOrientation from "expo-screen-orientation";

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
    <Modal
      animationType="slide"
      supportedOrientations={["landscape", "portrait"]}
      transparent
      visible={isVisible}
    >
      <KeyboardAvoidingView
        behavior="position"
        style={[styles[variant], styles.avoidingView]}
      >
        <ThemedView style={[styles.modalContent]}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText variant="semibold" size="medium">
              {title}
            </ThemedText>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <CrossIcon size={16} color={useThemeColor("text")} />
            </Pressable>
          </ThemedView>
          {children}
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  full: {
    height: "90%",
  },
  small: {
    height: "25%",
  },
  avoidingView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    gap: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 40,
    alignItems: "flex-end",
  },
});
