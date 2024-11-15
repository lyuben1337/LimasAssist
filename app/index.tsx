import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return null;
  }

  return <Redirect href={isAuthenticated ? "/(tabs)/settings" : "/login"} />;
}
