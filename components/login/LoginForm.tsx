import { Keyboard, StyleSheet, View } from "react-native";
import { ZammadIcon } from "@/components/shared/Icons";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { ThemedView } from "@/components/shared/ThemedView";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { router } from "expo-router";
import { useLoading } from "@/hooks/useLoading";

export default function LoginForm() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { setLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      await login(username, password);
      setLoading(false);
      router.replace("/(screens)/(tabs)");
    } catch (error) {
      alert(t("errors.invalid-credentials"));
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    top: "20%",
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
