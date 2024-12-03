import { Platform, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { PrimaryColor } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemedView } from "@/components/shared/ThemedView";
import { formatDate } from "@/utils/format-date";

type DatePickerProps = {
  setDate: (date: Date) => void;
  date: Date;
};

export default function DatePicker({ setDate, date }: DatePickerProps) {
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ThemedView style={styles.group}>
      <View style={styles.dateGroupHeader}>
        <ThemedText>{t("devices.report.date")}</ThemedText>
        <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
          <ThemedText lightColor={PrimaryColor} darkColor={PrimaryColor}>
            {formatDate(date, "short")}
          </ThemedText>
        </Pressable>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dateGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  group: {
    marginBottom: 12,
    padding: 10,
    gap: 8,
  },
});
