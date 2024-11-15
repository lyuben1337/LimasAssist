import ZammadClient, { ZAMMAD_TOKEN_KEY } from "@/api/zammad/ZammadClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(username: string, password: string) {
  const authConfig = {
    auth: {
      username,
      password,
    },
  };

  const tokensResponse = await ZammadClient.get(
    "/user_access_token",
    authConfig,
  );

  for (const token of tokensResponse.data.tokens) {
    if (token.name === "LimasAssist") {
      await ZammadClient.delete(`/user_access_token/${token.id}`, authConfig);
    }
  }

  const response = await ZammadClient.post(
    "/user_access_token",
    {
      name: `LimasAssist`,
      permission: ["ticket.customer", "user_preferences.access_token"],
    },
    authConfig,
  );

  const { token } = response.data;
  await AsyncStorage.setItem(ZAMMAD_TOKEN_KEY, token);
  return token;
}

export async function logout() {
  const response = await ZammadClient.get("/user_access_token");

  for (const token of response.data.tokens) {
    if (token.name === "LimasAssist") {
      await ZammadClient.delete(`/user_access_token/${token.id}`);
    }
  }

  await AsyncStorage.removeItem(ZAMMAD_TOKEN_KEY);
}
