import { Redirect, router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import ThemeProvider from "@/context/ThemeContext";
import LocaleProvider from "@/context/LocaleContext";
import { AuthProvider } from "@/context/AuthContext";
import PortalProvider from "@/context/PortalContext";
import { PrimaryColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LoadingProvider } from "@/context/LoadingContext";
import { useLoading } from "@/hooks/useLoading";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useAuth } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");
  const { isLoading } = useLoading();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (loaded && isAuthenticated !== undefined) {
      !isAuthenticated && router.replace("/auth/login");
      setTimeout(() => SplashScreen.hideAsync(), 320);
    }
  }, [loaded, isAuthenticated]);

  if (!loaded && isAuthenticated === undefined) {
    return null;
  }

  return (
    <>
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
      {isLoading && <LoadingOverlay />}
    </>
  );
}

export default function RootLayout() {
  return (
    <PortalProvider>
      <LocaleProvider>
        <ThemeProvider>
          <AuthProvider>
            <LoadingProvider>
              <AppLayout />
            </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocaleProvider>
    </PortalProvider>
  );
}
