import { Room } from "@/models/Room";
import LimasClient from "@/api/limas/LimasClient";

export async function getBuildingRooms(
  buildingId: number,
): Promise<Array<Room>> {
  const response = await LimasClient.get(`buildings/${buildingId}/rooms.json`);
  return response.data;
}
