import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ZAMMAD_BASE_URL = "https://ticket.schulen-leipzig.de/api/v1";
export const ZAMMAD_TOKEN_KEY = "zammad_access_token";

export const ZammadClient = axios.create({
  baseURL: ZAMMAD_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const bearerAuth = async (config: InternalAxiosRequestConfig) => {
  const token = await AsyncStorage.getItem(ZAMMAD_TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

ZammadClient.interceptors.request.use(bearerAuth, (error) =>
  Promise.reject(error),
);

export default ZammadClient;
