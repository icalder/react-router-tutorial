import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";

export async function createContactAction() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

// Used to mark favourites
export async function updateContactAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  return updateContact(params.contactId!, {
    favorite: formData.get("favorite") == "true",
  });
}

export async function editContactAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId!, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export async function deleteContactAction({ params }: ActionFunctionArgs) {
  await deleteContact(params.contactId!);
  return redirect("/");
}
