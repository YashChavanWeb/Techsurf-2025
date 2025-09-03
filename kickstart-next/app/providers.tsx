"use client";

import { ReactNode } from "react";
import { PersonalizeContext } from "@/lib/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PersonalizeContext.Provider value={Personalize}>
      {children}
    </PersonalizeContext.Provider>
  );
}
