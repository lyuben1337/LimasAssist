import { Contact } from "@/models/Contact";

export type User = {
  id: number;
} & Contact;
