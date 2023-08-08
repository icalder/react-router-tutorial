import { LoaderFunctionArgs } from "react-router-dom";
import { getContact, getContacts } from "../contacts";

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q || "");
  return { contacts, q };
}

export async function contactLoader({ params }: LoaderFunctionArgs) {
  const contact = await getContact(params.contactId!);
  return { contact };
}
