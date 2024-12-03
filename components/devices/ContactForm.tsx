import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { PrimaryColor } from "@/constants/Colors";
import ThemedInput from "@/components/shared/ThemedInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { Contact } from "@/models/Contact";

type ContactFormProps = {
  isUserData: boolean;
  handleToggleIsUserData: (value: boolean) => void;
  contact: Contact;
  handleInputChange: (contactField: keyof Contact, value: string) => void;
};

export default function ContactForm({
  isUserData,
  handleToggleIsUserData,
  contact,
  handleInputChange,
}: ContactFormProps) {
  const { t } = useTranslation();

  return (
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
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 12,
    padding: 10,
    gap: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
});
