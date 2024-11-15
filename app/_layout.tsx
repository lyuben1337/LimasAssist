import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect, useContext } from "react";
import ThemeProvider from "@/context/ThemeContext";
import LocaleProvider from "@/context/LocaleContext";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import PortalProvider from "@/context/PortalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

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
            <Stack screenOptions={{ headerShadowVisible: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          </AuthProvider>
        </ThemeProvider>
      </LocaleProvider>
    </PortalProvider>
  );
}
