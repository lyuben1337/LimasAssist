import ThemedModal from "@/components/shared/ThemedModal";
import { Device } from "@/models/Device";
import { ThemedText } from "@/components/shared/ThemedText";

type DeviceModalProps = { device?: Device; onClose: () => void };

export default function DeviceModal({ device, onClose }: DeviceModalProps) {
  if (!device) return null;

  return (
    <ThemedModal
      title={device.inventory_number}
      isVisible={!!device}
      onClose={onClose}
    >
      <ThemedText>{device.product.product_type}</ThemedText>
      <ThemedText>{device.product.manufacturer}</ThemedText>
      <ThemedText>{device.product.name}</ThemedText>
      <ThemedText>{device.serial_number}</ThemedText>
      {device.client_name && <ThemedText>{device.client_name}</ThemedText>}
      <ThemedText>{device.location.room_type}</ThemedText>
      <ThemedText>{device.location.room_number}</ThemedText>
      <ThemedText>{device.location.building}</ThemedText>
    </ThemedModal>
  );
}
