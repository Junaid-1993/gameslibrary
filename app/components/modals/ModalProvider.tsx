"use client";

import { useState, useEffect } from "react";
import RateGameModal from "./RateGameModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RateGameModal />
      {/* <AddToListModal /> */}
    </>
  );
};
