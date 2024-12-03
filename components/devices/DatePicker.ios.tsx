import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { ThemedView } from "@/components/shared/ThemedView";

type DatePickerProps = {
  setDate: (date: Date) => void;
  date: Date;
};

export default function DatePicker({ setDate, date }: DatePickerProps) {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.group}>
      <View style={styles.dateGroupHeader}>
        <ThemedText>{t("devices.report.date")}</ThemedText>
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          onChange={(_, date) => date && setDate(date)}
        />
      </View>
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
