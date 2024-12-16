export type Device = {
  serial_number?: string;
  inventory_number: string;
  client_name: string;
  purchase_date: string;
  rollout: string;
  school: string;
  location: {
    room: {
      id: number;
      name: string;
    };
    building: {
      id: number;
      name: string;
    };
  };
  product: {
    product_type: string;
    manufacturer: string;
    name: string;
    description: Record<string, string>;
  };
};
