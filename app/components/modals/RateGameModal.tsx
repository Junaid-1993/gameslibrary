"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/app/stores/useModalStore";
import { Button } from "@/components/ui/button";

export default function RateGameModal() {
  const { isOpen, onClose, type, data } = useModal();
  // This ensures the Dialog handles its own animation lifecycle
  const isModalOpen = isOpen && type === "rateGame";

  const handleRate = (rating: number) => {
    console.log(`Saving rating ${rating} for Game ID: ${data.gameId}`);
    // Here you would call your Next.js Server Action to save to DB
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate {data.gameTitle}</DialogTitle>
          <DialogDescription>
            Share your thoughts on this title. {/* This fixes the warning */}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button key={star} onClick={() => handleRate(star)}>
              {star} ★
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
