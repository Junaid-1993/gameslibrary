"use client";

import { ReactNode } from "react";

export default function ServerBoundary({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
