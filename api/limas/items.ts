import LimasClient from "@/api/limas/LimasClient";
import { Device } from "@/models/Device";
import { UpdateDevice } from "@/dtos/UpdateDevice";

export async function getItem(inventoryNumber: string): Promise<Device> {
  const response = await LimasClient.get(`/items/${inventoryNumber}.json`);
  return response.data;
}

export async function updateDevice(device: UpdateDevice): Promise<void> {
  await LimasClient.patch(`/items/${device.inventory_number}.json`, device);
}
