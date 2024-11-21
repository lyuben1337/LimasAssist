import ThemedModal, { ThemedModalProps } from "@/components/shared/ThemedModal";

type DeviceModalProps = { inventoryNumber: string; onClose: () => void };

export default function DeviceModal({
  inventoryNumber,
  onClose,
}: DeviceModalProps) {
  return (
    <ThemedModal
      title={inventoryNumber}
      isVisible={!!inventoryNumber}
      onClose={onClose}
    >
      Hello, ZXC TEST!
    </ThemedModal>
  );
}
