export type Device = {
  serial_number?: string;
  inventory_number: string;
  client_name: string;
  purchase_date: string;
  rollout: string;
  school: string;
  location: {
    room_type: string;
    room_number: string;
    building: string;
  };
  product: {
    product_type: string;
    manufacturer: string;
    name: string;
    description: Record<string, string>;
  };
};
