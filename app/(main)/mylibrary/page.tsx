import { redirect } from "next/navigation";

export default async function MyLibraryDefaultPage() {
  redirect(`/mylibrary/lists`);
}
