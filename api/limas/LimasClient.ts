import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ZAMMAD_TOKEN_KEY } from "@/api/zammad/ZammadClient";

const LIMAS_BASE_URL = "http://10.221.110.101:3000/api/v1";

export const LimasClient = axios.create({
  baseURL: LIMAS_BASE_URL,
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

LimasClient.interceptors.request.use(bearerAuth, (error) =>
  Promise.reject(error),
);

export default LimasClient;
