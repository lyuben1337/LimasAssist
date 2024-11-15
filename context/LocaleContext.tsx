import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "@/i18n/locales/en-US/translation.json";
import translationDe from "@/i18n/locales/de-DE/translation.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Locale = "de-DE" | "en-US";

type LocaleContextType = {
  locale: Locale;
  toggleLocale: (Locale: Locale) => void;
};

const resources = {
  "de-DE": { translation: translationDe },
  "en-US": { translation: translationEn },
};

const initI18n = async (locale: Locale) => {
  if (!locale) {
    locale = "de-DE";
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: locale,
    fallbackLng: "de-DE",
    interpolation: { escapeValue: false },
  });
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: "de-DE",
  toggleLocale: () => {},
});

export default function LocaleProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [locale, setLocale] = useState<Locale>("de-DE");
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const getLocale = async () => {
      try {
        const savedLocale = (await AsyncStorage.getItem("locale")) as Locale;
        savedLocale && setLocale(savedLocale);
        await initI18n(savedLocale);
        setIsI18nInitialized(true);
      } catch (error) {
        console.log("Error loading Locale:", error);
      }
    };
    getLocale();
  }, []);

  const toggleLocale = async (newLocale: Locale) => {
    setLocale(newLocale);
    await initI18n(newLocale);
    await AsyncStorage.setItem("locale", newLocale);
  };

  if (!isI18nInitialized) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
