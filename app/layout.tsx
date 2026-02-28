import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://albertpardopol.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
