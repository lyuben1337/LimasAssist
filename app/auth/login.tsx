import { useTranslation } from "react-i18next";
import { router, Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet, View } from "react-native";
import ThemedInput from "@/components/shared/ThemedInput";
import { ZammadIcon } from "@/components/shared/Icons";
import { useAuth } from "@/hooks/useAuth";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { useState } from "react";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.navigate("/(tabs)/settings");
    } catch (error) {
      alert(t("errors.invalid-credentials"));
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t("screens.login"),
          headerBackVisible: false,
          headerStyle: { backgroundColor: useThemeColor("background") },
          headerTitle: "",
          gestureEnabled: false,
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <ThemedView style={styles.form}>
          <View style={styles.iconContainer}>
            <ZammadIcon size={170} />
          </View>
          <ThemedInput placeholder={"Username"} onChangeText={setUsername} />
          <ThemedInput
            placeholder={"Password"}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <ThemedButton
            label={t("shared.login")}
            style={styles.submitContainer}
            onPress={handleLogin}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  form: {
    alignItems: "center",
    top: "20%",
    borderRadius: 10,
    padding: 12,
    gap: 12,
    width: "100%",
  },
  iconContainer: {
    marginBottom: 12,
  },
  submitContainer: {
    marginTop: 12,
  },
});
