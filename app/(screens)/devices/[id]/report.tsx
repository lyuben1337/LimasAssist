import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedButton } from "@/components/shared/ThemedButton";
import DatePicker from "@/components/devices/DatePicker";
import { Checkbox } from "expo-checkbox";
import { PrimaryColor } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getCurrentUserInfo } from "@/api/zammad/users";
import { useLoading } from "@/hooks/useLoading";
import { Contact } from "@/models/Contact";
import { createDeviceReportTicket } from "@/api/zammad/tickets";

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

  const handleInputChange = (field: keyof typeof contact, value: string) => {
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
      router.navigate("/(screens)/(tabs)");
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
          <ThemedView style={styles.group}>
            <ThemedText variant="semibold">
              {t("devices.report.message")}
            </ThemedText>
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

          <ThemedView style={styles.group}>
            <DatePicker setDate={setDate} date={date} />
          </ThemedView>

          <ThemedView style={styles.group}>
            <ThemedView style={styles.contactHeader}>
              <ThemedText>{t("devices.report.contact")}</ThemedText>
              <View style={styles.checkboxContainer}>
                <ThemedText size="small">
                  {t("devices.report.use-user-data")}
                </ThemedText>
                <Checkbox
                  color={PrimaryColor}
                  value={isUserData}
                  onValueChange={handleToggleIsUserData}
                />
              </View>
            </ThemedView>
            <ThemedInput
              placeholder={t("devices.report.name")}
              value={contact.firstname}
              onChangeText={(value) => handleInputChange("firstname", value)}
            />
            <ThemedInput
              placeholder={t("devices.report.surname")}
              value={contact.lastname}
              onChangeText={(value) => handleInputChange("lastname", value)}
            />
            <ThemedInput
              placeholder={t("devices.report.email")}
              keyboardType="email-address"
              value={contact.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <ThemedInput
              placeholder={t("devices.report.phone")}
              keyboardType="phone-pad"
              value={contact.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
            />
          </ThemedView>
        </KeyboardAwareScrollView>
        <ThemedButton label={t("devices.report.send")} onPress={handleSubmit} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  group: {
    marginBottom: 12,
    padding: 10,
    gap: 8,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
});
