import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import ThemeProvider from "@/context/ThemeContext";
import LocaleProvider from "@/context/LocaleContext";
import { AuthProvider } from "@/context/AuthContext";
import PortalProvider from "@/context/PortalContext";
import { PrimaryColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PortalProvider>
      <LocaleProvider>
        <ThemeProvider>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShadowVisible: false,
                headerTitleStyle: { color: textColor },
                headerStyle: { backgroundColor: backgroundColor },
                headerTintColor: PrimaryColor,
              }}
            >
              <Stack.Screen
                name="(screens)/(tabs)"
                options={{ headerShown: false }}
              />
            </Stack>
          </AuthProvider>
        </ThemeProvider>
      </LocaleProvider>
    </PortalProvider>
  );
}
