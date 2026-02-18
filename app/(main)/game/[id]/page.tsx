import { redirect } from "next/navigation";

export default async function GameDefaultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/game/${id}/overview`);
}
