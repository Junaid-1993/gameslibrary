// store/use-modal-store.ts
import { create } from "zustand";

export type ModalType = "rateGame" | "addToList" | "gameJournal" | "searchGame";

interface ModalData {
  gameId?: number;
  gameTitle?: string;
  listId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
