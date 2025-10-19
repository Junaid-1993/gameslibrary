import InterceptedModal from "@/app/components/gamedetails/InterceptedModal";

export default async function ModalPage({
  params,
}: {
  params: Promise<{ id: string; videoId: string }>;
}) {
  const { id, videoId } = await params;

  return (
    <InterceptedModal>
      <div className="p-1">
        <video controls className="w-full rounded">
          <source src="/videos/the-witcher-3-trailer.mp4" type="video/mp4" />
        </video>
      </div>
    </InterceptedModal>
  );
}
