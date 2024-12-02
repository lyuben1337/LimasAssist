import LimasClient from "@/api/limas/LimasClient";
import { Device } from "@/models/Device";

export async function getItem(inventoryNumber: string): Promise<Device> {
  const response = await LimasClient.get(`/items/${inventoryNumber}.json`);
  return response.data;
}
