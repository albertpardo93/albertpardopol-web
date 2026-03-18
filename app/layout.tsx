import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cirujanodemano.es"),
  verification: {
    google: "7zzx85tuKA22Eeu6GKp5q4BM6Kbq1iLuFzf62bN9npU",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
