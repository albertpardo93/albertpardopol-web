import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cirujanodemano.es"),
  verification: {
    google: "w71ooum1cgcONXdx26j6tv3Br2ViAAg_9Ojvbxk6tcQ",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
