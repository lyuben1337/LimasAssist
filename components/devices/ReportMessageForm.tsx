import { ThemedText } from "@/components/shared/ThemedText";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedView } from "@/components/shared/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

type ReportMessageFormProps = {
  title: string;
  setTitle: (title: string) => void;
  message: string;
  setMessage: (message: string) => void;
};

export default function ReportMessageForm({
  title,
  setTitle,
  message,
  setMessage,
}: ReportMessageFormProps) {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.group}>
      <ThemedText variant="semibold">{t("devices.report.message")}</ThemedText>
      <ThemedInput
        placeholder={t("devices.report.title")}
        value={title}
        onChangeText={setTitle}
      />
      <ThemedInput
        placeholder={t("devices.report.message-placeholder")}
        value={message}
        multiline
        onChangeText={setMessage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 12,
    padding: 10,
    gap: 8,
  },
});
