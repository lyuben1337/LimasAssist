import { useTranslation } from "react-i18next";
import { Slot } from "expo-router";

export default function TabsLayout() {
  const { t } = useTranslation();

  return <Slot />;
}
