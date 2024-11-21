import React, { createContext, useEffect, useState } from "react";
import * as AuthAPI from "@/api/zammad/auth";
import { getCurrentUserInfo } from "@/api/zammad/users";

type AuthContextType = {
  isAuthenticated: boolean | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: undefined,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const testAuth = async () => {
      try {
        await getCurrentUserInfo();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    testAuth();
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
