import LimasClient from "@/api/limas/LimasClient";
import { Device } from "@/models/Device";

export async function getItem(inventory_number: string): Promise<Device> {
  const response = await LimasClient.get(`/items/${inventory_number}.json`);
  return response.data;
}
