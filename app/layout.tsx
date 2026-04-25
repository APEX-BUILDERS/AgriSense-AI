import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriSense AI - Smart Farming Dashboard",
  description:
    "AI-powered farming dashboard for crop management, disease detection, irrigation advice, and yield prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 md:ml-64 p-4 md:p-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

