// app/games/[id]/image/[imageId]/page.tsx
import ImageCarusel from "@/app/components/gamedetails/ImageCarousel";
import mockImagesForGame from "@/app/data/mockImages";

const images = mockImagesForGame();

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string; imageId: string }>;
}) {
  const { id, imageId } = await params;

  const initialIndex = images.findIndex((img) => img.includes(imageId));

  return (
    <div className="flex items-center justify-center">
      <div className="bg-surface-500 relative w-full max-w-[924px] rounded-lg shadow-lg outline-none">
        {/* Render the same content, but as a full page (no overlay) */}
        <ImageCarusel id={id} images={images} initialIndex={initialIndex} />
      </div>
    </div>
  );
}
