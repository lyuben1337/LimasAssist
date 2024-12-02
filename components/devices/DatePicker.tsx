import { Platform, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { PrimaryColor } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return (
    <>
      <View style={styles.dateGroupHeader}>
        <ThemedText>{t("devices.report.date")}</ThemedText>
        <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
          <ThemedText lightColor={PrimaryColor} darkColor={PrimaryColor}>
            {formattedDate}
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
    </>
  );
}

const styles = StyleSheet.create({
  dateGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
