import { Device } from "@/models/Device";
import { Contact } from "@/models/Contact";

export function generateTicketBody(
  device: Device,
  contact: Contact,
  message: string,
  date: Date,
): string {
  const formattedDate = date.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
${message}

Aufgetreten am: ${formattedDate}  

Geräteinformationen:
- Seriennummer: ${device.serial_number || "Nicht verfügbar"}
- Inventarnummer: ${device.inventory_number}
- Clientnummer: ${device.client_name || "Nicht verfügbar"}
- Kaufdatum: ${device.purchase_date}
- Rollout: ${device.rollout}
${!!device.school && `- Schule: ${device.school}`}
- Standort: ${device.location.room_type} ${device.location.room_number}, ${device.location.building}
- Produkt: ${device.product.product_type} von ${device.product.manufacturer}: ${device.product.name}
  Beschreibung: ${Object.entries(device.product.description)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")}

Ansprechpartner/in:
- Name: ${contact.firstname} ${contact.lastname}
- E-Mail: ${contact.email}
- Telefon: ${contact.phone}
  `.trim();
}
