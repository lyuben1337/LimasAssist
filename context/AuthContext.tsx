import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ZAMMAD_TOKEN_KEY } from "@/api/zammad/ZammadClient";
import * as AuthAPI from "@/api/zammad/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem(ZAMMAD_TOKEN_KEY);
      setIsAuthenticated(!!token);
    };
    getToken();
  }, []);

  const login = async (username: string, password: string) => {
    const result = await AuthAPI.login(username, password);
    setIsAuthenticated(!!result);
  };

  const logout = async () => {
    await AuthAPI.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
