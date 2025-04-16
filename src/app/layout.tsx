import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onnmed",
  description: "Onnmed – Experts in clinical research and medical publishing in the UAE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
