import { ThemedView } from "@/components/shared/ThemedView";
import { ThemedText } from "@/components/shared/ThemedText";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Device } from "@/models/Device";
import { getItem, updateDevice } from "@/api/limas/items";
import { Room } from "@/models/Room";
import { getBuildingRooms } from "@/api/limas/buildings";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { Picker } from "@react-native-picker/picker";
import { useLoading } from "@/hooks/useLoading";
import ThemedPicker from "@/components/shared/ThemedPicker";

export default function UpdateLocationScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [device, setDevice] = useState<Device | undefined>(undefined);
  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchInfo = async () => {
      const item = await getItem(id as string);
      setDevice(item);
      setSelectedRoom(item.location.room);
      const rooms = await getBuildingRooms(item.location.building.id);
      setRooms(rooms);
    };
    try {
      setLoading(true);
      fetchInfo();
      setLoading(false);
    } catch (e: any) {
      alert(e.message);
    }
  }, [id]);

  const handleUpdateRoom = async () => {
    if (!device || !selectedRoom) return;

    try {
      await updateDevice({
        inventory_number: device.inventory_number,
        room_id: selectedRoom.id,
      });
      Alert.alert(
        t("devices.update-location.success-title"),
        t("devices.update-location.success-message"),
        [
          {
            text: "OK",
            onPress: () => router.navigate("/(screens)/(tabs)"), // Navigate on press
          },
        ],
      );
    } catch (error: any) {
      alert("Limas is not available.");
    }
  };

  if (!device || rooms.length === 0 || !selectedRoom) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `${t("devices.actions.update-location")} | ${id}`,
        }}
      />
      <ThemedView style={styles.background} variant="background">
        <ThemedView style={styles.container}>
          <ThemedPicker
            selectedValue={selectedRoom.id}
            onValueChange={(itemValue) => {
              const room = rooms.find((r) => r.id === itemValue);
              setSelectedRoom(room);
            }}
          >
            {rooms.map((room) => (
              <Picker.Item key={room.id} label={room.name} value={room.id} />
            ))}
          </ThemedPicker>
          <ThemedButton
            disabled={device.location.room.id === selectedRoom.id}
            onPress={handleUpdateRoom}
            label={t("devices.actions.update-location")}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    padding: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  container: {
    padding: 10,
    gap: 8,
  },
});
