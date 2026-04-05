import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Riyadh Gym Workshop",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
