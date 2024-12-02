import ZammadClient from "@/api/zammad/ZammadClient";
import { User } from "@/models/User";

export async function getCurrentUserInfo(): Promise<User> {
  const response = await ZammadClient.get("/users/me");
  return response.data;
}
