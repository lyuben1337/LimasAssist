import { Device } from "@/models/Device";
import { Contact } from "@/models/Contact";
import { formatDate } from "@/utils/format-date";

export function generateTicketBody(
  device: Device,
  contact: Contact,
  message: string,
  date: Date,
): string {
  const productDescription = Object.entries(device.product.description)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return `
${message}

Aufgetreten am: ${formatDate(date)}  

Geräteinformationen:
- Seriennummer: ${device.serial_number || "Nicht verfügbar"}
- Inventarnummer: ${device.inventory_number}
- Clientnummer: ${device.client_name || "Nicht verfügbar"}
- Kaufdatum: ${formatDate(new Date(device.purchase_date))}
- Rollout: ${device.rollout}
- Schule: ${device.school || "Gehört zum Gebäude"}
- Standort: ${device.location.room_type} ${device.location.room_number}, ${device.location.building}
- Produkt: ${device.product.product_type} von ${device.product.manufacturer}: ${device.product.name}
- Beschreibung: ${productDescription || "Nicht verfügbar"}

Ansprechpartner/in:
- Name: ${contact.firstname} ${contact.lastname}
- E-Mail: ${contact.email}
- Telefon: ${contact.phone}
  `.trim();
}
