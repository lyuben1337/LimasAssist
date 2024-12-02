import { Contact } from "@/models/Contact";
import { getCurrentUserInfo } from "@/api/zammad/users";
import { Ticket } from "@/models/Ticket";
import { generateTicketBody } from "@/utils/ticket-template";
import ZammadClient from "@/api/zammad/ZammadClient";
import { getItem } from "@/api/limas/items";

export async function createDeviceReportTicket(
  inventoryNumber: string,
  contact: Contact,
  title: string,
  message: string,
  date: Date,
): Promise<Ticket> {
  const { id } = await getCurrentUserInfo();
  const device = await getItem(inventoryNumber);
  return {
    title: title,
    group: "Service",
    customer_id: id,
    article: {
      subject: "",
      body: generateTicketBody(device, contact, message, date),
      type: "note",
      internal: false,
    },
  };
}

export async function sendTicket(ticket: Ticket) {
  await ZammadClient.post("/tickets", ticket);
}
