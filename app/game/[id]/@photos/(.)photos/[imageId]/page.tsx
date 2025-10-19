import InterceptedModal from "@/app/components/gamedetails/InterceptedModal";
import ImageCarousel from "@/app/components/gamedetails/ImageCarousel";
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
    <InterceptedModal>
      <ImageCarousel id={id} images={images} initialIndex={initialIndex} />
    </InterceptedModal>
  );
}
