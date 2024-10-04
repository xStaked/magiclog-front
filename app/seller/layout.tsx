import type { Metadata } from "next";
import { Sidebar } from "@/components/seller/sidebar";
import { Navbar } from "@/components/seller/Navbar";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Your marketplace for everything",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
