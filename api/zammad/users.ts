import ZammadClient from "@/api/zammad/ZammadClient";

export async function getCurrentUserInfo() {
  const response = await ZammadClient.get("/users/me");
  return response.data;
}
