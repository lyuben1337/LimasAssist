import ZammadClient, {
  ZAMMAD_TOKEN_KEY,
  ZAMMAD_TOKEN_NAME_KEY,
} from "@/api/zammad/ZammadClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Uuid from "expo-modules-core/src/uuid";

async function getTokenName(): Promise<string | null> {
  return AsyncStorage.getItem(ZAMMAD_TOKEN_NAME_KEY);
}

async function setToken(token: string, tokenName: string): Promise<void> {
  await AsyncStorage.setItem(ZAMMAD_TOKEN_KEY, token);
  await AsyncStorage.setItem(ZAMMAD_TOKEN_NAME_KEY, tokenName);
}

async function clearStoredToken(): Promise<void> {
  await AsyncStorage.removeItem(ZAMMAD_TOKEN_KEY);
  await AsyncStorage.removeItem(ZAMMAD_TOKEN_NAME_KEY);
}

async function deleteExistingToken(
  authConfig: any,
  tokenName: string,
): Promise<void> {
  const tokensResponse = await ZammadClient.get(
    "/user_access_token",
    authConfig,
  );
  const existingToken = tokensResponse.data.tokens.find(
    (token: any) => token.name === tokenName,
  );

  if (existingToken) {
    await ZammadClient.delete(
      `/user_access_token/${existingToken.id}`,
      authConfig,
    );
  }
}

export async function login(
  username: string,
  password: string,
): Promise<string> {
  const authConfig = { auth: { username, password } };
  let tokenName = await getTokenName();

  if (tokenName) {
    await deleteExistingToken(authConfig, tokenName);
  }

  tokenName = `LimasAssist - ${Uuid.v4()}`;

  const response = await ZammadClient.post(
    "/user_access_token",
    {
      name: tokenName,
      permission: ["ticket.customer", "user_preferences.access_token"],
    },
    authConfig,
  );

  const { token } = response.data;
  await setToken(token, tokenName);

  return token;
}

export async function logout(): Promise<void> {
  const tokenName = await getTokenName();

  if (tokenName) {
    const tokensResponse = await ZammadClient.get("/user_access_token");
    const existingToken = tokensResponse.data.tokens.find(
      (token: any) => token.name === tokenName,
    );

    if (existingToken) {
      await ZammadClient.delete(`/user_access_token/${existingToken.id}`);
    }
  }

  await clearStoredToken();
}
