export type Ticket = {
  title: string;
  group: string;
  customer_id: number;
  article: {
    subject: string;
    body: string;
    type: string;
    internal: boolean;
  };
};
