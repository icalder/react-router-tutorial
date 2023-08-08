import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export interface Contact {
  id: string;
  createdAt: number;
  first: string;
  last: string;
  twitter: string;
  avatar: string;
  notes: string;
  favorite: boolean;
}

export async function getContacts(query: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork("");
  const id = Math.random().toString(36).substring(2, 9);
  const contact = {
    id,
    createdAt: Date.now(),
    first: "",
    last: "",
    twitter: "",
    avatar: "",
    notes: "",
    favorite: false,
  };
  const contacts = await getContacts("");
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) {
    return null;
  }
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  await fakeNetwork("");
  const contacts = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) {
    throw new Error("No contacts found");
  }
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  const contacts = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) {
    return false;
  }
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: Contact[]) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
