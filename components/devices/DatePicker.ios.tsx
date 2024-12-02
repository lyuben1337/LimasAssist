import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

type DatePickerProps = {
  setDate: (date: Date) => void;
  date: Date;
};

export default function DatePicker({ setDate, date }: DatePickerProps) {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.dateGroupHeader}>
        <ThemedText>{t("devices.report.date")}</ThemedText>
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          onChange={(_, date) => date && setDate(date)}
        />
      </View>
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
