import ImageModal from "@/app/components/gamedetails/ImageModal";
import ImageCarusel from "@/app/components/gamedetails/ImageCarousel";
import mockImagesForGame from "@/app/data/mockImages";

const images = mockImagesForGame();

export default async function ModalPage({
  params,
}: {
  params: Promise<{ id: string; imageId: string }>;
}) {
  const { id, imageId } = await params;
  // Find the index of the imageId in the images array
  const initialIndex = images.findIndex((img) => img.includes(imageId));

  return (
    <ImageModal>
      <ImageCarusel id={id} images={images} initialIndex={initialIndex} />
    </ImageModal>
  );
}
