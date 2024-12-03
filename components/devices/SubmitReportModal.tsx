import ThemedModal from "@/components/shared/ThemedModal";
import { useTranslation } from "react-i18next";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { ScrollView, StyleSheet, View } from "react-native";
import { Ticket } from "@/models/Ticket";
import { ThemedText } from "@/components/shared/ThemedText";
import { useLoading } from "@/hooks/useLoading";
import { sendTicket } from "@/api/zammad/tickets";
import { router } from "expo-router";

type ManuallyEnterModalProps = {
  onClose: () => void;
  ticket: Ticket;
};

export default function SubmitReportModal({
  onClose,
  ticket,
}: ManuallyEnterModalProps) {
  const { t } = useTranslation();
  const { setLoading } = useLoading();

  const handleSubmit = async () => {
    onClose();
    setLoading(true);
    try {
      await sendTicket(ticket);
      router.navigate("/(screens)/(tabs)");
    } catch (error: any) {
      alert("Zammad is not available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedModal
      title={t("devices.report.summary")}
      isVisible={true}
      onClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView>
          <ThemedText variant="semibold">
            {ticket.title}
            {"\n"}
          </ThemedText>
          <ThemedText>{ticket.article.body}</ThemedText>
        </ScrollView>
        <ThemedButton
          label={t("devices.report.submit")}
          onPress={handleSubmit}
        />
      </View>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
});
