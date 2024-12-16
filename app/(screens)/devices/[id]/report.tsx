import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemedButton } from "@/components/shared/ThemedButton";
import DatePicker from "@/components/devices/DatePicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getCurrentUserInfo } from "@/api/zammad/users";
import { useLoading } from "@/hooks/useLoading";
import { Contact } from "@/models/Contact";
import { createDeviceReportTicket } from "@/api/zammad/tickets";
import ContactForm from "@/components/devices/ContactForm";
import ReportMessageForm from "@/components/devices/ReportMessageForm";
import SubmitReportModal from "@/components/devices/SubmitReportModal";
import { Ticket } from "@/models/Ticket";

const EMPTY_CONTACT = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
};

export default function ReportScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { setLoading } = useLoading();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [isUserData, setIsUserData] = useState(true);
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);

  const handleToggleIsUserData = async (value: boolean) => {
    if (value) {
      setLoading(true);
      const user = await getCurrentUserInfo();
      setLoading(false);
      setContact(user);
    } else {
      setContact(EMPTY_CONTACT);
    }
    setIsUserData(value);
  };

  useEffect(() => {
    handleToggleIsUserData(true);
  }, []);

  const handleInputChange = (field: keyof Contact, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const ticket = await createDeviceReportTicket(
        id as string,
        contact,
        title,
        message,
        date,
      );
      setTicket(ticket);
    } catch (error: any) {
      alert("Zammad is not available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `${t("devices.actions.report")} | ${id}`,
        }}
      />
      <ThemedView style={styles.container} variant="background">
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ReportMessageForm
            title={title}
            setTitle={setTitle}
            message={message}
            setMessage={setMessage}
          />
          <DatePicker setDate={setDate} date={date} />
          <ContactForm
            isUserData={isUserData}
            handleToggleIsUserData={handleToggleIsUserData}
            contact={contact}
            handleInputChange={handleInputChange}
          />
        </KeyboardAwareScrollView>
        <ThemedButton
          label={t("devices.report.send")}
          disabled={!title}
          onPress={handleSubmit}
        />
      </ThemedView>
      {ticket && (
        <SubmitReportModal
          onClose={() => setTicket(undefined)}
          ticket={ticket}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
    flex: 1,
  },
});
